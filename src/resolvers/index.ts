import merge from 'lodash.merge';
import scalars from './scalars';

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

export default merge(indexResolver, scalars);
