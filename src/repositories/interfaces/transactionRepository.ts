import Transaction from "../../models/transaction";

/**
 * High level TransactionRepository interface
 */
export interface ITransactionRepository {
  /**
   * Stores and locks transaction
   *
   * @param transaction
   */
  commit(transaction: Transaction): void;
}
