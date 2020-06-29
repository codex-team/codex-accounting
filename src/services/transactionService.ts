import Transaction, {TransactionData} from "../models/transaction";

interface TransactionServiceInterface {
  commit(transaction: Transaction): void;
  hold(transaction: Transaction): void;
  rollback(transaction: Transaction): void;
}

/**
 * Transaction service implementation
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

    // store

    // and lock
    transaction.lock();
  }

  public hold(transaction: Transaction): void {
  }

  public rollback(transaction: Transaction) {
  }
}
