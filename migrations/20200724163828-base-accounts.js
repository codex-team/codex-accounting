/**
 * Migration creates base accounting accounts such as Cashbook and revenue
 */
module.exports = {
  /**
   * Create Cashbook and Revenue accounts with USD currency
   *
   * @param db
   * @param client
   * @returns {Promise<void>}
   */
  async up(db, client) {
    const cashbook = {
      id: process.env.CASHBOOK_ACCOUNT_ID,
      name: process.env.CASHBOOK_ACCOUNT_NAME,
      type: 'Asset',
      currency: 'USD',
      dtCreated: Date.now()
    };

    const revenue = {
      id: process.env.REVENUE_ACCOUNT_ID,
      name: process.env.REVENUE_ACCOUNT_NAME,
      type: 'Revenue',
      currency: 'USD',
      dtCreated: Date.now()
    };

    db.collection('accounts').insertOne(cashbook);
    db.collection('accounts').insertOne(revenue);
  },

  /**
   * Rollback account creation
   *
   * @param db
   * @param client
   * @returns {Promise<void>}
   */
  async down(db, client) {
    db.collection('accounts').remove({
      id: process.env.CASHBOOK_ACCOUNT_ID,
    });

    db.collection('accounts').remove({
      id: process.env.REVENUE_ACCOUNT_ID,
    });
  },
};
