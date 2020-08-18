/**
 * Interface describes a range between two dates.
 * Both properties are optional, so range might be unlimited on edges
 */
export interface DateRange {
  /**
   * Left range limit
   */
  from?: Date;

  /**
   * Right range limit
   */
  to?: Date;
}
