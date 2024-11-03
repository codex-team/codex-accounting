"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = exports.EntryType = void 0;
/**
 * Available entry types (debit or credit)
 */
var EntryType;
(function (EntryType) {
    /**
     * Debit entry
     */
    EntryType[EntryType["Dr"] = 0] = "Dr";
    /**
     * Credit entry
     */
    EntryType[EntryType["Cr"] = 1] = "Cr";
})(EntryType = exports.EntryType || (exports.EntryType = {}));
/**
 * Entry Model
 */
var Entry = /** @class */ (function () {
    /**
     * @param data - entry payload
     */
    function Entry(data) {
        /**
         * Represents entry debit or credit type
         */
        this.type = EntryType.Dr;
        /**
         * Reference to Account ID
         */
        this.accountId = '';
        /**
         * Reference to Transaction ID
         */
        this.transactionId = '';
        /**
         * Entry amount
         */
        this.amount = 0;
        if (data.amount < 0) {
            throw new Error('Amount must be positive');
        }
        if (data.accountId.trim() === '') {
            throw new Error('Account ID is empty');
        }
        if (data.transactionId.trim() === '') {
            throw new Error('Transaction ID is empty');
        }
        this.type = data.type;
        this.accountId = data.accountId;
        this.transactionId = data.transactionId;
        this.amount = data.amount;
    }
    /**
     * Returns true if entry is debit
     *
     * @returns {boolean}
     */
    Entry.prototype.isDebit = function () {
        return this.type === EntryType.Dr;
    };
    /**
     * Returns true if entry is credit
     *
     * @returns {boolean}
     */
    Entry.prototype.isCredit = function () {
        return this.type === EntryType.Cr;
    };
    return Entry;
}());
exports.Entry = Entry;
