import { connect, Db, MongoClient } from 'mongodb';
import { DatabaseConnectionError } from './errors';

/**
 * Database connection singleton
 */
export class DatabaseController {
  /**
   * MongoDB client
   */
  private db: Db | undefined;

  /**
   * Mongo connection
   */
  private connection: MongoClient | undefined;

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
      throw new DatabaseConnectionError('Connection URI is not specified. Check .env');
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
      this.db = await this.connection.db();

      return this.db;
    } catch (err) {
      throw new DatabaseConnectionError(err);
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
   * @returns {Db|undefined}
   */
  public getConnection(): Db | undefined {
    return this.db;
  }
}
