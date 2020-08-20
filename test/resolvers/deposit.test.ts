import '../../src/env-test';
import { DatabaseController } from '../../src/controller';
import { accounts } from '../mockedData/accounts';
import deposits from '../../src/resolvers/deposits';
import TransactionRepository from '../../src/repositories/implementations/transactionRepository';
import AccountRepository from '../../src/repositories/implementations/accountRepository';

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

  beforeAll(async () => {
    console.log('connect in tests');
    await db.connect();
  });

  afterAll(async () => {
    await db.close();
  });

  it('should execute deposit mutation', async () => {
    /**
     * Insert mocked data to database
     */
    await db.getConnection().collection('accounts')
      .insertMany(accounts);

    const mutationResult = await deposits.Mutation.deposit(undefined, {
      input: {
        accountId: '36749b61-0906-4374-9739-121c82678769',
        description: 'Deposit mutation',
        amount: 20,
      },
    }, {
      repositories: {
        transaction: new TransactionRepository(db.getConnection()),
        account: new AccountRepository(db.getConnection()),
      },
    });

    expect(mutationResult).not.toBe(null);
    expect(mutationResult?.recordId).not.toBe(null);
    expect(mutationResult?.record.type).toEqual('Deposit');
    expect(mutationResult?.record.description).toEqual('Deposit mutation');
    expect(mutationResult?.record.dtCreated).not.toBe(null);
  });
});
