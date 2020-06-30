/**
 * List of available account types
 */
export enum AccountType {
  Dr = 100,
  Cr = 200
}

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
  type: number,

  /**
   * Account currency
   */
  currency: string,

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
export class Account {
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
  public readonly type: AccountType = AccountType.Cr;

  /**
   * Account currency
   */
  public readonly currency: string = '';

  /**
   * Debit amount
   */
  public readonly drAmount: number = 0;

  /**
   * Credit amount;
   */
  public readonly crAmount: number = 0;

  /**
   * @param data
   */
  public constructor(data?: AccountData) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.type = data.type;
      this.currency = data.currency;
      this.drAmount = data.drAmount;
      this.crAmount = data.crAmount;
    }
  }

  /**
   * Returns current account balance
   */
  public get balance(): number {
    if (this.type === AccountType.Dr) {
      return this.drAmount - this.crAmount;
    }

    if (this.type === AccountType.Cr) {
      return this.crAmount - this.drAmount;
    }

    throw new Error('Account type is not defined or is not correct');
  }
}
