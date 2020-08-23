import '../../src/env-test';
import { DatabaseController } from '../../src/controller';
import { accounts } from '../mockedData/accounts';
import deposits from '../../src/resolvers/deposits';
import TransactionRepository from '../../src/repositories/implementations/transactionRepository';
import AccountRepository from '../../src/repositories/implementations/accountRepository';
import { ResolverContextBase } from '../../src/types/graphql';
import getAccountBalance from '../utils/getAccountBalance';
import createAccount from '../utils/createAccount';
import { AccountType } from '../../src/models/account';
import { Currency } from '../../src/types/currency';

describe('Deposits mutation', () => {
  if (!process.env.MONGO_ACCOUNTING_DATABASE_URI) {
    console.error('Please, specify mongodb uri via .env MONGO_ACCOUNTING_DATABASE_URI option');
    process.exit(1);
  }
  if (!process.env.CASHBOOK_ACCOUNT_ID || !process.env.CASHBOOK_ACCOUNT_NAME) {
    console.error('Please, specify cashbook options');
    process.exit(1);
  }
  if (!process.env.REVENUE_ACCOUNT_ID || !process.env.REVENUE_ACCOUNT_NAME) {
    console.error('Please, specify revenue options');
    process.exit(1);
  }

  const db = new DatabaseController(process.env.MONGO_ACCOUNTING_DATABASE_URI);

  /**
   * Resolver context with repositories
   */
  let context: ResolverContextBase | null;

  beforeAll(async () => {
    console.log('connect in tests');
    await db.connect();
    context = {
      repositories: {
        transaction: new TransactionRepository(db.getConnection()),
        account: new AccountRepository(db.getConnection()),
      },
    };
  });

  afterAll(async () => {
    await db.close();
  });

  it('should execute deposit mutation', async () => {
    if (!context) {
      console.error('Context with repositories does not exist.');
      process.exit(1);
    }

    /**
     * Insert mocked data to database
     */
    await db.getConnection().collection('accounts')
      .insertMany(accounts);

    /**
     * Creates user account for test
     */
    const { recordId } = await createAccount({
      name: 'Test account',
      type: AccountType.Liability,
      currency: Currency.USD,
    }, context);

    const accountBalanceBeforeMutation = await getAccountBalance(recordId, context);

    const mutationResult = await deposits.Mutation.deposit(undefined, {
      input: {
        accountId: recordId,
        description: 'Deposit mutation',
        amount: 20,
      },
    }, context);

    const accountBalanceAfterMutation = await getAccountBalance(recordId, context);

    expect(mutationResult).not.toBe(null);
    expect(mutationResult?.recordId).not.toBe(null);
    expect(mutationResult?.record.type).toEqual('Deposit');
    expect(mutationResult?.record.description).toEqual('Deposit mutation');
    expect(mutationResult?.record.dtCreated).not.toBe(null);
    expect(accountBalanceAfterMutation - accountBalanceBeforeMutation).toEqual(20);
  });
});
