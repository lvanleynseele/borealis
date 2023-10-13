const path = require("path");
import { User } from '../../proto/userPackage/User'
const userClient = require('../../clients/userClient');

// let allUsers: User[] = [];

// function getRandomUser() {
//     let randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
//     return randomUser.id;
// }


async function getUserLoadTest() {

    // allUsers = await userClient.GetAllUsers();


    const startTime = process.hrtime();

    const callTimes: number[] = [];
    for(let i = 0; i < 50; i++){
        let id = 'a819c3db-d71a-47a0-b5d6-013abc89d861';
        const callStartTime = process.hrtime();
        
        userClient.GetUser({id: id});

        const callEndTime = process.hrtime(callStartTime);
        callTimes.push(callEndTime[0] + callEndTime[1]);
    }
    const endTime = process.hrtime(startTime);
    console.log(`Execution time: ${endTime[0]}s ${endTime[1] / 1000000}ms`);
    let avgCallTime = callTimes.reduce((a, b) => a + b) / callTimes.length;
    console.log(`Average call time: ${avgCallTime / 1000000}ms`);

}

getUserLoadTest();

