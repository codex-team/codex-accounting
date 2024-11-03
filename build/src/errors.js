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
exports.AccountingServerError = exports.DatabaseError = exports.NonCriticalError = void 0;
var apollo_server_express_1 = require("apollo-server-express");
/**
 * Class for non-critical errors (when the app works fine, but we need to send the error to the user, for example, auth-errors and others)
 * Events inherited from this class won't be send to hawk
 */
var NonCriticalError = /** @class */ (function (_super) {
    __extends(NonCriticalError, _super);
    function NonCriticalError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NonCriticalError;
}(apollo_server_express_1.ApolloError));
exports.NonCriticalError = NonCriticalError;
/**
 * Class for critical database connection errors
 */
var DatabaseError = /** @class */ (function (_super) {
    __extends(DatabaseError, _super);
    function DatabaseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DatabaseError;
}(Error));
exports.DatabaseError = DatabaseError;
/**
 * Class for critical server errors
 */
var AccountingServerError = /** @class */ (function (_super) {
    __extends(AccountingServerError, _super);
    function AccountingServerError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AccountingServerError;
}(Error));
exports.AccountingServerError = AccountingServerError;
