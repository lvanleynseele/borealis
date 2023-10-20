"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAccountServer = exports.accountServer = void 0;
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const accountService_1 = require("../account/accountService");
const PORT = 8083; //process.env.PORT || 8082;
const PROTO_FILE = '../../proto/account.proto';
let accounts = [];
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef);
const accountPackage = grpcObject.accountPackage;
exports.accountServer = getServer();
function startAccountServer() {
    exports.accountServer.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server started on port ${PORT}`);
        exports.accountServer.start();
    });
}
exports.startAccountServer = startAccountServer;
function getServer() {
    const server = new grpc.Server();
    server.addService(accountPackage.AccountService.service, {
        AddAccount: async (req, res) => {
            accountService_1.accountService.addAccount(req.request).then((result) => {
                res(null, result.account);
            }).catch((err) => {
                res(err, null);
            });
        },
        GetAccount: async (req, res) => {
            accountService_1.accountService.getAccount(req.request.id).then((result) => {
                res(null, result.account);
            }).catch((err) => {
                res(err, null);
            });
        },
        GetAllAccounts: async (call) => {
            accountService_1.accountService.getAllAccounts().then((result) => {
                console.log("get all accounts");
                result.forEach((account) => {
                    call.write({ ...account });
                });
                call.end();
            }).catch((err) => {
                call.emit("error", err);
                call.end();
            });
        },
        UpdateAccount: async (req, res) => {
            accountService_1.accountService.updateAccount(req.request.updatedAccount).then((result) => {
                res(null, result.account);
            }).catch((err) => {
                res(err, null);
            });
        },
        DeleteAccount: async (req, res) => {
            accountService_1.accountService.deleteAccount(req.request.id).then((result) => {
                res(null, null);
            }).catch((err) => {
                res(err, null);
            });
        },
        DebitRequest: (req, res) => {
            accountService_1.accountService.debitRequest(req.request.id, req.request.amount).then((result) => {
                res(null, result.newBalance);
            }).catch((err) => {
                res(err, null);
            });
        },
        CreditRequest: (req, res) => {
            accountService_1.accountService.creditRequest(req.request.id, req.request.amount).then((result) => {
                res(null, result.newBalance);
            }).catch((err) => {
                res(err, null);
            });
        }
    });
    return server;
}
//# sourceMappingURL=accountServer.js.map