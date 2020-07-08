import { gql } from 'apollo-server-express';

export default gql`
  """
  Withdraw input arguments
  """
  input WithdrawInput {
    """
    Withdrawing account identifier
    """
    accountId: String!

    """
    Withdrawing amount (account currency will be used)
    """
    amount: NonNegativeInt!
  }

  extend type Mutation {
    """
    Withdraw operation. Decreases account balance and cashbook
    """
    withdraw(
      input: WithdrawInput!
    ): Int
  }
`;
