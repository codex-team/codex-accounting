import {ITransactionRepository} from "../repositories/interfaces/transactionRepository";
import {IAccountRepository} from "../repositories/interfaces/accountRepository";

export interface ResolverContextBase {
  readonly repositories: {
    transaction: ITransactionRepository,
    account: IAccountRepository
  }
}
