import '../../src/env-test';
import {Account, AccountConstructorData, AccountType} from "../../src/models/account";
import {Currency} from "../../src/types/currency";

/**
 * Tests for Account model
 */
describe('Account model test', () => {
  it('New account identifier generation. ID should be generated', async () => {
    const data = {
      name: 'Test account',
      type: AccountType.Asset,
      currency: Currency.USD
    } as AccountConstructorData;

    const account = new Account(data);

    expect(account.id).not.toBe(undefined);
    expect(account.name).toEqual(data.name);
    expect(account.type).toEqual(data.type);
    expect(account.currency).toEqual(data.currency);
  });

  it('Constructing an Account model. ID should not be generated', async () => {
    const data = {
      name: 'Test account',
      type: AccountType.Asset,
      currency: Currency.USD
    } as AccountConstructorData;

    const account = new Account(data);

    expect(account.id).toMatch(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/);
    expect(account.name).toEqual(data.name);
    expect(account.type).toEqual(data.type);
    expect(account.currency).toEqual(data.currency);
  });
})
