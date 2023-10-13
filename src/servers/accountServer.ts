const path = require("path");
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../../proto/account"
import { AccountServiceHandlers } from '../../proto/accountPackage/AccountService'
import { Account } from "../../proto/accountPackage/Account";
import { error } from "console";

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
        AddAccount: (req, res) => {
            accounts.push(req.request);
            res(null, req.request);
        },
        GetAccount: (req, res) => {
            const accountFound = accounts.find(a => a.id == req.request.id);

            if (accountFound){
                res(null, accountFound)
            }
            else{
                const accountNotFoundError = error(`Could not find account with id ${req.request}`)
                res(null, null)
            }
        },
        GetAllAccounts: (call) => {
            accounts.forEach( a => {
                call.write({id: a.id, name: a.name, balance: a.balance});
            })

            call.end();
        },
        UpdateAccount: (req, res) => {
            let accountToUpdate = accounts.find(a => a.id == req.request.updatedAccount?.id);
            
            if(accountToUpdate) {
                accountToUpdate = req.request.updatedAccount;
                res(null, req.request.updatedAccount);
            }
            else{
                console.log(`COuld not find account with id ${req.request.updatedAccount?.id}`)
            }
        },
        DeleteAccount: (req, res) => {
            accounts = accounts.filter(a => a.id != req.request.id)

            console.log(`account with id ${req.request.id} deleted`)
            res(null, null)
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
            let account =  accounts.find(a => a.id == req.request.id);
            const credit = req.request.amount?.low!
            

            if(account && account.balance != null){

                console.log(`account balance: ${account.balance}`)
                console.log(`credit: ${credit}`)
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
    } as AccountServiceHandlers)
    return server;
}