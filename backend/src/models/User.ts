import { Schema, model, Types, Date } from 'mongoose'
import bcrypt from 'bcrypt'
import 'dotenv.config'

/**
 * A single User.
 */
export interface User {
  _id: Types.ObjectId
  username: string
  email: string
  password: string
  games: Types.Array<Schema.Types.ObjectId>
  reactions: Types.Array<Schema.Types.ObjectId>
  friends: Types.Array<Schema.Types.ObjectId>
  createdAt: Date
  updatedAt: Date
}

/**
 * Schema for a user document.
 */
const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    games: [
      {
        type: Types.ObjectId,
        ref: 'Game',
      },
    ],
    reactions: [
      {
        type: Types.ObjectId,
        ref: 'Reaction',
      },
    ],
    friends: [
      {
        type: Types.ObjectId,
        ref: 'User'
      }
    ]
  }, 
  { timestamps: true }
);

/**
 * Middleware which creates encrypted password prior to save.
 */
 userSchema.pre('save', async function passwordHash(next) {
  if (this.isNew || this.isModified('password')) {
    //dotenv variables are always string. Convert to number.
    const saltRounds: number = Number(process.env.SALTROUNDS); 
    
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

/**
 * Compare the incoming password to the encrypted password.
 */
userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

/**
 * Document model for a User.
 */
export const UserModel = model<User>('User', userSchema);
