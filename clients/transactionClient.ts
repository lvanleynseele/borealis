const path = require("path");
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/user"

const PORT = 8084; //process.env.PORT || 8084;
const PROTO_FILE = './proto/transaction.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;


export const transactionClient = new grpcObject.transactionPackage.TransactionService (
    `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
)



const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);

transactionClient.waitForReady(deadline, (err) => {
    if (err){
        console.error(err);
        return;
    }
    onClientReady()
}) 

function onClientReady() {
    
    transactionClient.TransactionRequest({senderId: "28912384050", receiverId: "28912384051", amount: Math.random()*100000}, 
    (err, res) =>{ 
        if (err) {
            console.error(err);
            return;
        }
        console.log(res);
    })
    
}