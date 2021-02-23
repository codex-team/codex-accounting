import Transaction from '../../models/transaction';
import { DateRange } from '../../types/date';
import { Account } from '../../models/account';

/**
 * High level TransactionRepository interface
 */
export interface ITransactionRepository {
  /**
   * Stores and locks transaction
   *
   * @param transaction
   */
  commit(transaction: Transaction): Promise<void>;

  /**
   * Returns balance calculated from transactions for passed account
   *
   * @param account - account to find balance for
   * @param range - date range to filter transactions
   */
  findBalanceForAccount(account: Account, range?: DateRange): Promise<number>;
}
