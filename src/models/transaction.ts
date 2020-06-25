import {Entry} from "./entry";

enum TransactionTypes {
  DEPOSIT,
  WITHDRAW,
  PURCHASE
}

export default class Transaction {
  /**
   * Transaction identifier
   */
  private _id: string = '';

  /**
   * Transaction entries
   */
  private _entries: Entry[] = [];

  /**
   * Is transaction already posted
   */
  private posted: boolean = false;

  /**
   * Transaction description
   */
  private _description: string = '';

  public debit(account: Account, amount: number) {
    const entry = new Entry();

    this.add(entry);
  }

  public credit(account: Account, amount: number) {
    const entry = new Entry();

    this.add(entry);
  }

  public isPosted(): boolean {
    return this.posted;
  }

  public isBalanced(): boolean {
    let result = 0;
    this._entries.forEach((entry: Entry) => {
      if (entry.isDebit()) {
        result += entry.amount;
      } else {
        result -= entry.amount;
      }
    })

    return result === 0;
  }

  private add(entry: Entry): void {
    this._entries.push(entry);
  }
}
