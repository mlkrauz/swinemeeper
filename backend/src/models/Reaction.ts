import mongoose from 'mongoose'
const { Schema, model, Types } = mongoose
import { Reactions } from '../../../frontend/src/shared/defs'

/**
 * A single reaction to a single game.
 */
export interface Reaction {
  _id: mongoose.Schema.Types.ObjectId
  reaction: Reactions
  reactingToGame: mongoose.Schema.Types.ObjectId
  reactingUsers: mongoose.Types.Array<mongoose.Schema.Types.ObjectId>
}

/**
 * Schema for reaction document.
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
 * Document model for a Reaction.
 */
export const ReactionModel = model<Reaction>('Reaction', reactionSchema)
