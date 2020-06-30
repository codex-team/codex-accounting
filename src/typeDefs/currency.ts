import { gql } from 'apollo-server-express';

export default gql`
  """
  Available currencies
  """
  enum Currency {
    """
    USA dollars.
    All amounts will be stored in cents.
    """
    USD
  }
`
