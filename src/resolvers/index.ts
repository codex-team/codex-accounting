import merge from 'lodash.merge';
import scalars from './scalars';
import accounts from './accounts';
import purchaseMutations from './purchaseMutations';
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

export default merge(indexResolver, scalars, accounts, purchaseMutations, withdraws, deposits);
