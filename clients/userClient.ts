import path = require("path");
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/user";
import { User } from "../proto/userPackage/User";
import { UserServiceClient } from "../proto/userPackage/UserService";
import { get } from "http";

const PORT = 8082; //process.env.PORT || 8082;
const PROTO_FILE = '../proto/user.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;

export const userClient =  new grpcObject.userPackage.UserService (
    `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
);

export function startUserClient() {
    userClient.waitForReady(Infinity, (err) => {
        if (err){
            console.error(err);
            return;
        }
        onClientReady()
    }) 
}

function onClientReady() {
    console.log('User Client ready');
}



export class UserClient {
    public userClient: UserServiceClient =  new grpcObject.userPackage.UserService (
        `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
    );

    constructor() {
        this.startUserClient();
    }

    private startUserClient() {
        this.userClient.waitForReady(Infinity, (err) => {
            if (err){
                console.error(err);
                return;
            }
            this.onClientReady()
        }) 
    }

    private onClientReady() {
        console.log('User Client ready');
    }

    public async  AddUser(user: User) {
        this.userClient.AddUser({user: user}, (err: any, res: any) =>{
            if (err) {
                console.error(err);
                return;
            }
            console.log(res);
        })
    }

    public async GetUser(id: string) {
        console.log("Getting user with id: " + id);
        this.userClient.GetUser({id: id}, (err: any, res: any) =>{
            if (err) {
                console.error(err);
                return;
            }
            return res.user;
        })
    }
    
    public async GetAllUsers() {
        let allUsers: User[] = [];
        this.userClient.GetAllUsers({}, (err: any, res: any) =>{
            console.log("users" + res.users);
            
            if (err) {
                console.error(err);
                return;
            }
            res.users.forEach((user: User) => {
                allUsers.push(user);
            })
            return allUsers;
        })
    }

     

}













// function onClientReady() {
//     let expUser = {id:  "1234567890", name: "Liam", email: "lvanl@abc.com"} //take in from cli in future

    // userClient.AddUser({user: expUser}, (err, res) =>{
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     //console.log(res);

    // })
// 
//     const stream = userClient.AddMultipleUsers((err, res) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         //console.log(res);
//     })

//     stream.write({users: {id: "1827485940", name: "Marvin", email: "marvin@abc.com"}})
//     stream.write({users: {id: "2327485940", name: "Moira", email: "moira@abc.com"}})
//     stream.write({users: {id: "8390485940", name: "Sid", email: "sid@abc.com"}})

//     stream.end();


    // const getAllUsersStream = userClient.GetAllUsers({})
    // getAllUsersStream.on("data", (packet) => {
    //     console.log(packet);
    // })
    // getAllUsersStream.on("end", () => {
        
    // })

// }
