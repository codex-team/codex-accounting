import { gql } from 'apollo-server-express';

export default gql`
  enum OperationType {
    """
    The type that increased account balance
    """
    Increase

    """
    The type that decreased account balance
    """
    Decrease
  }

  """
  Account single ledger operation
  """
  type Operation {
    """
    Transaction identifier
    """
    transactionID: String!

    """
    Increase or decrease operation
    """
    type: OperationType!

    """
    Operation description
    """
    description: String!

    """
    Operation date
    """
    dateCreated: DateTime!

    """
    Positive value of the record in minumal currency value (cents)
    """
    amount: NonNegativeInt!
  }
`;
