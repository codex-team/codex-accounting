import {Account, AccountType} from '../../models/account';
import {Currency} from "../../types/currency";

/**
 * AccountRepository interface
 */
export interface IAccountRepository {
  /**
   * Method returns Account Model
   *
   * @param id - account identifier
   */
  getAccount(id: string): Account;

  /**
   * Creates new Account
   *
   * @param name
   * @param type
   * @param currency
   */
  create(name: string, type: AccountType, currency: Currency): Account;
}
