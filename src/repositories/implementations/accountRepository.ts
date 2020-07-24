import { Account, AccountData, AccountType } from '../../models/account';
import { IAccountRepository } from '../interfaces/accountRepository';
import { Currency } from '../../types/currency';
import { Collection, Db } from 'mongodb';
import {Entry} from "../../models/entry";

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
   * Fetches MongoDB to get AccountData and returns Account Model
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

    const accountTransactions = await this.db.collection('transactions').find({"entries.accountId": data.id}).toArray();

    let drAmount = 0;
    let crAmount = 0;

    for(let i = 0; i < accountTransactions.length; i++) {
      const transaction = accountTransactions[i];
      const entries = transaction['entries'];

      entries.every( (entry: Entry) => {
        if (entry.accountId === data.id && entry.type === 0) {
          drAmount += entry.amount;
        } else if (entry.accountId === data.id && entry.type === 1) {
          crAmount += entry.amount;
        }
      })
    }

    data.drAmount = drAmount;
    data.crAmount = crAmount;

    return new Account(data);
  }

  /**
   * Persists new account
   *
   * @param name
   * @param type
   * @param currency
   */
  public async create(name: string, type: AccountType, currency: Currency): Promise<Account> {
    const data = {
      name: name,
      type: type,
      currency: currency,
    } as AccountData;

    const account = new Account(data);

    await this.collection.insertOne({
      id: account.id,
      ...data,
    });

    return account;
  }
}
