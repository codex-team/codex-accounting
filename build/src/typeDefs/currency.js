"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  \"\"\"\n  Available currencies\n  \"\"\"\n  enum Currency {\n    \"\"\"\n    USA dollars.\n    All amounts will be stored in cents.\n    \"\"\"\n    USD\n\n    \"\"\"\n    Roubles.\n    \"\"\"\n    RUB\n  }\n"], ["\n  \"\"\"\n  Available currencies\n  \"\"\"\n  enum Currency {\n    \"\"\"\n    USA dollars.\n    All amounts will be stored in cents.\n    \"\"\"\n    USD\n\n    \"\"\"\n    Roubles.\n    \"\"\"\n    RUB\n  }\n"])));
var templateObject_1;
