import Transaction from '../../models/transaction';
import { ITransactionRepository } from '../interfaces/transactionRepository';
import { DatabaseController } from "../../controller";

/**
 * Concrete ITransactionRepository implementation. Uses MongoDB
 */
export default class TransactionRepository implements ITransactionRepository {
  private dbController: DatabaseController;

  constructor(dbController: DatabaseController) {
    this.dbController = dbController;
  }

  /**
   * This method used to validate and store the transaction
   * The transaction passed once or not balanced cannot be committed
   *
   * @param transaction - target transaction
   */
  public commit(transaction: Transaction): void {
    if (transaction.isLocked()) {
      throw new Error('Transaction already posted');
    }

    if (!transaction.isBalanced()) {
      throw new Error('Transaction is not balanced');
    }

    // const data = {
    //   id: transaction.id,
    //   type: transaction.type,
    //   description: transaction.description,
    //   dtCreated: transaction.dtCreated,
    //   entries: transaction.entries,
    // } as TransactionData;
    // await this.dbController.getConnection().collection('transaction').insertOne(data);
    // @todo Store to the MongoDB

    /** lock transaction */
    transaction.lock();
  }
}
