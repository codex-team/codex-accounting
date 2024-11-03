"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_merge_1 = __importDefault(require("lodash.merge"));
var scalars_1 = __importDefault(require("./scalars"));
var accounts_1 = __importDefault(require("./accounts"));
var purchases_1 = __importDefault(require("./purchases"));
var withdraws_1 = __importDefault(require("./withdraws"));
var deposits_1 = __importDefault(require("./deposits"));
/**
 * See all types and fields here {@link ../typeDefs/}
 */
var indexResolver = {
    Query: {
        /**
         * Healthcheck endpoint
         *
         * @returns {string}
         */
        health: function () { return 'ok'; },
    },
};
exports.default = lodash_merge_1.default(indexResolver, scalars_1.default, accounts_1.default, purchases_1.default, withdraws_1.default, deposits_1.default);
