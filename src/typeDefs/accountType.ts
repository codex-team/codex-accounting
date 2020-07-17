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
`;
