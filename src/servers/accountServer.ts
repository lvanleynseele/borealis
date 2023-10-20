const path = require("path");
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../../proto/account"
import { AccountServiceHandlers } from '../../proto/accountPackage/AccountService'
import { Account } from "../../proto/accountPackage/Account";
import { error } from "console";
import { accountService } from "../account/accountService";
import { account } from "../..";

const PORT = 8083; //process.env.PORT || 8082;
const PROTO_FILE = '../../proto/account.proto';

let accounts: Account[] = []

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
const accountPackage = grpcObject.accountPackage;

export const accountServer = getServer()

export function startAccountServer() {
    accountServer.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(`Server started on port ${PORT}`);
        accountServer.start();
    })
}

function getServer() {
    const server = new grpc.Server();
    server.addService(accountPackage.AccountService.service, {
        AddAccount: async (req, res) => {
            accountService.addAccount(req.request).then((result: any) => {
                res(null, null);
            }).catch((err: any) => {
                res(err, null);
            })
        },
        GetAccount: async (req, res) => {
            accountService.getAccount(req.request.id!).then((result: any) => {
                res(null, result.account);
            }).catch((err: any) => {
                res(err, null);
            });
        },
        GetAllAccounts: async (call) => {
            accountService.getAllAccounts().then((result: any) => {                
                result.forEach((account: any) => {
                    call.write({...account})
                })
                call.end();
            }).catch((err: any) => {
                call.emit("error", err);
                call.end();
            });
        },
        UpdateAccount: async (req, res) => {
            accountService.updateAccount(req.request.updatedAccount!).then((result: any) => {
                res(null, null);
            }).catch((err: any) => {
                res(err, null);
            });
        },
        DeleteAccount: async (req, res) => {
            accountService.deleteAccount(req.request.id!).then((result: any) => {
                res(null, null);
            }).catch((err: any) => {
                res(err, null);
            });
        },
        DebitRequest: (req, res) => {
            accountService.debitRequest(req.request.id!, req.request.amount!).then((result: any) => {
                res(null, null);
            }).catch((err: any) => {    
                res(err, null);
            });
        },
        CreditRequest: (req, res) => {
            accountService.creditRequest(req.request.id!, req.request.amount!).then((result: any) => {
                res(null, null);
            }).catch((err: any) => {
                res(err, null);
            });
        }
    } as AccountServiceHandlers)
    return server;
}