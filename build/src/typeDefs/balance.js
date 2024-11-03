"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    \"\"\"\n    Balance object\n    \"\"\"\n    type Balance {\n      \"\"\"\n      Balance left for specified period\n      \"\"\"\n      amount: Float!\n\n#      \"\"\"\n#      Last operations with account (deposits, purchases or others)\n#      If limit parameter is defined, will return first <limit> operations\n#      \"\"\"\n#      transactions(limit: Int): [Operation!]!\n    }\n"], ["\n    \"\"\"\n    Balance object\n    \"\"\"\n    type Balance {\n      \"\"\"\n      Balance left for specified period\n      \"\"\"\n      amount: Float!\n\n#      \"\"\"\n#      Last operations with account (deposits, purchases or others)\n#      If limit parameter is defined, will return first <limit> operations\n#      \"\"\"\n#      transactions(limit: Int): [Operation!]!\n    }\n"])));
var templateObject_1;
