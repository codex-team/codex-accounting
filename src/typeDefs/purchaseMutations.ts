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
    The cost of service or payment amount
    """
    amount: NonNegativeInt!
  }

  """
  Special type for purchase response
  """
  type PurchaseResponse {
    """
    Purchase transaction identifier
    """
    transactionId: ID!
  }

  extend type Mutation {
    """
    Purchase operation. Decreases account balance and increases revenue
    """
    purchase(
      input: PurchaseInput!
    ): PurchaseResponse!
  }
`;
