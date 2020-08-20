import Transaction, { TransactionData } from '../../models/transaction';
import { ITransactionRepository } from '../interfaces/transactionRepository';
import { Collection, Db, FilterQuery } from 'mongodb';
import { EntryType } from '../../models/entry';
import { PENNY_MULTIPLIER } from '../../types/currency';
import { DateRange } from '../../types/date';
import { Account } from '../../models/account';

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
   * Transactions persistent storage collection
   */
  private collection: Collection;

  /**
   * Creates account transaction instance
   *
   * @param db - MongoDB client
   */
  constructor(db: Db) {
    this.db = db;
    this.collection = this.db.collection('transactions');
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

    await this.collection.insertOne(data);

    /** lock transaction */
    transaction.lock();
  }

  /**
   * Finds all transactions for given account and time range and calculates balance by summing debit and credit entries
   *
   * @param account - account to find balance for
   * @param range - date range by which transactions should be filtered
   */
  public async findBalanceForAccount(account: Account, range?: DateRange): Promise<number> {
    const { from, to = new Date() } = range || {};

    const timeFilter: FilterQuery<Transaction>[] = [
      { dtCreated: { $lte: +to } },
    ];

    if (from !== undefined) {
      timeFilter.push({ dtCreated: { $gte: +from } });
    }

    const pipeline = [
      {
        $match: {
          $and: timeFilter,
        },
      },
      {
        $unwind: '$entries',
      },
      {
        $match: {
          'entries.accountId': account.id,
        },
      },
      {
        $group: {
          _id: '$entries.accountId',
          dr: { $sum: { $cond: [ { $eq: ['$entries.type', EntryType.Dr] }, '$entries.amount', 0] } },
          cr: { $sum: { $cond: [ { $eq: ['$entries.type', EntryType.Cr] }, '$entries.amount', 0] } },
        },
      },
    ];

    const dbResult = await this.collection.aggregate(pipeline).toArray();
    const accountData = dbResult[0];

    if (!accountData) {
      return 0;
    }

    const diff = accountData.cr - accountData.dr;

    return (account.isCredit() ? diff : -diff) / PENNY_MULTIPLIER;
  }
}
