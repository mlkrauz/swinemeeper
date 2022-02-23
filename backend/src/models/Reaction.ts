import { Schema, model, Types } from 'mongoose'
import { Reactions } from '../../../shared/defs'

/**
 * A single reaction to a single game.
 */
export interface Reaction {
  _id: Types.ObjectId
  reaction: Reactions
  reactingToGame: Schema.Types.ObjectId
  reactingUsers: Types.Array<Schema.Types.ObjectId>
}

/**
 * Schema for reaction document
 */
const reactionSchema = new Schema<Reaction>(
  {
    reaction: {
      type: String,
      required: true,
      enum: Reactions,
      immutable: true
    },
    reactingToGame: {
      type: Types.ObjectId,
      required: true,
      ref: 'Game',
      immutable: true
    },
    reactingUsers: [{
      type: Types.ObjectId,
      required: true,
      ref: 'User'
    }]
  }
)

/**
 * Document model for a Reaction
 */
export const ReactionModel = model<Reaction>('Reaction', reactionSchema)
