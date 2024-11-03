"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var entry_1 = require("../../models/entry");
var currency_1 = require("../../types/currency");
/**
 * Concrete ITransactionRepository implementation. Uses MongoDB
 */
var TransactionRepository = /** @class */ (function () {
    /**
     * Creates account transaction instance
     *
     * @param db - MongoDB client
     */
    function TransactionRepository(db) {
        this.db = db;
        this.collection = this.db.collection('transactions');
    }
    /**
     * This method used to validate and store the transaction
     * The transaction passed once or not balanced cannot be committed
     *
     * @param transaction - target transaction
     */
    TransactionRepository.prototype.commit = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (transaction.isLocked()) {
                            throw new Error('Transaction already posted');
                        }
                        if (!transaction.isBalanced()) {
                            throw new Error('Transaction is not balanced');
                        }
                        data = {
                            id: transaction.id,
                            type: transaction.type,
                            description: transaction.description,
                            dtCreated: transaction.dtCreated,
                            entries: transaction.entries,
                        };
                        return [4 /*yield*/, this.collection.insertOne(data)];
                    case 1:
                        _a.sent();
                        /** lock transaction */
                        transaction.lock();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Finds all transactions for given account and time range and calculates balance by summing debit and credit entries
     *
     * @param account - account to find balance for
     * @param range - date range by which transactions should be filtered
     */
    TransactionRepository.prototype.findBalanceForAccount = function (account, range) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, from, _b, to, timeFilter, pipeline, dbResult, accountData, diff;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = range || {}, from = _a.from, _b = _a.to, to = _b === void 0 ? new Date() : _b;
                        timeFilter = [
                            { dtCreated: { $lte: +to } },
                        ];
                        if (from !== undefined) {
                            timeFilter.push({ dtCreated: { $gte: +from } });
                        }
                        pipeline = [
                            {
                                $match: {
                                    $and: timeFilter,
                                },
                            },
                            {
                                $unwind: '$entries',
                            },
                            {
                                $match: {
                                    'entries.accountId': account.id,
                                },
                            },
                            {
                                $group: {
                                    _id: '$entries.accountId',
                                    dr: { $sum: { $cond: [{ $eq: ['$entries.type', entry_1.EntryType.Dr] }, '$entries.amount', 0] } },
                                    cr: { $sum: { $cond: [{ $eq: ['$entries.type', entry_1.EntryType.Cr] }, '$entries.amount', 0] } },
                                },
                            },
                        ];
                        return [4 /*yield*/, this.collection.aggregate(pipeline).toArray()];
                    case 1:
                        dbResult = _c.sent();
                        accountData = dbResult[0];
                        if (!accountData) {
                            return [2 /*return*/, 0];
                        }
                        diff = accountData.cr - accountData.dr;
                        return [2 /*return*/, (account.isCredit() ? diff : -diff) / currency_1.PENNY_MULTIPLIER];
                }
            });
        });
    };
    return TransactionRepository;
}());
exports.default = TransactionRepository;
