import { gql } from 'apollo-server-express';

export default gql`
  """
  Withdrawal input arguments
  """
  input WithdrawalInput {
    """
    Withdrawing account identifier
    """
    accountId: String!

    """
    Withdrawing amount (account currency will be used)
    """
    amount: Int!
  }

  extend type Mutation {
    """
    Withdrawal operation. Decreases account balance and cashbook
    """
    withdrawal(
      input: WithdrawalInput!
    ): Int
  }
`

