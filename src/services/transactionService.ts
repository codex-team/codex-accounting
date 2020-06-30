import Transaction, {TransactionData} from "../models/transaction";

/**
 * High level TransactionService interface
 */
interface TransactionServiceInterface {
  /**
   * Stores and locks transaction
   *
   * @param transaction
   */
  commit(transaction: Transaction): void;
}

/**
 * Concrete TransactionService implementation of its interface. Uses MongoDB
 */
export default class TransactionService implements TransactionServiceInterface {
  public commit(transaction: Transaction): void {
    if (transaction.isLocked()) {
      throw new Error('Transaction already posted');
    }

    if (!transaction.isBalanced()) {
      throw new Error('Transaction is not balanced');
    }

    const data = {
      id: transaction.id,
      type: transaction.type,
      description: transaction.description,
      dtCreated: transaction.dtCreated,
      entries: transaction.entries
    } as TransactionData;

    //@todo Store to the MongoDB

    /** lock transaction */
    transaction.lock();
  }
}
