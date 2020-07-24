import {ResolverContextBase} from '../types/graphql';
import Transaction, {TransactionType} from "../models/transaction";
import {Entry} from "../models/entry";

const Mutation = {
  async deposit(
    parent: any,
    { input }: any,
    { repositories }: ResolverContextBase
  ) {
    const accountId = input.accountId;
    const amount = input.amount;

    const accountRepository = repositories.account;
    const transactionRepository = repositories.transaction;

    const cashbook = await accountRepository.getAccount("22354b8a-b501-44ed-bff0-d3bd8d899dbf")
    const account = await accountRepository.getAccount(accountId);

    if (cashbook === null || account === null) {
      return;
    }

    const transaction = new Transaction({
      // id: 'fffff',
      // type: TransactionType.Deposit,
      // dtCreated: Date.now(),
    })

    transaction
      .debit(cashbook, amount)
      .credit(account, amount);

    console.log(transaction);
    transactionRepository.commit(transaction);
  },
};

export default {
  Mutation,
};
