import {Entry, EntryType} from "./entry";
import {Account} from "./account";

/**
 * Available transaction types
 */
export enum TransactionType {
  Deposit,
  Withdrawal,
  Purchase
}

/**
 * Transaction data interface
 */
export interface TransactionData {
  /**
   * Transaction unique identifier (UUIDv4)
   */
  id: string,

  /**
   * One of the transaction type described above
   */
  type: TransactionType,

  /**
   * Short transaction purpose
   */
  description: string,

  /**
   * Transaction creation datetime
   */
  dtCreated: number,

  /**
   * Transaction entries
   */
  entries: Entry[]
}

/**
 * Transaction Model
 */
export default class Transaction {
  /**
   * Transaction identifier. UUIDv4
   */
  public readonly id: string = '';

  /**
   * One of listed transaction types
   */
  public readonly type: TransactionType;

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
   * @param data
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
   * Creates debit entry and adds to the list
   *
   * @param {Account} account
   * @param {number} amount
   */
  public debit(account: Account, amount: number) {
    const entry = new Entry({
      type: EntryType.Dr,
      accountId: account.id,
      transactionId: this.id,
      amount: amount,
    });

    this.add(entry);
  }

  /**
   * Creates credit entry and adds to the list
   *
   * @param {Account} account
   * @param {number} amount
   */
  public credit(account: Account, amount: number) {
    const entry = new Entry({
      type: EntryType.Cr,
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

  /**
   * Locks transaction so that it can not be posted again
   */
  public lock(): void {
    this.posted = true;
  }

  /**
   * True if it is already posted
   */
  public isLocked(): boolean {
    return this.posted;
  }

  /**
   * Adds entry to the list
   *
   * @param entry - concrete debit or credit entry
   */
  private add(entry: Entry): void {
    this.entries.push(entry);
  }
}
