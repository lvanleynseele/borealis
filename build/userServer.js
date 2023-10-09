"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServer = void 0;
// import path from 'path';
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PORT = 8082; //process.env.PORT || 8082;
const PROTO_FILE = './proto/user.proto';
let users = [];
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.userPackage;
exports.userServer = getServer();
function main() {
    exports.userServer.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server started on port ${PORT}`);
        exports.userServer.start();
    });
}
function getServer() {
    const server = new grpc.Server();
    server.addService(userPackage.UserService.service, {
        AddUser: (req, res) => {
            console.log(req.request);
            users.push(req.request.user);
            res(null, { user: req.request.user });
        },
        AddMultipleUsers: (call, callback) => {
            let count = 0;
            call.on("data", (packet) => {
                users.push(packet.users);
                count++;
                console.log(packet);
            });
            console.log(`${count} users added`);
            call.on("end", () => {
                callback(null, { users: users });
            });
        },
        GetUser: (req, res) => {
            console.log(req.request);
            let userFound = users.find(u => u.id == req.request.id);
            if (userFound) {
                console.log(`user found ${userFound}`);
                res(null, { user: userFound });
            }
            else {
                res(null, null);
            }
        },
        GetAllUsers: (call) => {
            users.forEach(u => {
                call.write({ users: u });
            });
            call.end();
        },
        DeleteUser: (req, res) => {
            console.log(req, res);
            users = users.filter(u => u.id != req.request.id);
            console.log(`user with id ${req.request.id} deleted`);
            res(null, null);
        }
    });
    return server;
}
main();
//# sourceMappingURL=userServer.js.map