import path = require("path");
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/user";
import { User } from "../proto/userPackage/User";
import { UserServiceClient } from "../proto/userPackage/UserService";
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
    public client: UserServiceClient =  new grpcObject.userPackage.UserService (
        `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
    );

    constructor() {
        this.startUserClient();
    }

    private startUserClient() {
        this.client.waitForReady(Infinity, (err) => {
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
        this.client.AddUser({user: user}, (err: any, res: any) =>{
            if (err) {
                console.error(err);
                return;
            }
            console.log(res);
        })
    }

    public async GetUser(id: string): Promise<User> {
        console.log("Getting user with id: " + id);
        let user: User|undefined = undefined;
        let response = await this.client.GetUser({id: id}, (err: any, res: any) =>{
            if (err) {
                console.error(err);
                return;
            }
            user = res.user;
        })

        response.on('data', (packet: any) => {
            user = packet.user;
        })
        
        if(user == undefined){
            return {
                id: "",
                name: "",
                email: "",
                accountIds: []
            }
        }
        else {
            return user;
        }
    }
    
    public async GetAllUsers() {
        let allUsers: User[] = [];
        let call = await this.client.GetAllUsers({}, (err: any, res: any) =>{
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

        let response = await call.on('metadata', (metadata: any) => {
                console.log(metadata);
                let temp = metadata.get('users');
            })


        return allUsers;
    }
}