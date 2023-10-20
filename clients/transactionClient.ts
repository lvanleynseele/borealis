const path = require("path");
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/transaction";

const PORT = 8084; //process.env.PORT || 8084;
const PROTO_FILE = '../proto/transaction.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;


export const transactionClient = new grpcObject.transactionPackage.TransactionService (
    `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
)


export function startTransactionClient() {
    transactionClient.waitForReady(Infinity, (err) => {
        if (err){
            console.error(err);
            return;
        }
        onClientReady()
    }) 
}

function onClientReady() {
    console.log('Transaction Client ready');
}