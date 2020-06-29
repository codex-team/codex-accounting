export enum AccountTypes {
  DR,
  CR
}

interface AccountData {
  id: string,
  name: string,
  type: number
}

/**
 * Account model
 */
export default class Account {
  /**
   * Account identifier
   */
  public id: string = '';

  /**
   * Account name
   */
  public name: string = '';

  /**
   * Account type
   */
  public type: number = AccountTypes.CR;

  /**
   * @param {AccountData} data
   */
  public constructor(data?: AccountData) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.type = data.type;
    }
  }

  /**
   * @param {number} dr - current Account debits amount
   * @param {number} cr - current Account credits amount
   */
  public balance(dr: number, cr: number): number {
    if (this.type === AccountTypes.DR) {
      return dr - cr;
    }

    if (this.type === AccountTypes.CR) {
      return cr - dr;
    }

    throw new Error('Account type is not defined or is not correct');
  }
}
