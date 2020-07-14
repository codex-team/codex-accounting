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

  """
  Account response format on creation
  """
  type CreateAccountResponse {
    """
    New created account identifier
    """
    recordId: ID!

    """
    Created account payload
    """
    record: Account!
  }

  """
  Account mutations namespace
  """
  type AccountMutations {
    """
    Creates new account
    """
    create(
      input: AccountInput!
    ): CreateAccountResponse!
  }

  extend type Mutation {
    """
    We divide different mutations with namespaces so account is a namespace that contains only mutations
    related to the accounts
    """
    account: AccountMutations!
  }
`;
