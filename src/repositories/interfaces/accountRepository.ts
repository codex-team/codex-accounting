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
}
