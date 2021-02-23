import { ResolverContextBase } from '../types/graphql';
import Transaction, { TransactionType } from '../models/transaction';
import { UserInputError } from 'apollo-server-express';

interface PurchaseMutationInput {
  /**
   * Account igentifier: Which account should be purchased
   */
  accountId: string;

  /**
   * Purchase amount: the decrease value
   */
  amount: number;

  /**
   * Purchase purpose: short description of operation
   */
  description: string;
}

/**
 * Mutation input declaration
 */
interface PurchaseMutationParams {
  input: PurchaseMutationInput;
}

const Mutation = {
  /**
   * Purchase resolver: decreases account balance
   *
   * @param parent - request parent object
   * @param input - mutation object
   * @param repositories - entity repositories from global context
   */
  async purchase(
    parent: undefined,
    { input }: PurchaseMutationParams,
    { repositories }: ResolverContextBase
  ): Promise<{recordId: string; record: Transaction}> {
    const { accountId, amount, description } = input;

    const accountRepository = repositories.account;
    const transactionRepository = repositories.transaction;

    const revenueId = process.env.REVENUE_ACCOUNT_ID as string;

    if (!revenueId) {
      throw new Error('Revenue ID does not found.');
    }

    const revenue = await accountRepository.find(revenueId);
    const account = await accountRepository.find(accountId);

    if (revenue === null) {
      throw new Error('Revenue account does not found.');
    }
    if (account === null) {
      throw new UserInputError('Account with this ID does not found.');
    }

    const transaction = new Transaction({
      type: TransactionType.Purchase,
      description: description,
    });

    transaction
      .debit(account, amount)
      .credit(revenue, amount);

    try {
      await transactionRepository.commit(transaction);
    } catch (e) {
      throw new Error('Transaction committing is failed.');
    }

    return {
      recordId: transaction.id,
      record: transaction,
    };
  },
};

export default {
  Mutation,
};
