import { spawn, Thread, Worker } from "threads"
import { User } from '../../proto/userPackage/User';
import { userClient } from "../../clients/userClient";
const path = require("path");


const NUM_REQUESTS = 1000;
const NUM_WORKERS = 5;



async function getUserLoadTest() {
    
    
    let workers: Thread[] = [];

    for(let i = 0; i < NUM_WORKERS; i++) {
        console.log("Starting worker " + i);
        
        let worker = await spawn(new Worker("./getUser.ts"))
        const runGetUsers = await spawn(new Worker("./getUser.ts"))
        const results = await runGetUsers(NUM_REQUESTS/NUM_WORKERS, i);

        workers.push(worker);
    }

    workers.forEach((worker) => {
        Thread.terminate(worker);
    })


}
getUserLoadTest();










