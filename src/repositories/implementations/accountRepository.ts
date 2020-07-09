import { Account, AccountType } from '../../models/account';
import { IAccountRepository } from '../interfaces/accountRepository';
import { Currency } from '../../types/currency';
import { DatabaseController } from '../../controller';

/**
 * This class is concrete implementation of IAccountRepository that uses MongoDB as a storage
 */
export default class AccountRepository implements IAccountRepository {
  private dbController: DatabaseController;

  constructor(dbController: DatabaseController) {
    this.dbController = dbController;
  }

  /**
   * Fetches MongoDB to get AccountData and returns Account Model
   *
   * @param id - account identifier
   */
  public getAccount(id: string): Account {
    // @todo Here we fetch MongoDB to get account data and dr/cr amount
    // const account = await this.dbController.getConnection().collection('account')
    //   .findOne({ id: id });

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
