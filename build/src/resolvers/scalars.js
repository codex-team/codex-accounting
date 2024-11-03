"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_scalars_1 = require("graphql-scalars");
exports.default = {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z
     */
    DateTime: graphql_scalars_1.DateTimeResolver,
    /**
     * Integers that will have a value of 0 or more
     */
    NonNegativeInt: graphql_scalars_1.NonNegativeIntResolver,
};
