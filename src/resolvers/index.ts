import merge from 'lodash.merge'
/**
 * See all types and fields here {@link ../typeDefs/}
 */
const indexResolver = {
    Query: {
        /**
         * Healthcheck endpoint
         * @return {string}
         */
        health: () => 'ok',
    },
};

export default merge(indexResolver);
