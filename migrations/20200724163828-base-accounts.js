/**
 * Migration creates base accounting accounts such as Cashbook and revenue
 */
import {AccountType} from "../src/models/account";
import {Currency} from "../src/types/currency";

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
      name: 'Hawk Cashbook account',
      type: AccountType.Asset,
      currency: Currency.USD,
    };

    const revenue = {
      id: process.env.REVENUE_ACCOUNT_ID,
      name: 'Hawk Revenue account',
      type: AccountType.Revenue,
      currency: Currency.USD,
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
