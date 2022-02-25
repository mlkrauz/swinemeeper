import express, { Express } from 'express';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import 'dotenv/config'
import { db } from './config/connection';
import { typeDefs, resolvers } from './schemas';
import { authMiddleware } from './utils';
import path, { resolve } from 'path'

/**
 * Express app
 */
const app: Express = express()

/**
 * Port in which the app runs on
 */
const PORT: string | number = process.env.PORT || 3001

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
})

await server.start()

server.applyMiddleware({ app })

// The variable __dirname is not exposed by node when using ES6 module imports.
// We can recreate __dirname with an empty path.resolve()
const dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(dirname, '../../frontend/build')));
}

app.get('*', (req, res) => {
  res.sendFile(resolve(dirname, '../../frontend/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Now listening on localhost: ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});