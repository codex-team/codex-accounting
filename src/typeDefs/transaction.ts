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
    Removing out
    """
    Withdrawal

    """
    Payment for something
    """
    Purchase
  }

  """
  Represents a single money transfer operation.
  MUST contain debit and credit entries with the balanced (=0) total amount
  """
  type Transaction {
    """
    Transaction unique identifier
    """
    id: ID!

    """
    What kind of money movement
    """
    type: TransactionType!

    """
    The description of the transaction
    For example, "Payment by Mastercard ***1343"
    """
    description: String

    """
    When the transaction did appeared
    """
    dtCreated: DateTime!

    """
    List of debit and credit records.
    The sum of theirs amounts must be equals ZERO
    """
    entries: [Entry]!
  }
`;
