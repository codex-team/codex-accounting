import { DateTimeResolver, NonNegativeIntResolver } from 'graphql-scalars';

export default {
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z
   */
  DateTime: DateTimeResolver,

  /**
   * Integers that will have a value of 0 or more
   */
  NonNegativeInt: NonNegativeIntResolver,
};
