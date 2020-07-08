import { gql } from 'apollo-server-express';

export default gql`
  """
  Purchase input arguments
  """
  input PurchaseInput {
    """
    Purchaser account identifier
    """
    accountId: String!

    """
    Bill amount
    """
    amount: Int!
  }

  extend type Mutation {
    """
    Purchase operation. Decreases account balance and increases revenue
    """
    purchase(
      input: PurchaseInput!
    ): Int
  }
`;
