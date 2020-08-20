import { gql } from 'apollo-server-express';

export default gql`
    """
    Balance object
    """
    type Balance {
      """
      Balance left for specified period
      """
      amount: Float!

#      """
#      Last operations with account (deposits, purchases or others)
#      If limit parameter is defined, will return first <limit> operations
#      """
#      transactions(limit: Int): [Operation!]!
    }
`;
