// import path from 'path';
const path = require("path");
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../../proto/user"
import { UserServiceHandlers } from '../../proto/userPackage/UserService'
import { User } from "../../proto/userPackage/User";
import { userService } from "../user/userService";


const PORT = 8082; //process.env.PORT || 8082;
const PROTO_FILE = '../../proto/user.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
const userPackage = grpcObject.userPackage;

export const userServer = getServer()


export function startUserServer() {
    
    userServer.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(`Server started on port ${PORT}`);
        userServer.start();
    })
}

function getServer() {
    const server = new grpc.Server();
    server.addService(userPackage.UserService.service, {
        AddUser : (req, res) => {
            console.log(req.request)
            userService.addUser(req.request.user!).then((result: any) => {
                res(null, { user: req.request.user})
            }).catch((err: any) => { 
                res(err, null)
            });
        },
        AddMultipleUsers : (call, callback) => {
            const users: User[] = []

            call.on("data", (packet) => {
                userService.addUser(packet.user).then((result: any) => {
                    users.push(packet.user);
                    call.on("end", () => {
                        callback(null, {users: users})
                    })
                }).catch((err: any) => {
                    call.on("end", () => {
                        callback(err, null)
                    })
                })
            })    
        },
        AddAccount : (req, res) => { 
            userService.addAccountToUser(req.request.userId!, req.request.account!).then((result: any) => {
                res(null, { userId: req.request.userId, account: req.request.account})
            }).catch((err: any) => {
                res(err, null)
            })
        },
        GetUser : (req, res) => {
            console.log(req.request);

            userService.getUser(req.request.id!).then((user: any) => {
                res(null, {user: user})
            }).catch((err: any) => {
                console.log(err)
                res(null, null)
            })
        },
        GetAllUsers : (call) => {
            let allUsers =  userService.getAllUsers().then((result: any) => {
                let users: User[] = result;

                users.forEach(u => {call.write({users: u})});
                call.end();
            }).catch((err: any) => {
                console.log(err);
                call.write(err);
                call.end();
            })  
        },
        // UpdateUser : (req, res) => {
        //     userService.updateUser(req.request.user).then((result: any) => {
        //         res(null, {user: req.request.user})
        //     }).catch((err: any) => {
        //         console.log(err)
        //         res(err, null)
        //     })
        // },
        DeleteUser : (req, res) => {
            userService.deleteUser(req.request.id!).then((result: any) => {
                res(null, null)
            }).catch((err: any) => {
                console.log(err)
                res(err, null)
            })
        },
        DeleteAccount : (req, res) => {
            userService.deleteAccount(req.request.userId!, req.request.accountId!).then((result: any) => {
                res(null, null)
            }).catch((err: any) => {
                console.log(err)
                res(err, null)
            })

        }
    } as UserServiceHandlers)
    return server;
}