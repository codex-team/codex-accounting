import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { GraphQLError } from 'graphql';
import HawkCatcher from '@hawk.so/nodejs';
import { NonCriticalError } from './errors';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import { DatabaseController } from './controller';

/**
 * Hawk API server
 */
class AccountantServer {
  /**
   * Port to listen for requests
   */
  private readonly serverPort: number;

  /**
   * Is playground enable on GET /graphql route
   */
  private readonly enablePlayground: boolean;

  /**
   * Express application
   */
  private readonly app = express();

  /**
   * Apollo GraphQL server
   */
  private server: ApolloServer;

  /**
   * NodeJS http server
   */
  private readonly httpServer: http.Server;

  /**
   * Creates an instance of HawkAPI.
   * Requires PORT and MONGO_URL env vars to be set.
   *
   * @param serverPort - port to listen for requests
   * @param enablePlayground - is playground enable on GET /graphql route
   * @param dbUri - database URI for connection
   */
  constructor(serverPort: number, enablePlayground: boolean, dbUri: string) {
    this.serverPort = serverPort;
    this.enablePlayground = enablePlayground;
    this.app.use(express.json());
    this.app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

    // eslint-disable-next-line no-new
    new DatabaseController(dbUri);

    // @todo create repositories

    this.server = new ApolloServer({
      typeDefs,
      debug: true,
      resolvers,
      playground: this.enablePlayground,
      introspection: this.enablePlayground,
      formatError: (error): GraphQLError => {
        if (error.originalError instanceof NonCriticalError) {
          return error;
        }
        console.error(error.originalError);

        if (error.originalError instanceof Error) {
          HawkCatcher.send(error.originalError);
        }

        return error;
      },
    });

    this.server.applyMiddleware({ app: this.app });
    /**
     * In apollo-server-express integration it is necessary to use existing HTTP server to use GraphQL subscriptions
     * {@see https://www.apollographql.com/docs/apollo-server/features/subscriptions/#subscriptions-with-additional-middleware}
     */
    this.httpServer = http.createServer(this.app);
    this.server.installSubscriptionHandlers(this.httpServer);
  }

  /**
   * Start API server
   */
  public async start(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer.listen({ port: this.serverPort }, () => {
        console.log(
          `🚀 Server ready at http://localhost:${this.serverPort}${
            this.server.graphqlPath
          }`
        );
        resolve();
      });
    });
  }
}

export default AccountantServer;
