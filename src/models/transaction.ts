import { Entry, EntryType } from './entry';
import { Account } from './account';
import { v4 as uuidv4 } from 'uuid';

/**
 * Available transaction types
 */
export enum TransactionType {
  /**
   * Transaction that increases account and cashbook
   */
  Deposit = 'Deposit',

  /**
   * Transaction that decreases account and cashbook
   */
  Withdraw = 'Withdraw',

  /**
   * Tranasction that decreases account and increases our revenue
   */
  Purchase = 'Purchase'
}

/**
 * Transaction data interface
 */
export interface TransactionData {
  /**
   * Transaction unique identifier (UUIDv4)
   */
  id?: string;

  /**
   * One of the transaction type described above
   */
  type?: TransactionType;

  /**
   * Short transaction purpose
   */
  description?: string;

  /**
   * Transaction creation datetime
   */
  dtCreated?: number;

  /**
   * Transaction entries
   */
  entries?: Entry[];
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
  public readonly type: TransactionType = TransactionType.Deposit;

  /**
   * Creation date as unixtime
   */
  public readonly dtCreated: number = 1111;

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
  private posted = false;

  /**
   * @param data - transaction payload
   */
  constructor(data: TransactionData) {
    if (!data.id) {
      this.id = uuidv4();
    } else {
      this.id = data.id;
      this.posted = true;
    }

    this.type = data.type || this.type;
    this.dtCreated = data.dtCreated || Date.now();
    this.description = data.description || '';
    this.entries = data.entries || [];
  }

  /**
   * Creates debit entry and adds to the list
   *
   * @param {Account} account - target account
   * @param {number} amount - entry amount
   *
   * @returns {Transaction}
   */
  public debit(account: Account, amount: number): this {
    const entry = new Entry({
      type: EntryType.Dr,
      accountId: account.id,
      transactionId: this.id,
      amount: amount * 1000,
    });

    this.add(entry);

    return this;
  }

  /**
   * Creates credit entry and adds to the list
   *
   * @param {Account} account - target account
   * @param {number} amount - entry amount
   *
   * @returns {Transaction}
   */
  public credit(account: Account, amount: number): this {
    const entry = new Entry({
      type: EntryType.Cr,
      accountId: account.id,
      transactionId: this.id,
      amount: amount * 1000,
    });

    this.add(entry);

    return this;
  }

  /**
   * Checks transaction if it is balanced
   */
  public isBalanced(): boolean {
    let result = 0;

    this.entries.forEach((entry: Entry) => {
      if (entry.isDebit()) {
        result += entry.amount;
      } else {
        result -= entry.amount;
      }
    });

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
