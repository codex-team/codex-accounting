import {Account, AccountTypes} from "../models/account";

interface AccountServiceInterface {
  getAccount(id: string): Account;
}

/**
 * AccountService
 */
export default class AccountService implements AccountServiceInterface {
  public getAccount(id: string): Account {
    return new Account({
      id: "111111",
      name: "Liability",
      type: AccountTypes.CR,
      currency: 'RUB',
      drAmount: 200,
      crAmount: 400,
    });
  }
}
