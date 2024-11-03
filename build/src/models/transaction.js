"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = void 0;
var entry_1 = require("./entry");
var uuid_1 = require("uuid");
var currency_1 = require("../types/currency");
/**
 * Available transaction types
 */
var TransactionType;
(function (TransactionType) {
    /**
     * Transaction that increases account and cashbook
     */
    TransactionType["Deposit"] = "Deposit";
    /**
     * Transaction that decreases account and cashbook
     */
    TransactionType["Withdraw"] = "Withdraw";
    /**
     * Tranasction that decreases account and increases our revenue
     */
    TransactionType["Purchase"] = "Purchase";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
/**
 * Transaction Model
 */
var Transaction = /** @class */ (function () {
    /**
     * @param data - transaction payload
     */
    function Transaction(data) {
        /**
         * Transaction identifier. UUIDv4
         */
        this.id = '';
        /**
         * One of listed transaction types
         */
        this.type = TransactionType.Deposit;
        /**
         * Creation date as unixtime
         */
        this.dtCreated = Date.now();
        /**
         * Transaction entries
         */
        this.entries = [];
        /**
         * Transaction description
         */
        this.description = '';
        /**
         * Is transaction already posted
         */
        this.posted = false;
        if (!data.id) {
            this.id = uuid_1.v4();
        }
        else {
            this.id = data.id;
            this.posted = true;
        }
        this.type = data.type || this.type;
        this.dtCreated = data.dtCreated || this.dtCreated;
        this.description = data.description || this.description;
        this.entries = data.entries || this.entries;
    }
    /**
     * Creates debit entry and adds to the list
     *
     * @param {Account} account - target account
     * @param {number} amount - entry amount
     *
     * @returns {Transaction}
     */
    Transaction.prototype.debit = function (account, amount) {
        var entry = new entry_1.Entry({
            type: entry_1.EntryType.Dr,
            accountId: account.id,
            transactionId: this.id,
            amount: amount * currency_1.PENNY_MULTIPLIER,
        });
        this.add(entry);
        return this;
    };
    /**
     * Creates credit entry and adds to the list
     *
     * @param {Account} account - target account
     * @param {number} amount - entry amount
     *
     * @returns {Transaction}
     */
    Transaction.prototype.credit = function (account, amount) {
        var entry = new entry_1.Entry({
            type: entry_1.EntryType.Cr,
            accountId: account.id,
            transactionId: this.id,
            amount: amount * currency_1.PENNY_MULTIPLIER,
        });
        this.add(entry);
        return this;
    };
    /**
     * Checks transaction if it is balanced
     */
    Transaction.prototype.isBalanced = function () {
        var result = 0;
        this.entries.forEach(function (entry) {
            if (entry.isDebit()) {
                result += entry.amount;
            }
            else {
                result -= entry.amount;
            }
        });
        return result === 0;
    };
    /**
     * Locks transaction so that it can not be posted again
     */
    Transaction.prototype.lock = function () {
        this.posted = true;
    };
    /**
     * True if it is already posted
     */
    Transaction.prototype.isLocked = function () {
        return this.posted;
    };
    /**
     * Adds entry to the list
     *
     * @param entry - concrete debit or credit entry
     */
    Transaction.prototype.add = function (entry) {
        this.entries.push(entry);
    };
    return Transaction;
}());
exports.default = Transaction;
