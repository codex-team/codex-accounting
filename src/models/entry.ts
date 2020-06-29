/**
 * Available entry types
 */
export enum EntryType {
  DR,
  CR
}

/**
 * Entry Data interface
 */
export interface EntryData {
  type: number,
  accountId: string,
  transactionId: string,
  amount: number
}

/**
 * Entry Model
 */
export class Entry {
  /**
   * Represents entry debit or credit type
   */
  public readonly type: number = EntryType.DR;

  /**
   * Reference to Account ID
   */
  public readonly accountId: string = '';

  /**
   * Reference to Transaction ID
   */
  public readonly transactionId: string = '';

  /**
   * Entry amount
   */
  public readonly amount: number = 0;

  /**
   * @param {EntryData} data
   */
  public constructor(data: EntryData) {
    if (data.amount < 0) {
      throw new Error("Amount must be positive")
    }

    if (data.accountId.trim() === "") {
      throw new Error("Account ID is empty");
    }

    if (data.transactionId.trim() === "") {
      throw new Error("Transaction ID is empty");
    }

    this.type = data.type;
    this.accountId = data.accountId;
    this.transactionId = data.transactionId;
    this.amount = data.amount;
  }

  /**
   * Returns true if entry is debit
   *
   * @returns {boolean}
   */
  public isDebit(): boolean {
    return this.type === EntryType.DR;
  }

  /**
   * Returns true if entry is credit
   *
   * @returns {boolean}
   */
  public isCredit(): boolean {
    return this.type === EntryType.CR;
  }
}
