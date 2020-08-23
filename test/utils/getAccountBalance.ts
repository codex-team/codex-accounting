import { ResolverContextBase } from '../../src/types/graphql';
import accounts from '../../src/resolvers/accounts';

/**
 * Return account balance for tests
 *
 * @param accountId - account for search
 * @param context - context with repositories
 */
export default async function getAccountBalance(accountId: string, context: ResolverContextBase): Promise<number> {
  const account = await accounts.Query.getAccount(undefined, { id: accountId }, context);

  if (!account) {
    console.error('Account does not exist.');
    process.exit(1);
  }
  const balance = await accounts.Account.balance(account, {}, context);

  return balance.amount;
}
