import { connect, Db, MongoClient } from 'mongodb';
import { DatabaseError } from './errors';

/**
 * Database connection singleton
 */
export class DatabaseController {
  /**
   * MongoDB client
   */
  private db?: Db;

  /**
   * Mongo connection
   */
  private connection?: MongoClient;

  /**
   * MongoDB connection URI
   */
  private readonly connectionUri: string;

  /**
   * Creates controller instance
   *
   * @param connectionUri - mongo URI for connection
   */
  constructor(connectionUri: string) {
    if (!connectionUri) {
      throw new DatabaseError('Connection URI is not specified. Check .env');
    }
    this.connectionUri = connectionUri;
  }

  /**
   * Connect to database
   */
  public async connect(): Promise<Db> {
    if (this.db) {
      return this.db;
    }

    try {
      this.connection = await connect(this.connectionUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this.db = this.connection.db();

      return this.db;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  /**
   * Close connection
   *
   * @returns {Promise<void>}
   */
  public async close(): Promise<void> {
    this.db = undefined;

    if (!this.connection) {
      return;
    }

    return this.connection.close();
  }

  /**
   * Return MongoDB client
   *
   * @throws {DatabaseError} if the MongoDB client wasn't created by the `connect` method
   */
  public getConnection(): Db {
    if (this.db == undefined) {
      throw new DatabaseError('You need to call the `connect` method before call `getConnection`');
    }

    return this.db;
  }
}
