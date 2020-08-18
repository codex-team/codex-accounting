import { ResolverContextBase } from '../types/graphql';
import { Account, AccountType } from '../models/account';
import { Currency } from '../types/currency';
import { DateRange } from '../types/date';
import { Balance } from '../types/balance';

/**
 * Concrete create mutation input declaration
 */
interface CreateAccountMutationInput {
  /**
   * Creating account input
   */
  name: string;

  /**
   * Creating account type
   */
  type: AccountType;

  /**
   * Creating account currency
   */
  currency: Currency;
}

/**
 * Mutation input declaration
 */
interface CreateMutationParams {
  input: CreateAccountMutationInput;
}

/**
 * getAccount Query params declaration
 */
interface GetAccountQueryParams {
  id: string;
}

const AccountMutations = {
  /**
   * Method creates new account
   *
   * @param parent - request parent object
   * @param input - mutation input
   * @param repositories - model repositories from global context
   */
  async create(
    parent: undefined,
    { input }: CreateMutationParams,
    { repositories }: ResolverContextBase
  ): Promise<{recordId: string; record: Account}> {
    const accountRepository = repositories.account;
    const newAccount = await accountRepository.create(input.name, input.type, input.currency);

    return {
      recordId: newAccount.id,
      record: newAccount,
    };
  },
};

const AccountProps = {
  /**
   * Method returns accounts balance
   *
   * @param parent - Account to find balance for
   * @param range - date range by which transactions should be filtered
   * @param repositories - model repositories from global context
   */
  async balance(
    parent: Account,
    range: DateRange,
    { repositories }: ResolverContextBase
  ): Promise<Balance> {
    const transactionsRepository = repositories.transaction;
    const amount = await transactionsRepository.findBalanceForAccount(parent, range);

    return {
      amount,
    };
  },
};

const Query = {
  /**
   * Method returns account by identifier
   *
   * @param parent - request parent object
   * @param id - requesting account identifier
   * @param repositories - model repositories from global context
   */
  async getAccount(
    parent: undefined,
    { id }: GetAccountQueryParams,
    { repositories }: ResolverContextBase
  ): Promise<Account|null> {
    const accountRepository = repositories.account;

    return accountRepository.find(id);
  },
};

const Mutation = {
  account: (): Record<string, undefined> => ({}),
};

export default {
  Account: AccountProps,
  Mutation,
  Query,
  AccountMutations,
};
