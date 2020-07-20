import {ResolverContextBase} from "../types/graphql";

const AccountMutations = {
  async create(
    parent: any,
    { input }: any,
    { repositories }: ResolverContextBase
  ) {
    const accountRepository = repositories.account;
    const newAccount = accountRepository.create(input.name, input.type, input.currency);

    return {
      recordId: newAccount.id,
      record: newAccount
    }
  }
}

const Mutation = {
  account: () => ({})
}

export default {
  Mutation,
  AccountMutations
}
