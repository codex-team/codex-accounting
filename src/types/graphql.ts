import { ITransactionRepository } from '../repositories/interfaces/transactionRepository';
import { IAccountRepository } from '../repositories/interfaces/accountRepository';

/**
 * All resolvers context properties
 */
export interface ResolverContextBase {
  readonly repositories: {
    transaction: ITransactionRepository;
    account: IAccountRepository;
  };
}
