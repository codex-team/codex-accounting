import '../../src/env-test';
import { Account, AccountConstructorData, AccountType } from '../../src/models/account';
import { Currency } from '../../src/types/currency';

/**
 * Tests for Account model
 */
describe('Account model', () => {
  it('Should generate UUID identifier', async () => {
    const data = {
      name: 'Test account',
      type: AccountType.Asset,
      currency: Currency.USD,
      dtCreated: Date.now(),
    } as AccountConstructorData;

    const account = new Account(data);

    expect(account.id).not.toBe(undefined);
    expect(account.id).toMatch(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/);
    expect(account.name).toEqual(data.name);
    expect(account.type).toEqual(data.type);
    expect(account.currency).toEqual(data.currency);
    expect(account.dtCreated).toEqual(data.dtCreated);
  });

  it('Should not generate UUID, but use passed one', async () => {
    const data = {
      id: 'Account identifier',
      name: 'Test account',
      type: AccountType.Asset,
      currency: Currency.USD,
    } as AccountConstructorData;

    const account = new Account(data);

    expect(account.id).toEqual(data.id);
    expect(account.name).toEqual(data.name);
    expect(account.type).toEqual(data.type);
    expect(account.currency).toEqual(data.currency);
  });
});
