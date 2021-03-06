require('dotenv').config().parsed;

/**
 * Get accounting DB name from the db-connection url like "mongodb://localhost:27017/accounting"
 */
const ACCOUNTING_DB_NAME = process.env.MONGO_ACCOUNTING_DATABASE_URI.split('/').pop();

// In this file you can configure migrate-mongo
const config = {
  mongodb: {
    url: process.env.MONGO_ACCOUNTING_DATABASE_URI,
    databaseName: ACCOUNTING_DB_NAME,

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // enables the new unified topology layer
      // connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      // socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    },
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'migrations',

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'migration-schema',
};

// Return the config as a promise
module.exports = config;
