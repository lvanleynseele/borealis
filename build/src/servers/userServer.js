"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startUserServer = exports.userServer = void 0;
// import path from 'path';
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const userService_1 = require("../user/userService");
const accountService_1 = require("../account/accountService");
const PORT = 8082; //process.env.PORT || 8082;
const PROTO_FILE = '../../proto/user.proto';
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.userPackage;
exports.userServer = getServer();
async function startUserServer() {
    const server = await getServer();
    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`User Server started on port ${PORT}`);
        server.start();
    });
}
exports.startUserServer = startUserServer;
async function getServer() {
    const server = new grpc.Server();
    server.addService(userPackage.UserService.service, {
        AddUser: async (req, res) => {
            userService_1.userService.addUser(req.request.user).then((result) => {
                res(null, { user: req.request.user });
            }).catch((err) => {
                res(err, null);
            });
        },
        AddMultipleUsers: async (call, callback) => {
            const users = [];
            call.on("data", (packet) => {
                userService_1.userService.addUser(packet.user).then((result) => {
                    users.push(result.user);
                    call.on("end", () => {
                        callback(null, { users: users });
                    });
                }).catch((err) => {
                    call.on("error", () => {
                        callback(err, null);
                    });
                });
            });
        },
        AddAccount: async (req, res) => {
            accountService_1.accountService.addAccount(req.request.account).then((result) => {
                userService_1.userService.addAccount(req.request.userId, req.request.account).then((result) => {
                    res(null, { userId: req.request.userId, account: req.request.account });
                }).catch((err) => {
                    res(err, null);
                });
            }).catch((err) => {
                res(err, null);
            });
        },
        GetUser: async (req, res) => {
            userService_1.userService.getUser(req.request.id).then((user) => {
                res(null, { user: user });
            }).catch((err) => {
                console.log(err);
                res(err, null);
            });
        },
        GetAllUsers: async (req, res) => {
            // await userService.getAllUsers().then((result: any) => {
            //     let users: User[] = result;
            //     res(null, {users: users})
            // }).catch((err: any) => {
            //     console.log(err);
            //     res(err, null)
            // })
            try {
                let users = await userService_1.userService.getAllUsers();
                res(null, { users: users });
            }
            catch (error) {
                console.log(error);
                res(error, null);
            }
        },
        DeleteUser: async (req, res) => {
            userService_1.userService.deleteUser(req.request.id).then((result) => {
                res(null, null);
            }).catch((err) => {
                console.log(err);
                res(err, null);
            });
        },
        DeleteAccount: async (req, res) => {
            userService_1.userService.deleteAccount(req.request.userId, req.request.accountId).then((result) => {
                res(null, null);
            }).catch((err) => {
                console.log(err);
                res(err, null);
            });
        }
    });
    return server;
}
//# sourceMappingURL=userServer.js.map