import { ApolloError } from 'apollo-server-express';

/**
 * Class for non-critical errors (when the app works fine, but we need to send the error to the user, for example, auth-errors and others)
 * Events inherited from this class won't be send to hawk
 */
export class NonCriticalError extends ApolloError {
}

/**
 * Class for critical database connection errors
 */
export class DatabaseConnectionError extends Error {
}
