import {Entry, EntryType} from "./entry";
import {Account} from "./account";

/**
 * Available transaction types
 */
export enum TransactionTypes {
  DEPOSIT,
  WITHDRAW,
  PURCHASE
}

/**
 * Transaction data interface
 */
export interface TransactionData {
  id: string,
  type: number,
  description: string,
  dtCreated: number,
  entries: Entry[]
}

/**
 * Transaction service
 */
export default class Transaction {
  /**
   * Transaction identifier. UUIDv4
   */
  public readonly id: string = '';

  /**
   * Transaction type
   */
  public readonly type: number;

  /**
   * Creation date as unixtime
   */
  public readonly dtCreated: number;

  /**
   * Transaction entries
   */
  public readonly entries: Entry[] = [];

  /**
   * Transaction description
   */
  public readonly description: string = '';

  /**
   * Is transaction already posted
   */
  private posted: boolean = false;

  /**
   * @param {TransactionData} data
   */
  public constructor(data: TransactionData) {
    if (data.id.trim() === "") {
      this.id = "generated UUIDv4";
    } else {
      this.id = data.id;
      this.posted = true;
    }

    this.type = data.type;
    this.dtCreated = data.dtCreated;
    this.description = data.description;
    this.entries = data.entries;
  }

  /**
   * @param {Account} account
   * @param {number} amount
   */
  public debit(account: Account, amount: number) {
    const entry = new Entry({
      type: EntryType.DR,
      accountId: account.id,
      transactionId: this.id,
      amount: amount,
    });

    this.add(entry);
  }

  /**
   * @param {Account} account
   * @param {number} amount
   */
  public credit(account: Account, amount: number) {
    const entry = new Entry({
      type: EntryType.CR,
      accountId: account.id,
      transactionId: this.id,
      amount: amount
    });

    this.add(entry);
  }

  /**
   * Checks transaction if it is balanced
   *
   * @returns boolean
   */
  public isBalanced(): boolean {
    let result = 0;
    this.entries.forEach((entry: Entry) => {
      if (entry.isDebit()) {
        result += entry.amount;
      } else {
        result -= entry.amount;
      }
    })

    return result === 0;
  }

  public lock() {
    this.posted = true;
  }

  public isLocked(): boolean {
    return this.posted;
  }

  private add(entry: Entry): void {
    this.entries.push(entry);
  }
}
