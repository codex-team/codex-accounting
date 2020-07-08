import { gql } from 'apollo-server-express';

export default gql`
  """
  Account creation mutation input
  """
  input AccountInput {
    """
    String that describes account purpose
    """
    name: String!

    """
    Account type according to the balance sheet
    See: https://www.principlesofaccounting.com/account-types/
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
