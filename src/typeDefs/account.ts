import { gql } from 'apollo-server-express';

export default gql`
  """
  Available account types
  See: https://www.principlesofaccounting.com/account-types/
  """
  enum AccountType {
    """
    When we need pay some money to someone
    """
    Liability

    """
    When someone has some money
    """
    Asset

    """
    When we have some money earned from services
    """
    Revenue

    """
    When we pay some our money for some serivces
    """
    Expense
  }

  """
  Base unit of an accounting system
  Represents the individual "page" of bookkeeping, to which changes in value are chronologically recorded with debit and credit entries.
  """
  type Account {
    """
    Account id
    """
    id: String!

    """
    Account name (for example, "Cashbook")
    """
    name: String!

    """
    Account type
    See type definition for more details
    """
    type: AccountType!

    """
    Account currency
    """
    currency: Currency!

    """
    When the account was created
    """
    dtCreated: Float!
  }
`
