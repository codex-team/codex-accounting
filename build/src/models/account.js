"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.AccountType = void 0;
var baseModel_1 = require("./baseModel");
var currency_1 = require("../types/currency");
var uuid_1 = require("uuid");
/**
 * List of available account types
 */
var AccountType;
(function (AccountType) {
    /**
     * Credit account that represents debts before customers
     */
    AccountType["Liability"] = "Liability";
    /**
     * Debit account, used as a cashbook
     */
    AccountType["Asset"] = "Asset";
    /**
     * Credit account that represents company incomes
     */
    AccountType["Revenue"] = "Revenue";
    /**
     * Debit account that represents company outcomes
     */
    AccountType["Expense"] = "Expense";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
/**
 * The list of debit accounts
 */
var debitAccounts = [AccountType.Asset, AccountType.Expense];
/**
 * The list of credit accounts
 */
var creditAccounts = [AccountType.Liability, AccountType.Revenue];
/**
 * Account Model
 */
var Account = /** @class */ (function (_super) {
    __extends(Account, _super);
    /**
     * @param data - account payload
     */
    function Account(data) {
        var _this = _super.call(this) || this;
        /**
         * Account identifier
         */
        _this.id = '';
        /**
         * Account name
         */
        _this.name = '';
        /**
         * Account type
         */
        _this.type = AccountType.Liability;
        /**
         * Account currency
         */
        _this.currency = currency_1.Currency.RUB;
        /**
         * Account creation time
         */
        _this.dtCreated = 0;
        if (!data.id) {
            _this.id = uuid_1.v4();
        }
        else {
            _this.id = data.id;
        }
        _this.name = data.name;
        _this.type = data.type;
        _this.currency = data.currency;
        _this.dtCreated = data.dtCreated;
        return _this;
    }
    /**
     * Returns true if it is debit account
     */
    Account.prototype.isDebit = function () {
        return debitAccounts.indexOf(this.type) !== -1;
    };
    /**
     * Returns true if it is credit account
     */
    Account.prototype.isCredit = function () {
        return creditAccounts.indexOf(this.type) !== -1;
    };
    return Account;
}(baseModel_1.BaseModel));
exports.Account = Account;
