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
var AccountMutations = {
    /**
     * Method creates new account
     *
     * @param parent - request parent object
     * @param input - mutation input
     * @param repositories - model repositories from global context
     */
    create: function (parent, _a, _b) {
        var input = _a.input;
        var repositories = _b.repositories;
        return __awaiter(this, void 0, void 0, function () {
            var accountRepository, newAccount;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        accountRepository = repositories.account;
                        return [4 /*yield*/, accountRepository.create(input.name, input.type, input.currency)];
                    case 1:
                        newAccount = _c.sent();
                        return [2 /*return*/, {
                                recordId: newAccount.id,
                                record: newAccount,
                            }];
                }
            });
        });
    },
};
var AccountProps = {
    /**
     * Method returns accounts balance
     *
     * @param parent - Account to find balance for
     * @param range - date range by which transactions should be filtered
     * @param repositories - model repositories from global context
     */
    balance: function (parent, range, _a) {
        var repositories = _a.repositories;
        return __awaiter(this, void 0, void 0, function () {
            var transactionsRepository, amount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transactionsRepository = repositories.transaction;
                        return [4 /*yield*/, transactionsRepository.findBalanceForAccount(parent, range)];
                    case 1:
                        amount = _b.sent();
                        return [2 /*return*/, {
                                amount: amount,
                            }];
                }
            });
        });
    },
};
var Query = {
    /**
     * Method returns account by identifier
     *
     * @param parent - request parent object
     * @param id - requesting account identifier
     * @param repositories - model repositories from global context
     */
    getAccount: function (parent, _a, _b) {
        var id = _a.id;
        var repositories = _b.repositories;
        return __awaiter(this, void 0, void 0, function () {
            var accountRepository;
            return __generator(this, function (_c) {
                accountRepository = repositories.account;
                return [2 /*return*/, accountRepository.find(id)];
            });
        });
    },
};
var Mutation = {
    account: function () { return ({}); },
};
exports.default = {
    Account: AccountProps,
    Mutation: Mutation,
    Query: Query,
    AccountMutations: AccountMutations,
};
