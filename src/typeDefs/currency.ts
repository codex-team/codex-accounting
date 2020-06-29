import { gql } from 'apollo-server-express';

export default gql`
  """
  Available currencies
  """
  enum Currency {
    """
    USA dollars
    """
    USD
  }
`



