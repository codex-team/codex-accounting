import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { GraphQLError } from 'graphql';
import HawkCatcher from '@hawk.so/nodejs';
import { AccountingServerError, NonCriticalError } from './errors';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import { DatabaseController } from './controller';
import TransactionRepository from './repositories/implementations/transactionRepository';
import AccountRepository from './repositories/implementations/accountRepository';
import { ResolverContextBase } from './types/graphql';

/**
 * Hawk API server
 */
class AccountantServer {
  /**
   * Object with repository instances
   */
  private context?: ResolverContextBase;

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
   * Database controller
   */
  private readonly dbController: DatabaseController;

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
    this.dbController = new DatabaseController(dbUri);
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
      context: (): ResolverContextBase => this.createContext(),
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
   * Returns created context object with repository instance
   *
   * @throws {AccountingServerError} if the context wasn't created by the `createContext` method
   */
  public getContext(): object {
    if (this.context == undefined) {
      throw new AccountingServerError('You need to call the `createContext` method before call `getContext`');
    }

    return this.context;
  }

  /**
   * Start API server
   */
  public async start(): Promise<void> {
    await this.dbController.connect();
    this.createContext();

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

  /**
   * Returns object which contains repository instances
   *
   * @throws {AccountingServerError} if the server instance wasn't started by the `start` method
   */
  private createContext(): ResolverContextBase {
    // @todo impl and use context wrapper class
    if (this.dbController == undefined) {
      throw new AccountingServerError('You need to call the `start` method before call `createContext`');
    }

    if (this.context !== undefined) {
      return this.context;
    }

    this.context = {
      repositories: {
        transaction: new TransactionRepository(this.dbController.getConnection()),
        account: new AccountRepository(this.dbController.getConnection()),
      },
    };

    return this.context;
  }
}

export default AccountantServer;
