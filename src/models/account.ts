import { BaseModel } from './baseModel';
import { Currency } from '../types/currency';
import { v4 as uuidv4 } from 'uuid';
import DateTimeFormat = Intl.DateTimeFormat;

/**
 * List of available account types
 */
export enum AccountType {
  /**
   * Credit account that represents debts before customers
   */
  Liability,

  /**
   * Debit account, used as a cashbook
   */
  Asset,

  /**
   * Credit account that represents company incomes
   */
  Revenue,

  /**
   * Debit account that represents company outcomes
   */
  Expense
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
export interface AccountData {
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
   * Account creation date
   */
  dtCreated: Date;

  /**
   * Account debit amount
   */
  drAmount?: number;

  /**
   * Account credit amount
   */
  crAmount?: number;
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
  public readonly dtCreated: number | undefined;

  /**
   * Debit amount
   */
  public readonly drAmount: number = 0;

  /**
   * Credit amount;
   */
  public readonly crAmount: number = 0;

  /**
   * @param data - account payload
   */
  constructor(data: AccountData) {
    super();

    let isNew = false;

    if (data.id) {
      isNew = true;
      this.id = data.id;
    }

    if (isNew) {
      this.id = uuidv4();
      this.dtCreated = Date.now();
    }

    this.name = data.name;
    this.type = data.type;
    this.currency = data.currency;
    this.drAmount = data.drAmount || 0;
    this.crAmount = data.crAmount || 0;
  }

  /**
   * Returns current account balance
   */
  public get balance(): number {
    if (this.isDebitAccount()) {
      return this.drAmount - this.crAmount;
    }

    if (this.isCreditAccount()) {
      return this.crAmount - this.drAmount;
    }

    throw new Error('Account type is not defined or is not correct');
  }

  /**
   * Returns true if it is debit account
   */
  private isDebitAccount(): boolean {
    return debitAccounts.indexOf(this.type) !== -1;
  }

  /**
   * Returns true if it is credit account
   */
  private isCreditAccount(): boolean {
    return creditAccounts.indexOf(this.type) !== -1;
  }
}
