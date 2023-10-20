// import path from 'path';
const path = require("path");
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../../proto/user"
import { UserServiceHandlers } from '../../proto/userPackage/UserService'
import { User } from "../../proto/userPackage/User";
import { userService } from "../user/userService";
import { accountService } from "../account/accountService";


const PORT = 8082; //process.env.PORT || 8082;
const PROTO_FILE = '../../proto/user.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
const userPackage = grpcObject.userPackage;

export const userServer = getServer()


export async function startUserServer() {
    const server = await getServer();
    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(),
    (err: any, port: any ) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(`User Server started on port ${PORT}`);
        server.start();
    })
}

async function getServer() {
    const server = new grpc.Server();
    server.addService(userPackage.UserService.service, {
        AddUser : async (req, res) => {
            userService.addUser(req.request.user!).then((result: any) => {
                res(null, { user: req.request.user})
            }).catch((err: any) => { 
                res(err, null)
            });
        },
        AddMultipleUsers : async (call, callback) => {
            const users: User[] = []

            call.on("data", (packet) => {
                userService.addUser(packet.user).then((result: any) => {
                    users.push(result.user);
                    call.on("end", () => {
                        callback(null, {users: users})
                    })
                }).catch((err: any) => {
                    call.on("error", () => {
                        callback(err, null)
                    })
                })
            })    
        },
        AddAccount : async (req, res) => { 
            accountService.addAccount(req.request.account!).then((result: any) => {
                userService.addAccount(req.request.userId!, req.request.account!).then((result: any) => {
                    res(null, { userId: req.request.userId, account: req.request.account})
                }).catch((err: any) => {
                    res(err, null)
                })
            }).catch((err: any) => {
                res(err, null)
            });
        },
        GetUser : async (req, res) => {
            userService.getUser(req.request.id!).then((user: any) => {
                res(null, {user: user})
            }).catch((err: any) => {
                console.log(err)
                res(err, null)
            })
        },
        GetAllUsers : async (req, res) => {
            // await userService.getAllUsers().then((result: any) => {
            //     let users: User[] = result;
            //     res(null, {users: users})
            // }).catch((err: any) => {
            //     console.log(err);
            //     res(err, null)
            // })
            try {
                let users: User[] = await userService.getAllUsers();
                res(null, {users: users})                
            } catch (error) {
                console.log(error);
                res(error as grpc.StatusObject, null)
            }

        },
        DeleteUser : async (req, res) => {
            userService.deleteUser(req.request.id!).then((result: any) => {
                res(null, null)
            }).catch((err: any) => {
                console.log(err)
                res(err, null)
            })
        },
        DeleteAccount : async (req, res) => {
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