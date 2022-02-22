import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
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
        type: Schema.Types.ObjectId,
        ref: 'Game',
      },
    ],
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
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
    const saltRounds = 8;
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

export const User = model('User', userSchema);
