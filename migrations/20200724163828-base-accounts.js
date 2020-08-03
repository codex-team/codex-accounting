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
      id: '22354b8a-b501-44ed-bff0-d3bd8d899dbf',
      name: 'Hawk cashbook',
      type: 'Asset',
      currency: 'USD',
    };

    const revenue = {
      id: '953fb6fd-5a86-4c34-9587-abd493b1175e',
      name: 'Hawk revenue',
      type: 'Revenue',
      currency: 'USD',
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
      id: '22354b8a-b501-44ed-bff0-d3bd8d899dbf',
    });

    db.collection('accounts').remove({
      id: '953fb6fd-5a86-4c34-9587-abd493b1175e',
    });
  },
};
