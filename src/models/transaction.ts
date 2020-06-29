import {Entry} from "./entry";

enum TransactionTypes {
  DEPOSIT,
  WITHDRAW,
  PURCHASE
}

/**
 * Transaction service
 */
export default class Transaction {
  /**
   * Transaction identifier
   */
  public id: string = '';

  /**
   * Transaction entries
   */
  public entries: Entry[] = [];

  /**
   * Is transaction already posted
   */
  public isPosted: boolean = false;

  /**
   * Transaction description
   */
  public description: string = '';

  /**
   * @param {Account} account
   * @param {number} amount
   */
  public debit(account: Account, amount: number) {
    const entry = new Entry();

    this.add(entry);
  }

  /**
   * @param {Account} account
   * @param {number} amount
   */
  public credit(account: Account, amount: number) {
    const entry = new Entry();

    this.add(entry);
  }

  /**
   * Checks transaction if it is balanced
   *
   * @returns boolean
   */
  public get isBalanced(): boolean {
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

  private add(entry: Entry): void {
    this.entries.push(entry);
  }
}
