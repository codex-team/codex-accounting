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
    transactionId: String!

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
    dtCreated: DateTime!

    """
    Positive value of the record in minimal currency value (cents)
    """
    amount: NonNegativeInt!
  }
`;
