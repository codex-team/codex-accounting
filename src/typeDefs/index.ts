import {gql, concatenateTypeDefs} from 'apollo-server-express';
import Currency from './currency';
import Account from './account';
import Entry from './entry';
import Transaction from './transaction';


const rootSchema = gql`
  """
  API queries
  """
  type Query {
    """
    Healthcheck endpoint
    """
    health: String!
  }

  """
  API mutations
  """
  type Mutation {
    """
    Unused field to let extend this type
    """
    _: Boolean
  }
`;

export default concatenateTypeDefs(
  [
    rootSchema,
    Currency,
    Account,
    Entry,
    Transaction,
  ]
);
