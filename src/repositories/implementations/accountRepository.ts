import { Account, AccountType } from '../../models/account';
import { IAccountRepository } from '../interfaces/accountRepository';
import { Currency } from '../../types/currency';

/**
 * This class is concrete implementation of IAccountRepository that uses MongoDB as a storage
 */
export default class AccountRepository implements IAccountRepository {
  /**
   * Fetches MongoDB to get AccountData and returns Account Model
   *
   * @param id - account identifier
   */
  public getAccount(id: string): Account {
    // @todo Here we fetch MongoDB to get account data and dr/cr amount

    return new Account({
      id: id,
      name: 'Workspace account',
      type: AccountType.Liability,
      currency: Currency.USD,
      drAmount: 200,
      crAmount: 400,
    });
  }
}
