import { ResolverContextBase } from '../types/graphql';
import { Account, AccountType } from '../models/account';
import { Currency } from '../types/currency';

/**
 * Concrete create mutation input declaration
 */
interface CreateMutationInput {
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
  input: CreateMutationInput;
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

    return accountRepository.getAccount(id);
  },
};

const Mutation = {
  account: (): Record<string, undefined> => ({}),
};

export default {
  Mutation,
  Query,
  AccountMutations,
};
