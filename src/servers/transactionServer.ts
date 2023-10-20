// import path from "path";
const path = require("path");
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {ProtoGrpcType} from "../../proto/transaction";
import { TransactionServiceHandlers } from '../../proto/transactionPackage/TransactionService'
import { transactionService } from "../transaction/transactionService";

const PORT = 8084;
const PROTO_FILE = '../../proto/transaction.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
const transactionPackage = grpcObject.transactionPackage;


export function startTransactionServer() {
    const server = getServer()
    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(`Server started on port ${PORT}`);
        server.start();
    })
}

function getServer() {
    const server = new grpc.Server();

    server.addService(transactionPackage.TransactionService.service, {
        TransactionRequest : async  (req,res) => {
            transactionService.transactionRequest(req.request.senderId!, req.request.receiverId!,req.request.amount!)
            .then((result: any) => {
                res(null, null)
            }).catch((err: any) => { 
                res(err, null);
            });
        },
    } as TransactionServiceHandlers)

    return server;
}