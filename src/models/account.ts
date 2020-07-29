import { BaseModel } from './baseModel';
import { Currency } from '../types/currency';
import { v4 as uuidv4 } from 'uuid';

/**
 * List of available account types
 */
export enum AccountType {
  /**
   * Credit account that represents debts before customers
   */
  Liability = 'Liability',

  /**
   * Debit account, used as a cashbook
   */
  Asset = 'Asset',

  /**
   * Credit account that represents company incomes
   */
  Revenue = 'Revenue',

  /**
   * Debit account that represents company outcomes
   */
  Expense = 'Expense'
}

/**
 * The list of debit accounts
 */
const debitAccounts = [AccountType.Asset, AccountType.Expense];

/**
 * The list of credit accounts
 */
const creditAccounts = [AccountType.Liability, AccountType.Revenue];

/**
 * Payload that used to initialize Account model
 */
export interface AccountConstructorData {
  /**
   * Account unique identifier
   */
  id?: string;

  /**
   * Account name. Used to point the purpose
   */
  name: string;

  /**
   * Account type according to the https://www.principlesofaccounting.com/account-types/
   */
  type: AccountType;

  /**
   * Account currency
   */
  currency: Currency;

  /**
   * Account creation time
   */
  dtCreated: number;
}

/**
 * Account Model
 */
export class Account extends BaseModel {
  /**
   * Account identifier
   */
  public readonly id: string = '';

  /**
   * Account name
   */
  public readonly name: string = '';

  /**
   * Account type
   */
  public readonly type: AccountType = AccountType.Liability;

  /**
   * Account currency
   */
  public readonly currency: Currency = Currency.USD;

  /**
   * Account creation time
   */
  public readonly dtCreated: number = 0;

  /**
   * @param data - account payload
   */
  constructor(data: AccountConstructorData) {
    super();

    if (!data.id) {
      this.id = uuidv4();
    } else {
      this.id = data.id;
    }

    this.name = data.name;
    this.type = data.type;
    this.currency = data.currency;
    this.dtCreated = data.dtCreated;
  }

  /**
   * Returns true if it is debit account
   */
  public isDebit(): boolean {
    return debitAccounts.indexOf(this.type) !== -1;
  }

  /**
   * Returns true if it is credit account
   */
  public isCredit(): boolean {
    return creditAccounts.indexOf(this.type) !== -1;
  }
}
