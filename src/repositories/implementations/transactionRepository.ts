import Transaction, { TransactionData } from '../../models/transaction';
import { ITransactionRepository } from '../interfaces/transactionRepository';
import { Db } from 'mongodb';

/**
 * Concrete ITransactionRepository implementation. Uses MongoDB
 */
export default class TransactionRepository implements ITransactionRepository {
  /**
   * MongoDB client
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  private db: Db;

  /**
   * Creates account transaction instance
   *
   * @param db - MongoDB client
   */
  constructor(db: Db) {
    this.db = db;
  }

  /**
   * This method used to validate and store the transaction
   * The transaction passed once or not balanced cannot be committed
   *
   * @param transaction - target transaction
   */
  public async commit(transaction: Transaction): Promise<void> {
    if (transaction.isLocked()) {
      throw new Error('Transaction already posted');
    }

    if (!transaction.isBalanced()) {
      throw new Error('Transaction is not balanced');
    }

    const data = {
      id: transaction.id,
      type: transaction.type,
      description: transaction.description,
      dtCreated: transaction.dtCreated,
      entries: transaction.entries,
    } as TransactionData;

    await this.db.collection('transactions').insertOne(data);

    /** lock transaction */
    transaction.lock();
  }
}
