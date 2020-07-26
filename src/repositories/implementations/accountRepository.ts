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
  private accountsCollection: Collection;

  /**
   * Transaction collection pointer
   */
  private transactionsCollection: Collection;

  /**
   * Creates account repository instance
   *
   * @param db - MongoDB client
   */
  constructor(db: Db) {
    this.db = db;
    this.accountsCollection = this.db.collection('accounts');
    this.transactionsCollection = this.db.collection('transactions');
  }

  /**
   * Fetches MongoDB to get AccountData and returns Account Model
   *
   * @param id - account identifier
   */
  public async getAccount(id: string): Promise<Account|null> {
    const data = await this.accountsCollection.findOne({
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

    await this.accountsCollection.insertOne({
      id: account.id,
      ...data,
    });

    return account;
  }

  private async getDebitAndCreditAmounts(account: Account): any {
    const accountTransactions = await this.transactionsCollection.find({
      "entries.accountId": account.id
    }).toArray();

    let amount = 0;
    for(let i = 0; i < accountTransactions.length; i++) {
      const transaction = accountTransactions[i];
      const entries = transaction['entries'];

      entries.every( (entry: Entry) => {
        if (entry.accountId === account.id && entry.type === 0) {
          amount += entry.amount;
        }
      });
    }

    return amount;
  }

  private getCreditAmount(account: Account) {

  }
}
