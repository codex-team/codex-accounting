import { Account, AccountConstructorData, AccountType } from '../../models/account';
import { IAccountRepository } from '../interfaces/accountRepository';
import { Currency } from '../../types/currency';
import { Collection, Db } from 'mongodb';

/**
 * This class is concrete implementation of IAccountRepository that uses MongoDB as a storage
 */
export default class AccountRepository implements IAccountRepository {
  /**
   * MongoDB client
   */
  private db: Db;

  /**
   * Accounts persistent storage collection
   */
  private collection: Collection;

  /**
   * Creates account repository instance
   *
   * @param db - MongoDB client
   */
  constructor(db: Db) {
    this.db = db;
    this.collection = this.db.collection('accounts');
  }

  /**
   * Fetches MongoDB to get AccountConstructorData and returns Account Model
   *
   * @param id - account identifier
   */
  public async getAccount(id: string): Promise<Account|null> {
    const data = await this.collection.findOne({
      id: id,
    });

    if (!data) {
      return null;
    }

    return new Account(data);
  }

  /**
   * Persists new account
   *
   * @param name - account name
   * @param type - account type
   * @param currency - account currency
   */
  public async create(name: string, type: AccountType, currency: Currency): Promise<Account> {
    const data = {
      name: name,
      type: type,
      currency: currency,
    } as AccountConstructorData;

    const account = new Account(data);

    await this.collection.insertOne({
      id: account.id,
      name: account.name,
      type: account.type,
      currency: account.currency,
      dtCreated: account.dtCreated
    });

    return account;
  }
}
