"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAccountClient = exports.accountClient = void 0;
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PORT = 8083; //process.env.PORT || 8082;
const PROTO_FILE = '../proto/account.proto';
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef);
exports.accountClient = new grpcObject.accountPackage.AccountService(`0.0.0.0:${PORT}`, grpc.credentials.createInsecure());
function startAccountClient() {
    exports.accountClient.waitForReady(Infinity, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        onClientReady();
    });
}
exports.startAccountClient = startAccountClient;
function onClientReady() {
    console.log('Account Client ready');
}
//# sourceMappingURL=accountClient.js.map