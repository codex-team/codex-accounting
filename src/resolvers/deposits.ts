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
  /**
   * Desposit resolver: increases account balance
   *
   * @param parent - request parent object
   * @param input - mutation object
   * @param repositories - entity repositories from global context
   */
  async deposit(
    parent: undefined,
    { input }: DepositMutationParams,
    { repositories }: ResolverContextBase
  ): Promise<null|{recordId: string; record: Transaction}> {
    const { accountId, amount, description } = input;

    const accountRepository = repositories.account;
    const transactionRepository = repositories.transaction;

    const cashbookId = process.env.CASHBOOK_ACCOUNT_ID as string;

    if (!cashbookId) {
      return null;
    }

    const cashbook = await accountRepository.find(cashbookId);
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
