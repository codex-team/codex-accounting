import Account, {AccountTypes} from "../models/account";

/**
 * AccountService
 */
export default class AccountService {
  public get(id: string): Account {
    // fetch and return
    return new Account();
  }

  public save(account: Account) {
    // save
  }
}
