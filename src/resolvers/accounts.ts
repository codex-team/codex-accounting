import { ResolverContextBase } from '../types/graphql';

const AccountMutations = {
  async create(
    parent: any,
    { input }: any,
    { repositories }: ResolverContextBase
  ) {
    const accountRepository = repositories.account;
    const newAccount = await accountRepository.create(input.name, input.type, input.currency);

    return {
      recordId: newAccount.id,
      record: newAccount,
    };
  },
};

const Query = {
  async getAccount(
    parent: any,
    { id }: any,
    { repositories }: ResolverContextBase
  ) {
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
