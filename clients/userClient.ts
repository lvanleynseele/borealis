import path = require("path");
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/user"
import { AddMultipleUsersResponse } from "../proto/userPackage/AddMultipleUsersResponse";

const PORT = 8082; //process.env.PORT || 8082;
const PROTO_FILE = './proto/user.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;


export const userClient = new grpcObject.userPackage.UserService (
    `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
)

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);

userClient.waitForReady(deadline, (err) => {
    if (err){
        console.error(err);
        return;
    }
    onClientReady()
}) 

function onClientReady() {
    let expUser = {id:  "1234567890", name: "Liam", email: "lvanl@abc.com"} //take in from cli in future

    userClient.AddUser({user: expUser}, (err, res) =>{
        if (err) {
            console.error(err);
            return;
        }
        //console.log(res);

    })

    const stream = userClient.AddMultipleUsers((err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        //console.log(res);
    })

    stream.write({users: {id: "1827485940", name: "Marvin", email: "marvin@abc.com"}})
    stream.write({users: {id: "2327485940", name: "Moira", email: "moira@abc.com"}})
    stream.write({users: {id: "8390485940", name: "Sid", email: "sid@abc.com"}})

    stream.end();


    const getAllUsersStream = userClient.GetAllUsers({})
    getAllUsersStream.on("data", (packet) => {
        console.log(packet);
    })
    getAllUsersStream.on("end", () => {
        
    })

}
