const path = require("path");
import { User } from '../../proto/userPackage/User'
import { userClient } from '../../clients/userClient';
import { get } from 'http';


let allUsers: User[] = [];

function getRandomUser() {
    if(allUsers.length > 0) {
        let randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
        return randomUser.id;
    }
    return 'a819c3db-d71a-47a0-b5d6-013abc89d861';
}


async function getUserLoadTest() {


    userClient.GetAllUsers({}, (err: any, res: any) => {
        if (err) {
            console.error(err);
        }
        res.users.forEach((user: User) => {
            allUsers.push(user);
        })

        const startTime = process.hrtime();

        const callTimes: number[] = [];
        for(let i = 0; i < 50; i++){
            let id = getRandomUser();
            const callStartTime = process.hrtime();
            
            userClient.GetUser({id: id}, (err: any, res: any) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // console.log(res.user);   
                
            });

            const callEndTime = process.hrtime(callStartTime);
            callTimes.push(callEndTime[0] + callEndTime[1]);
        }
        const endTime = process.hrtime(startTime);
        console.log(`Execution time: ${endTime[0]}s ${endTime[1] / 1000000}ms`);
        let avgCallTime = callTimes.reduce((a, b) => a + b) / callTimes.length;
        console.log(`Average call time: ${avgCallTime / 1000000}ms`);   
    })
     
}

getUserLoadTest();

