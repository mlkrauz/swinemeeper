import { Schema, model } from 'mongoose'
import { Reactions } from '../../../shared/defs'

const reactionSchema = new Schema({
  reaction: {
    type: String,
    enum: Reactions,
    immutable: true
  },
  reactingToGame: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    immutable: true
  },
  reactingUsers: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export const Reaction = model('Reaction', reactionSchema)
