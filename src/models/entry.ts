enum EntryType {
  DR,
  CR
}

export class Entry {
  /**
   * Entry identifier
   */
  public id: number = 0;

  /**
   * Entry type
   */
  public type: number = EntryType.DR;

  /**
   * Entry amount
   */
  public amount: number = 0;

  public constructor() {
  }

  public isDebit(): boolean {
    return this.type === EntryType.DR;
  }

  public isCredit(): boolean {
    return this.type === EntryType.CR;
  }
}
