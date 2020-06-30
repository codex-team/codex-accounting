import { gql } from 'apollo-server-express';

export default gql`
  """
  Available entry types
  """
  enum EntryType {
    """
    Debit record
    """
    DR

    """
    Credit record
    """
    CR
  }

  """
  The single record of the transaction
  Debit or credit
  """
  type Entry {
    """
    Entry identifier
    """
    id: ID!

    """
    Debit or credit
    """
    type: EntryType!

    """
    Related account
    """
    account: Account!

    """
    In which transaction this entry did appeared
    """
    transaction: Transaction!

    """
    Positive value of the record in minumal currency value (cents)
    """
    amount: Int!
  }
`
