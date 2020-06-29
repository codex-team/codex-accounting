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
  Single record of the transaction
  Debit or credit
  """
  type Entry {
    """
    Entry identifier
    """
    id: String!

    """
    Debit or credit
    """
    type: EntryType!

    """
    Related account
    """
    accountId: String!

    """
    In which transaction this entry did appeared
    """
    transactionId: String!

    """
    Posive value of the record in minumal currency value (cents)
    """
    amount: Int!
  }
`
