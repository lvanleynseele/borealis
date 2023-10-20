"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTransactionClient = exports.transactionClient = void 0;
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PORT = 8084; //process.env.PORT || 8084;
const PROTO_FILE = '../proto/transaction.proto';
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef);
exports.transactionClient = new grpcObject.transactionPackage.TransactionService(`0.0.0.0:${PORT}`, grpc.credentials.createInsecure());
function startTransactionClient() {
    exports.transactionClient.waitForReady(Infinity, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        onClientReady();
    });
}
exports.startTransactionClient = startTransactionClient;
function onClientReady() {
    console.log('Transaction Client ready');
}
//# sourceMappingURL=transactionClient.js.map