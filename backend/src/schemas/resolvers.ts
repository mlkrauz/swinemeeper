import { AuthenticationError } from "apollo-server-express"
import { UserModel, ReactionModel, GameModel, User, Reaction, Game, TileUpdate } from "../models"
import { signToken, tokenSignature } from "../utils"
import { IResolvers } from '@graphql-tools/utils'
import { GameState } from "../../../shared/defs/models"
import { HydratedDocument } from 'mongoose'

/**
 * @param {Any} args - Object containing args.
 */
 const filterArgs = (args: any, fieldsToFilter: string[]) => {
  // Convert to an array of [key, value] pairs. Remove Id. Convert back to Object.
  const keyValuesArray = Object.entries(args);
  const filteredArray = keyValuesArray.filter((keyValuePair) => !fieldsToFilter.includes(keyValuePair[0]));

  return Object.fromEntries(filteredArray);
}

// Collection of Game fields. Populating all fields is awful practice, but it will work while our database is small.
const allRows = [
  { path: 'rows', populate: { path: 'tiles', populate: 'hasMine tileType' }}
]

export const resolvers: IResolvers = {
  Query: {
    user: async (parent, args) => {
      const results: HydratedDocument<User> | null = await UserModel.findById(args.id)

      return results
    },
    users: async (parent, args) => {
      // Destructure array of ids
      const ids: any[] = args.ids

      // Get all user models
      const results: (HydratedDocument<User> | null)[] = await Promise.all(
        ids.map(async (currentId) => {
          return UserModel.findById(currentId)
        })
      )

      return results
    },
    allUsers: async () => {
      const results: HydratedDocument<User>[] | null = await UserModel.find({})

      return results
    },
    game: async (parent, args) => {
      const results: HydratedDocument<Game> | null = await GameModel.findById(args.id).populate(allRows)

      return results
    },
    games: async (parent, args) => {
      // Destructure array of ids
      const ids: any[] = args.ids

      // Get all game models
      const results: (HydratedDocument<Game> | null)[] = await Promise.all(
        ids.map(async (currentId) => {
          return GameModel.findById(currentId).populate(allRows)
        })
      )

      return results
    },
    allGames: async () => {
      const results: HydratedDocument<Game>[] | null = await GameModel.find({}).populate(allRows)

      return results
    },
    reaction: async (parent, args) => {
      const results: HydratedDocument<Reaction> | null = await ReactionModel.findById(args.id)

      return results
    },
    reactions: async (parent, args) => {
      // Destructure array of ids
      const ids: any[] = args.ids

      // Get all game models
      const results: (HydratedDocument<Reaction> | null)[] = await Promise.all(
        ids.map(async (currentId) => {
          return ReactionModel.findById(currentId)
        })
      )

      return results
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      // Get user
      const user: HydratedDocument<User> | null = await UserModel.create(args)

      // Destructure its relavent values
      const newSignature: tokenSignature = { username: user.username, email: user.email, _id: user._id.toString() }

      // Sign token
      const token = signToken(newSignature);

      return { token, user }
    },
    login: async (parent, args) => {

      // Check if a user with that password exists
      const user: HydratedDocument<User> | null = await UserModel.findOne({ email: args.email })
      if (!user) {
        throw new AuthenticationError('Incorrect credentials1');
      }

      // Check password
      const correctPw = await user.isCorrectPassword(args.password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials2');
      }

      // Destructure users values, create token
      const newSignature: tokenSignature = { username: user.username, email: user.email, _id: user._id.toString() }
      const token = signToken(newSignature);

      return { token, user };
    },
    addGameToUser: async (parent, args) => {
      // Capture both models from Id
      const user: HydratedDocument<User> | null = await UserModel.findById(args.userId)
      const game: HydratedDocument<Game> | null = await GameModel.findById(args.gameId)

      // Ensure they both exist, and that the game model's parent matches the userId
      if (!user) {
        throw new Error(`A user was not found with Id of ${args.userId}.`)
      }
      if (!game) {
        throw new Error(`A game was not found with Id of ${args.gameId}.`)
      }
      if (game.player !== user._id) {
        throw new Error(`This game does not belong to this user.`)
      }
      
      // Add the game if it is not already there
      if (!user.games.includes(args.gameId)) {
        return await UserModel.updateOne({ _id: args.userId}, { games: [...user.games, args.gameId] })
      }

      // The game already existed in the user.
      throw new Error('This user already has this game.')
    },
    /*
      addReactionToUser: async (parent, args) => {
      // Capture both models from Id
      const user: User | null = await UserModel.findById(args.userId)
      const reaction: Reaction | null = await ReactionModel.findById(args.reactionId)

      // Ensure they both exist, and that the userId exists in the reaction.
      if (!user) {
        throw new Error(`A user was not found with Id of ${args.userId}.`)
      }
      if (!reaction) {
        throw new Error(`A reaction was not found with Id of ${args.reactionId}.`)
      }
      if (!reaction.reactingUsers.includes(user._id)) {
        throw new Error(`This user has not used this reaction on this game.`)
      }
      
      // Add the reaction if it is not already there
      if (!user.games.includes(args.gameId)) {
        return await UserModel.updateOne({ _id: args.userId}, { reactions: [...user.reactions, args.reactionId] })
      }

      // The reaction already existed in the user.
      throw new Error('This user already has this game.')
    }
    */
    createGame: async (parent, args) => {
      // Create and get Game
      const game: HydratedDocument<Game> | null = await GameModel.create(args)

      return game
    },
    updateGame: async (parent, args) => {
      // Get existing game model, ensure we are not trying to change a completed game!
      const game: HydratedDocument<Game> | null = await GameModel.findById(args.gameId)
      if (!game) {
        throw new Error(`A game was not found with Id of ${args.gameId}.`)
      }
      if (game.gameState === GameState.INPROGRESS || game.gameState === GameState.PAUSED) {
        const filteredArgs = filterArgs(args, ['gameId, tilesToUpdate'])
        // Update model with standard fields
        await GameModel.updateOne({ _id: args.id }, { ...filteredArgs })

        // Now we separately handle the tile updates...
        if (args.tilesToUpdate && args.tilesToUpdate.length() > 0) {
          await args.tilesToUpdate.map((tileUpdate: TileUpdate) => {
            game.rows[tileUpdate.rowNum].tiles[tileUpdate.tileNum].tileType = tileUpdate.tileType
          })

          game.save()
        }

        // Re-query model with updates
        return GameModel.findById(args.id).populate(allRows)
      }
      
      // If we made it here, the game exists but is complete!
      throw new Error(`This game is complete! Its state is '${game.gameState}'.`)
    },
  }
}