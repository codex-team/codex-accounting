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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var resolvers_1 = __importDefault(require("./resolvers"));
var typeDefs_1 = __importDefault(require("./typeDefs"));
var nodejs_1 = __importDefault(require("@hawk.so/nodejs"));
var errors_1 = require("./errors");
var middleware_1 = require("graphql-voyager/middleware");
var controller_1 = require("./controller");
var transactionRepository_1 = __importDefault(require("./repositories/implementations/transactionRepository"));
var accountRepository_1 = __importDefault(require("./repositories/implementations/accountRepository"));
/**
 * Hawk API server
 */
var AccountantServer = /** @class */ (function () {
    /**
     * Creates an instance of HawkAPI.
     * Requires PORT and MONGO_URL env vars to be set.
     *
     * @param serverPort - port to listen for requests
     * @param enablePlayground - is playground enable on GET /graphql route
     * @param dbUri - database URI for connection
     */
    function AccountantServer(serverPort, enablePlayground, dbUri) {
        var _this = this;
        /**
         * Express application
         */
        this.app = express_1.default();
        this.serverPort = serverPort;
        this.enablePlayground = enablePlayground;
        this.app.use(express_1.default.json());
        this.app.use('/voyager', middleware_1.express({ endpointUrl: '/graphql' }));
        this.dbController = new controller_1.DatabaseController(dbUri);
        this.server = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDefs_1.default,
            debug: true,
            resolvers: resolvers_1.default,
            playground: this.enablePlayground,
            introspection: this.enablePlayground,
            formatError: function (error) {
                if (error.originalError instanceof errors_1.NonCriticalError) {
                    return error;
                }
                console.error(error.originalError);
                if (error.originalError instanceof Error) {
                    nodejs_1.default.send(error.originalError);
                }
                return error;
            },
            /**
             * Pass global resolvers context (each resolver will have an access to the context properties by third param)
             */
            context: function () { return _this.createContext(); },
        });
        this.server.applyMiddleware({ app: this.app });
        /**
         * In apollo-server-express integration it is necessary to use existing HTTP server to use GraphQL subscriptions
         * {@see https://www.apollographql.com/docs/apollo-server/features/subscriptions/#subscriptions-with-additional-middleware}
         */
        this.httpServer = http_1.default.createServer(this.app);
        this.server.installSubscriptionHandlers(this.httpServer);
    }
    /**
     * Returns created context object with repository instance
     *
     * @throws {AccountingServerError} if the context wasn't created by the `createContext` method
     */
    AccountantServer.prototype.getContext = function () {
        if (this.context == undefined) {
            throw new errors_1.AccountingServerError('You need to call the `createContext` method before call `getContext`');
        }
        return this.context;
    };
    /**
     * Start API server
     */
    AccountantServer.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbController.connect()];
                    case 1:
                        _a.sent();
                        this.createContext();
                        return [2 /*return*/, new Promise(function (resolve) {
                                _this.httpServer.listen({ port: _this.serverPort }, function () {
                                    console.log("\uD83D\uDE80 Server ready at http://localhost:" + _this.serverPort + _this.server.graphqlPath);
                                    resolve();
                                });
                            })];
                }
            });
        });
    };
    /**
     * Returns object which contains repository instances
     *
     * @throws {AccountingServerError} if the server instance wasn't started by the `start` method
     */
    AccountantServer.prototype.createContext = function () {
        // @todo impl and use context wrapper class
        if (this.dbController == undefined) {
            throw new errors_1.AccountingServerError('You need to call the `start` method before call `createContext`');
        }
        if (this.context !== undefined) {
            return this.context;
        }
        this.context = {
            repositories: {
                transaction: new transactionRepository_1.default(this.dbController.getConnection()),
                account: new accountRepository_1.default(this.dbController.getConnection()),
            },
        };
        return this.context;
    };
    return AccountantServer;
}());
exports.default = AccountantServer;
