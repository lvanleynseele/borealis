"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import path from 'path';
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const port = 8082; //process.env.PORT || 8082;
const PROTO_FILE = './proto/user.proto';
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.userPackage;
function main() {
    const server = getServer();
    server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server started on port ${port}`);
        server.start();
    });
}
function getServer() {
    const server = new grpc.Server();
    server.addService(userPackage.UserService.service, {
        AddUser: (req, res) => {
            console.log(req, res);
        }
    });
    return server;
}
//# sourceMappingURL=server.js.map