import Transaction from "../models/transaction";

export default class TransactionService {
  public commit(transaction: Transaction) {
    if (transaction.isPosted) {
      throw new Error('Transaction already posted');
    }

    if (!transaction.isBalanced) {
      throw new Error('Transaction is not balanced');
    }

    const transactionData = {
      id: '',
    }
  }
}
