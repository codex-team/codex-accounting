"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var currency_1 = __importDefault(require("./currency"));
var account_1 = __importDefault(require("./account"));
var balance_1 = __importDefault(require("./balance"));
var entry_1 = __importDefault(require("./entry"));
var transaction_1 = __importDefault(require("./transaction"));
var scalars_1 = __importDefault(require("./scalars"));
var accountType_1 = __importDefault(require("./accountType"));
var operation_1 = __importDefault(require("./operation"));
var accountMutations_1 = __importDefault(require("./accountMutations"));
var purchaseMutations_1 = __importDefault(require("./purchaseMutations"));
var withdrawMutations_1 = __importDefault(require("./withdrawMutations"));
var depositMutations_1 = __importDefault(require("./depositMutations"));
var rootSchema = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  \"\"\"\n  API queries\n  \"\"\"\n  type Query {\n    \"\"\"\n    Healthcheck endpoint\n    \"\"\"\n    health: String!\n  }\n\n  \"\"\"\n  API mutations\n  \"\"\"\n  type Mutation {\n    \"\"\"\n    Unused field to let extend this type\n    \"\"\"\n    _: Boolean\n  }\n"], ["\n  \"\"\"\n  API queries\n  \"\"\"\n  type Query {\n    \"\"\"\n    Healthcheck endpoint\n    \"\"\"\n    health: String!\n  }\n\n  \"\"\"\n  API mutations\n  \"\"\"\n  type Mutation {\n    \"\"\"\n    Unused field to let extend this type\n    \"\"\"\n    _: Boolean\n  }\n"])));
exports.default = apollo_server_express_1.concatenateTypeDefs([
    rootSchema,
    scalars_1.default,
    currency_1.default,
    balance_1.default,
    account_1.default,
    entry_1.default,
    transaction_1.default,
    accountType_1.default,
    operation_1.default,
    accountMutations_1.default,
    purchaseMutations_1.default,
    withdrawMutations_1.default,
    depositMutations_1.default,
]);
var templateObject_1;
