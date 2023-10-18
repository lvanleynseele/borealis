const path = require("path");
import { userClient } from '../../clients/userClient';
import { expose } from "threads"
import { User } from '../../proto/userPackage/User';




let allUsers: User[] = [];

function getRandomUser() {
    if(allUsers.length > 0) {
        let randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
        return randomUser.id!;
    }
    return 'a819c3db-d71a-47a0-b5d6-013abc89d861';
}

async function loadAllUsers() {
    allUsers = await new Promise((resolve, reject) => {
        userClient.GetAllUsers({}, (err: any, res: any) => {
            if (err) {
                console.error(err);
                reject(err);
            }
    
            resolve(res.users);
        })
    });
}

async function runGetUsers(numRequests: number, worker: number ){
    await loadAllUsers();
    
    let runtimes: number[] = [];
    let errors = 0;

    console.log("Worker " + worker + " Running " + numRequests + " requests");

    for(let i = 0; i < numRequests; i++) {
        let startTime = process.hrtime();
        let user = await getUser(getRandomUser()).catch((err) => {
            console.log(err.StatusObject.code);
            errors++;
        });
        let endTime = process.hrtime(startTime);

        runtimes.push(endTime[0] * 1000000 + endTime[1]);
        // console.log(`Execution time: ${endTime[0]}s ${endTime[1] / 1000000}ms`);
    }

    

    console.log("Average runtime: " + runtimes.reduce((a, b) => a + b, 0) / runtimes.length);    
    console.log("Errors: " + errors);

}


async function getUser(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
        userClient.GetUser({id: id}, (err: any, res: any) => {
            if (err){
                // console.error(err);
                reject(err);
            }
            else {
                (resolve(res.user));
            }
        });
    });
}

expose(runGetUsers);



