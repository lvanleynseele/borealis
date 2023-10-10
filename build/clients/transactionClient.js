"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionClient = void 0;
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PORT = 8084; //process.env.PORT || 8084;
const PROTO_FILE = './proto/transaction.proto';
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef);
exports.transactionClient = new grpcObject.transactionPackage.TransactionService(`0.0.0.0:${PORT}`, grpc.credentials.createInsecure());
const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
exports.transactionClient.waitForReady(deadline, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    onClientReady();
});
function onClientReady() {
    exports.transactionClient.TransactionRequest({ senderId: "28912384050", receiverId: "28912384051", amount: Math.random() * 100000 }, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res);
    });
}
//# sourceMappingURL=transactionClient.js.map