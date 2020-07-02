import { Account } from '../../models/account';

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
   * Method stores the passed account
   *
   * @param account
   */
  create(account: Account): void;

  /**
   * Method updates the account on storage
   *
   * @param account
   */
  update(account: Account): void;
}
