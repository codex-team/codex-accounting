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
    amount: Int!
  }

  extend type Mutation {
    """
    Deposit operation. Increases account balance and cashbook
    """
    deposit(
      input: DepositInput!
    ): Int
  }
`;
