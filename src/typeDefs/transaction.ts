import { gql } from 'apollo-server-express';

export default gql`
  """
  Available transaction types
  """
  enum TransactionType {
    """
    New money receivement
    """
    Deposit

    """
    Payment for something
    """
    Expense

    """
    Money transfer operation
    """
    Transfer
  }


  """
  Represents a single money transfer operation.
  MUST contain debit and credit entries with the balanced (=0) total amount
  """
  type Transaction {
    """
    Transaction unique identifer
    """
    id: String!

    """
    What kind of money movement
    """
    type: TransactionType!

    """
    Show description of the transaction
    For example, "Payment by Mastercard ***1343"
    """
    description: String

    """
    When the transaction appears
    """
    dtCrated: String!

    """
    List of debit and credit records.
    The sum of theirs amounts must be equals ZERO
    """
    entries: [Entry]!
  }
`
