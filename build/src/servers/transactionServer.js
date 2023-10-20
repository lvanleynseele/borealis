"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTransactionServer = void 0;
// import path from "path";
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const transactionService_1 = require("../transaction/transactionService");
const PORT = 8084;
const PROTO_FILE = '../../proto/transaction.proto';
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef);
const transactionPackage = grpcObject.transactionPackage;
function startTransactionServer() {
    const server = getServer();
    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server started on port ${PORT}`);
        server.start();
    });
}
exports.startTransactionServer = startTransactionServer;
function getServer() {
    const server = new grpc.Server();
    server.addService(transactionPackage.TransactionService.service, {
        TransactionRequest: (req, res) => {
            transactionService_1.transactionService.transactionRequest(req.request.senderId, req.request.receiverId, req.request.amount)
                .then((result) => {
                if (result) {
                    res(null, null);
                }
                else {
                    res(new Error("Transaction failed"), null);
                }
            }).catch((err) => {
                res(err, null);
            });
        },
    });
    return server;
}
//# sourceMappingURL=transactionServer.js.map