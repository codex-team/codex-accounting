"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var nodejs_1 = __importDefault(require("@hawk.so/nodejs"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Enable HawkCatcher
 */
if (process.env.HAWK_CATCHER_TOKEN) {
    nodejs_1.default.init(process.env.HAWK_CATCHER_TOKEN);
}
if (!process.env.PORT) {
    console.error('Please, specify server port via .env PORT option');
    process.exit(1);
}
if (!process.env.MONGO_ACCOUNTING_DATABASE_URI) {
    console.error('Please, specify mongodb uri via .env MONGO_ACCOUNTING_DATABASE_URI option');
    process.exit(1);
}
var server = new server_1.default(+process.env.PORT, process.env.PLAYGROUND_ENABLE === 'true', process.env.MONGO_ACCOUNTING_DATABASE_URI);
server.start().catch(function (err) {
    nodejs_1.default.send(err);
    console.log('Server runtime error' + err);
});
