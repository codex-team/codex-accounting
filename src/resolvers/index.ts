import merge from 'lodash.merge';
import scalars from './scalars';
import accounts from './accounts';
import purchases from './purchases';
import withdraws from './withdraws';
import deposits from './deposits';

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
    health: (): string => 'ok',
  },
};

export default merge(indexResolver, scalars, accounts, purchases, withdraws, deposits);
