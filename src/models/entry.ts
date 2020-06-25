enum EntryType {
  DR,
  CR
}

export class Entry {
  /**
   * Entry identifier
   */
  private _id: number = 0;

  /**
   * Entry type
   */
  private _type: number = EntryType.DR;

  /**
   * Entry amount
   */
  private _amount: number = 0;

  public constructor() {
  }

  public isDebit(): boolean {
    return this._type === EntryType.DR;
  }

  public isCredit(): boolean {
    return this._type === EntryType.CR;
  }

  public get amount(): number {
    return this._amount;
  }
}
