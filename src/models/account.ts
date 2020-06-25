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
  private _id: string = '';

  /**
   * Account name
   */
  private _name: string = '';

  /**
   * Account type
   */
  private _type: number = AccountTypes.CR;

  /**
   * @param {AccountData} data
   */
  public constructor(data?: AccountData) {
    if (data) {
      this._id = data.id;
      this._name = data.name;
      this._type = data.type;
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

  public get id(): string
  {
    return this._id;
  }

  public get name(): string
  {
    return this._name;
  }

  public get type(): number
  {
    return this._type;
  }
}
