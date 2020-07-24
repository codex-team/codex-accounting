import merge from 'lodash.merge';
import scalars from './scalars';
import accounts from './accounts';
import deposits from "./deposits";

/**
 * See all types and fields here {@link ../typeDefs/}
 */
const indexResolver = {
  Query: {
    /**
     * Healthcheck endpoint
     *
     * @returns {string}
     */
    health: (): string => {
      return 'ok';
    },
  },
};

export default merge(indexResolver, scalars, accounts, deposits);
