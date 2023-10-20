const path = require("path");
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/user"

const PORT = 8083; //process.env.PORT || 8082;
const PROTO_FILE = '../proto/account.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;


export const accountClient = new grpcObject.accountPackage.AccountService (
    `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
)

export function startAccountClient() {
    accountClient.waitForReady(Infinity, (err) => {
        if (err){
            console.error(err);
            return;
        }
        onClientReady()
    }) 
}



function onClientReady() {
    console.log('Account Client ready');
}