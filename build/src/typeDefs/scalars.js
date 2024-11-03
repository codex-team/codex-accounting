"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  \"\"\"\n  A date-time string at UTC, such as 2007-12-03T10:15:30Z\n  \"\"\"\n  scalar DateTime\n\n  \"\"\"\n  Integers that will have a value of 0 or more\n  \"\"\"\n  scalar NonNegativeInt\n"], ["\n  \"\"\"\n  A date-time string at UTC, such as 2007-12-03T10:15:30Z\n  \"\"\"\n  scalar DateTime\n\n  \"\"\"\n  Integers that will have a value of 0 or more\n  \"\"\"\n  scalar NonNegativeInt\n"])));
var templateObject_1;
