import { gql } from 'apollo-server-express';

export default gql`
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
    Account currency
    """
    currency: Currency!

    """
    When the account was created
    """
    dtCreated: DateTime!

    """
    Last operations with account (deposits, purchases or others)
    """
    history: [Operation!]
  }
`;
