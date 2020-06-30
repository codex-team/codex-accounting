import {Account, AccountType} from "../models/account";

/**
 * High level AccountService interface
 */
interface AccountServiceInterface {
  /**
   * Method returns Account Model
   *
   * @param id
   */
  getAccount(id: string): Account;
}

/**
 * This class is concrete implementation of AccountServiceInterface that uses MongoDB as a storage
 */
export default class AccountService implements AccountServiceInterface {
  /**
   * @param id - account identifier
   */
  public getAccount(id: string): Account {
    //@todo Here we fetch MongoDB to get account data and dr/cr amount

    return new Account({
      id: "111111",
      name: "Liability",
      type: AccountType.Cr,
      currency: 'RUB',
      drAmount: 200,
      crAmount: 400,
    });
  }
}
