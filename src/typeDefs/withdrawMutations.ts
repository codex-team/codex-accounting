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

  """
  Special type for withdraw response
  """
  type WithdrawResponse {
    """
    Withdraw transaction identifier
    """
    recordId: ID!

    """
    Withdraw transaction payload
    """
    record: Transaction!
  }

  extend type Mutation {
    """
    Withdraw operation. Decreases account balance and cashbook
    """
    withdraw(
      input: WithdrawInput!
    ): WithdrawResponse!
  }
`;
