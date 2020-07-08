import { gql } from 'apollo-server-express';

export default gql`
  """
  Account creation input
  """
  input AccountInput {
    """
    Account name that describes purpose or its aim
    """
    name: String!

    """
    Account type according to the balance sheet
    """
    type: AccountType!

    """
    Account currency
    """
    currency: Currency!
  }

  extend type Mutation {
    """
    Creates new account
    """
    create(
      input: AccountInput!
    ): ID
  }
`;
