import accounts from '../../src/resolvers/accounts';
import { Account, AccountType } from '../../src/models/account';
import { Currency } from '../../src/types/currency';
import { ResolverContextBase } from '../../src/types/graphql';

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
 * Create account for tests
 *
 * @param input - account information
 * @param context - context with repositories
 */
export default async function createAccount(input: CreateAccountMutationInput, context: ResolverContextBase): Promise<{recordId: string; record: Account}> {
  const account = await accounts.AccountMutations.create(undefined, { input }, context);

  return account;
}
