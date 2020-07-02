import { Account, AccountType, Currency } from '../../models/account';
import { IAccountRepository } from '../interfaces/accountRepository';

/**
 * This class is concrete implementation of IAccountRepository that uses MongoDB as a storage
 */
export default class AccountRepository implements IAccountRepository {
  /**
   * @param id - account identifier
   */
  public getAccount(id: string): Account {
    // @todo Here we fetch MongoDB to get account data and dr/cr amount

    return new Account({
      id: '111111',
      name: 'Workspace account',
      type: AccountType.Liability,
      currency: Currency.USD,
      drAmount: 200,
      crAmount: 400,
    });
  }

  public create/**
                *
                *//**
                   *
                   *//**
                      *
                      *//**
                         *
                         */(account: Account) {
  }

  public update/**
                *
                *//**
                   *
                   *//**
                      *
                      *//**
                         *
                         */(account: Account) {
  }
}
