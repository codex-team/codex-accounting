"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  \"\"\"\n  Available account types\n  See: https://www.principlesofaccounting.com/account-types/\n  \"\"\"\n  enum AccountType {\n    \"\"\"\n    When we need to pay some money to someone (credit)\n    \"\"\"\n    Liability\n\n    \"\"\"\n    Something valuable belonging to a person or organization\n    that can be used for the payment of debts (debit) \u2014 Cashbook\n    \"\"\"\n    Asset\n\n    \"\"\"\n    When we have some money earned from services (credit)\n    \"\"\"\n    Revenue\n\n    \"\"\"\n    When we pay some our money for some serivces (debit)\n    \"\"\"\n    Expense\n  }\n"], ["\n  \"\"\"\n  Available account types\n  See: https://www.principlesofaccounting.com/account-types/\n  \"\"\"\n  enum AccountType {\n    \"\"\"\n    When we need to pay some money to someone (credit)\n    \"\"\"\n    Liability\n\n    \"\"\"\n    Something valuable belonging to a person or organization\n    that can be used for the payment of debts (debit) \u2014 Cashbook\n    \"\"\"\n    Asset\n\n    \"\"\"\n    When we have some money earned from services (credit)\n    \"\"\"\n    Revenue\n\n    \"\"\"\n    When we pay some our money for some serivces (debit)\n    \"\"\"\n    Expense\n  }\n"])));
var templateObject_1;
