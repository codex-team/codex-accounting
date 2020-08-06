import { gql } from 'apollo-server-express';

export default gql`
  """
  Deposit mutation input arguments
  """
  input DepositInput {
    """
    Depositing account identifier
    """
    accountId: String!

    """
    Positive number to increase account balance
    """
    amount: NonNegativeInt!

    """
    Operation purpose or description
    """
    description: String
  }

  """
  Special type for deposit response
  """
  type DepositResponse {
    """
    Deposit transaction identifier
    """
    recordId: ID!

    """
    Deposit transaction payload
    """
    record: Transaction!
  }

  extend type Mutation {
    """
    Deposit operation. Increases account balance and cashbook
    """
    deposit(
      input: DepositInput!
    ): DepositResponse!
  }
`;
