const path = require("path");
import { User } from '../../proto/userPackage/User'
import { faker } from '@faker-js/faker';
import {v4 as uuid} from 'uuid';
import * as grpc from "@grpc/grpc-js";
import { ProtoGrpcType } from "../../proto/user";
const protoLoader = require('@grpc/proto-loader');
const autocannon = require('autocannon');
// const userClient = require('../../clients/userClient');

const PORT = 8082; //process.env.PORT || 8082;
const PROTO_FILE = '../../proto/user.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const userPackage = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
// const client = new userPackage.userPackage.UserService('localhost:8082', grpc.credentials.createInsecure());
const client = new userPackage.userPackage.UserService (
    `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
)

function generateRandomUser(): User {
    let person = faker.person;

    return {
        "id": uuid().toString(),
        "name": person.fullName(),
        "email": faker.internet.email(person.firstName(), person.lastName()),
    }
}


// const instance = autocannon({
//     url: 'grpc://localhost:8082',
//     connections: 10, // number of concurrent connections
//     pipelining: 1, // number of pipelined requests
//     duration: 10, // test duration in seconds
//     setupClient: () => {client},
//     requests: [
//         client.AddUser({user: generateRandomUser()}, (err: any, res: any) =>{
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//             console.log(res);
//         })
//     ]
// }, console.log);

// autocannon.track(instance, {renderProgressBar: true});
