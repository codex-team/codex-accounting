/**
 * List of available account types
 */
import {BaseModel} from "./baseModel";

export enum Currency {
  USD
}

export enum AccountType {
  Liability,
  Asset,
  Revenue,
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
  id: string,

  /**
   * Account name. Used to point the purpose
   */
  name: string,

  /**
   * Account type according to the https://www.principlesofaccounting.com/account-types/
   */
  type: AccountType,

  /**
   * Account currency
   */
  currency: Currency,

  /**
   * Account debit amount
   */
  drAmount: number,

  /**
   * Account credit amount
   */
  crAmount: number,
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
  public constructor(data: AccountData) {
    super();

    if (data.id === "") {
      this.id = "123321";
    }

    this.name = data.name;
    this.type = data.type;
    this.currency = data.currency;
    this.drAmount = data.drAmount;
    this.crAmount = data.crAmount;
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
  private isDebitAccount(): boolean
  {
    return debitAccounts.indexOf(this.type) !== -1;
  }

  /**
   * Returns true if it is credit account
   */
  private isCreditAccount(): boolean
  {
    return creditAccounts.indexOf(this.type) !== -1
  }
}
