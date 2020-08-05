import { ITransactionRepository } from '../repositories/interfaces/transactionRepository';
import { IAccountRepository } from '../repositories/interfaces/accountRepository';

/**
 * All resolvers context properties
 */
export interface ResolverContextBase {
  /**
   * Resolvers can use any implementation of the following interfaces
   */
  readonly repositories: {
    transaction: ITransactionRepository;
    account: IAccountRepository;
  };
}
