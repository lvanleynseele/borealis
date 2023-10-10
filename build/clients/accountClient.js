"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountClient = void 0;
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PORT = 8083; //process.env.PORT || 8082;
const PROTO_FILE = './proto/account.proto';
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef);
exports.accountClient = new grpcObject.accountPackage.AccountService(`0.0.0.0:${PORT}`, grpc.credentials.createInsecure());
const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
exports.accountClient.waitForReady(deadline, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    onClientReady();
});
function onClientReady() {
    exports.accountClient.AddAccount({ id: "28912384050", name: "some account", balance: Math.random() }, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res);
    });
}
//# sourceMappingURL=accountClient.js.map