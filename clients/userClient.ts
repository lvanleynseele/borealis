import path = require("path");
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/user";
import { User } from "../proto/userPackage/User";

const PORT = 8082; //process.env.PORT || 8082;
const PROTO_FILE = '../proto/user.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;


const userClient = new grpcObject.userPackage.UserService (
    `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
)

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);


export function startUserClient() {
    userClient.waitForReady(deadline, (err) => {
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

export {userClient};

export function AddUser(user: User) {
    userClient.AddUser({user: user}, (err: any, res: any) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log(res);
    })
}

export function GetUser(id: string) {
    userClient.GetUser({id: id}, (err: any, res: any) =>{
        if (err) {
            console.error(err);
            return;
        }
        return res.user;
    })
}

export function GetAllUsers() {
    const allUsers: User[] = [];
    const getAllUsersStream = userClient.GetAllUsers({});
    getAllUsersStream.on("data", (packet:any) => {
        let user: User = {
            id: packet.id ? packet.id   : "",
            name: packet.name ? packet.name : "",
            email: packet.email ? packet.email : "",
            accountIds: packet.accountIds ? packet.accountIds : []
        }

        allUsers.push(user);
    })
    getAllUsersStream.on("end", () => {
        console.log("All users received: "+ allUsers.length);
        return allUsers;
    })
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
