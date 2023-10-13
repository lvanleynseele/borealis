"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAccountServer = exports.accountServer = void 0;
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const console_1 = require("console");
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
        AddAccount: (req, res) => {
            accounts.push(req.request);
            res(null, req.request);
        },
        GetAccount: (req, res) => {
            const accountFound = accounts.find(a => a.id == req.request.id);
            if (accountFound) {
                res(null, accountFound);
            }
            else {
                const accountNotFoundError = (0, console_1.error)(`Could not find account with id ${req.request}`);
                res(null, null);
            }
        },
        GetAllAccounts: (call) => {
            accounts.forEach(a => {
                call.write({ id: a.id, name: a.name, balance: a.balance });
            });
            call.end();
        },
        UpdateAccount: (req, res) => {
            var _a;
            let accountToUpdate = accounts.find(a => { var _a; return a.id == ((_a = req.request.updatedAccount) === null || _a === void 0 ? void 0 : _a.id); });
            if (accountToUpdate) {
                accountToUpdate = req.request.updatedAccount;
                res(null, req.request.updatedAccount);
            }
            else {
                console.log(`COuld not find account with id ${(_a = req.request.updatedAccount) === null || _a === void 0 ? void 0 : _a.id}`);
            }
        },
        DeleteAccount: (req, res) => {
            accounts = accounts.filter(a => a.id != req.request.id);
            console.log(`account with id ${req.request.id} deleted`);
            res(null, null);
        },
        DebitRequest: (req, res) => {
            // let account =  accounts.find(a => a.id == req.request.id);
            // if(account){
            //     account.balance? -= req.request.amount? ;
            //     res(null, { newBalance: account.balance})
            // }
            // else {
            //     console.log(`could not find account with id ${req.request.id}`);
            //     res(null, null);
            // }
        },
        CreditRequest: (req, res) => {
            var _a;
            let account = accounts.find(a => a.id == req.request.id);
            const credit = (_a = req.request.amount) === null || _a === void 0 ? void 0 : _a.low;
            if (account && account.balance != null) {
                console.log(`account balance: ${account.balance}`);
                console.log(`credit: ${credit}`);
                res(null, null);
                // const balance = account.balance ? account.balance : 0
                // account.balance = balance + credit
                // res(null, { newBalance: account.balance})
            }
            else {
                console.log(`could not find account with id ${req.request.id}`);
                res(null, null);
            }
        }
    });
    return server;
}
//# sourceMappingURL=accountServer.js.map