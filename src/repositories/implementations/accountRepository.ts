import { Account, AccountType } from '../../models/account';
import { IAccountRepository } from '../interfaces/accountRepository';
import { Currency } from '../../types/currency';
import { Db } from 'mongodb';

/**
 * This class is concrete implementation of IAccountRepository that uses MongoDB as a storage
 */
export default class AccountRepository implements IAccountRepository {
  /**
   * MongoDB client
   */
  private db: Db;

  /**
   * Creates account repository instance
   *
   * @param db - MongoDB client
   */
  constructor(db: Db) {
    this.db = db;
  }

  /**
   * Fetches MongoDB to get AccountData and returns Account Model
   *
   * @param id - account identifier
   */
  public getAccount(id: string): Account {
    // @todo Here we fetch MongoDB to get account data and dr/cr amount
    // const account = await this.db.collection('account').findOne({ id: id });

    return new Account({
      id: id,
      name: 'Workspace account',
      type: AccountType.Liability,
      currency: Currency.USD,
      drAmount: 200,
      crAmount: 400,
    });
  }

  /**
   * Persists new account
   *
   * @param name
   * @param type
   * @param currency
   */
  public create(name: string, type: AccountType, currency: Currency): Account {
    return new Account({
      id: 'sjdflskmdflksmdflkm',
      name: name,
      type: type,
      currency: currency
    })
  }
}
