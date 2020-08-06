import { ResolverContextBase } from '../types/graphql';
import Transaction, { TransactionType } from '../models/transaction';

/**
 * Mutation input declaration
 */
interface DepositMutationInput {
  /**
   * Account identifier: Which account should be deposited
   */
  accountId: string;

  /**
   * Deposit amount: the increase value
   */
  amount: number;

  /**
   * Deposit purpose: short description of operation
   */
  description: string;
}

/**
 * Mutation input declaration
 */
interface DepositMutationParams {
  input: DepositMutationInput;
}

const Mutation = {
  async deposit(
    parent: undefined,
    { input }: DepositMutationParams,
    { repositories }: ResolverContextBase
  ): Promise<null|{recordId: string; record: Transaction}> {
    const accountId = input.accountId;
    const amount = input.amount;
    const description = input.description;

    const accountRepository = repositories.account;
    const transactionRepository = repositories.transaction;

    const cashbook = await accountRepository.find('22354b8a-b501-44ed-bff0-d3bd8d899dbf');
    const account = await accountRepository.find(accountId);

    if (cashbook === null || account === null) {
      return null;
    }

    const transaction = new Transaction({
      type: TransactionType.Deposit,
      description: description,
    });

    transaction
      .debit(cashbook, amount)
      .credit(account, amount);

    try {
      transactionRepository.commit(transaction);
    } catch (e) {
      return null;
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
