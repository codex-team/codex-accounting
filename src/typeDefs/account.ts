import { gql } from 'apollo-server-express';

export default gql`
  """
  Available account types
  See: https://www.principlesofaccounting.com/account-types/
  """
  enum AccountType {
    """
    When we need to pay some money to someone (credit)
    """
    Liability

    """
    Something valuable belonging to a person or organization
    that can be used for the payment of debts (debit) — Cashbook
    """
    Asset

    """
    When we have some money earned from services (credit)
    """
    Revenue

    """
    When we pay some our money for some serivces (debit)
    """
    Expense
  }

  """
  The base unit of an accounting system
  Represents the individual "page" of bookkeeping, to which changes in value are chronologically recorded with debit and credit entries.
  """
  type Account {
    """
    Account id
    """
    id: ID!

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
