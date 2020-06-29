/**
 * Available Account types
 */
export enum AccountTypes {
  DR = 100,
  CR = 200
}

/**
 * Account data interface
 */
export interface AccountData {
  id: string,
  name: string,
  type: number,
  currency: string,
  drAmount: number,
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
  public readonly type: number = AccountTypes.CR;

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
   * @param {AccountData} data
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
    if (this.type === AccountTypes.DR) {
      return this.drAmount - this.crAmount;
    }

    if (this.type === AccountTypes.CR) {
      return this.crAmount - this.drAmount;
    }

    throw new Error('Account type is not defined or is not correct');
  }
}
