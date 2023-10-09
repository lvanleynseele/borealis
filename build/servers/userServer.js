"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startUserServer = exports.userServer = void 0;
// import path from 'path';
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { userService } = require('../src/user/userService');
const PORT = 8082; //process.env.PORT || 8082;
const PROTO_FILE = '../proto/user.proto';
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.userPackage;
exports.userServer = getServer();
function startUserServer() {
    exports.userServer.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server started on port ${PORT}`);
        exports.userServer.start();
    });
}
exports.startUserServer = startUserServer;
function getServer() {
    const server = new grpc.Server();
    server.addService(userPackage.UserService.service, {
        AddUser: (req, res) => {
            console.log(req.request);
            userService.addUser(req.request.user).then((result) => {
                res(null, { user: req.request.user });
            }).catch((err) => {
                res(err, null);
            });
        },
        AddMultipleUsers: (call, callback) => {
            const users = [];
            call.on("data", (packet) => {
                userService.addUser(packet.user).then((result) => {
                    users.push(packet.user);
                    call.on("end", () => {
                        callback(null, { users: users });
                    });
                }).catch((err) => {
                    call.on("end", () => {
                        callback(err, null);
                    });
                });
            });
        },
        AddAccount: (req, res) => {
            userService.addAccountToUser(req.request.userId, req.request.account).then((result) => {
                res(null, { userId: req.request.userId, account: req.request.account });
            }).catch((err) => {
                res(err, null);
            });
        },
        GetUser: (req, res) => {
            console.log(req.request);
            userService.getUser(req.request.id).then((user) => {
                res(null, { user: user });
            }).catch((err) => {
                console.log(err);
                res(null, null);
            });
        },
        GetAllUsers: (call) => {
            let allUsers = userService.getAllUsers().then((users) => {
                users.forEach(u => { call.write({ users: u }); });
                call.end();
            }).catch((err) => {
                console.log(err);
                call.write(err);
                call.end();
            });
        },
        // UpdateUser : (req, res) => {
        //     userService.updateUser(req.request.user).then((result: any) => {
        //         res(null, {user: req.request.user})
        //     }).catch((err: any) => {
        //         console.log(err)
        //         res(err, null)
        //     })
        // },
        DeleteUser: (req, res) => {
            userService.deleteUser(req.request.id).then((result) => {
                res(null, null);
            }).catch((err) => {
                console.log(err);
                res(err, null);
            });
        },
        DeleteAccount: (req, res) => {
            userService.deleteAccount(req.request.userId, req.request.accountId).then((result) => {
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