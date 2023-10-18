"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClient = exports.startUserClient = exports.userClient = void 0;
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PORT = 8082; //process.env.PORT || 8082;
const PROTO_FILE = '../proto/user.proto';
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef);
exports.userClient = new grpcObject.userPackage.UserService(`0.0.0.0:${PORT}`, grpc.credentials.createInsecure());
function startUserClient() {
    exports.userClient.waitForReady(Infinity, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        onClientReady();
    });
}
exports.startUserClient = startUserClient;
function onClientReady() {
    console.log('User Client ready');
}
class UserClient {
    constructor() {
        this.client = new grpcObject.userPackage.UserService(`0.0.0.0:${PORT}`, grpc.credentials.createInsecure());
        this.startUserClient();
    }
    startUserClient() {
        this.client.waitForReady(Infinity, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            this.onClientReady();
        });
    }
    onClientReady() {
        console.log('User Client ready');
    }
    async AddUser(user) {
        this.client.AddUser({ user: user }, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(res);
        });
    }
    async GetUser(id) {
        console.log("Getting user with id: " + id);
        let user = undefined;
        let response = await this.client.GetUser({ id: id }, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            user = res.user;
        });
        response.on('data', (packet) => {
            user = packet.user;
        });
        if (user == undefined) {
            return {
                id: "",
                name: "",
                email: "",
                accountIds: []
            };
        }
        else {
            return user;
        }
    }
    async GetAllUsers() {
        let allUsers = [];
        let response = await this.client.GetAllUsers({}, (err, res) => {
            console.log("users" + res.users);
            if (err) {
                console.error(err);
                return;
            }
            res.users.forEach((user) => {
                allUsers.push(user);
            });
            return allUsers;
        });
        response.on('end', () => {
            return allUsers;
        });
        return allUsers;
    }
}
exports.UserClient = UserClient;
//# sourceMappingURL=userClient.js.map