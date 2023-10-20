import { spawn, Thread, Worker } from "threads"

const NUM_REQUESTS = 10;
const NUM_WORKERS = 2;



async function getUserLoadTest() {
    
    
    let workers: Thread[] = [];

    for(let i = 0; i < NUM_WORKERS; i++) {
        console.log("Starting worker " + i);
        
        let worker = await spawn(new Worker("./getUser.ts"))
        const results = await worker(NUM_REQUESTS/NUM_WORKERS, i);

        workers.push(worker);
    }

    workers.forEach((worker) => {
        Thread.terminate(worker);
    })


}

async function addUserLoadTest() {

    let workers: Thread[] = [];

    for(let i = 0; i < NUM_WORKERS; i++) {
        console.log("Starting worker " + i);
        
        let worker = await spawn(new Worker("./addUser.ts"))
        const results = await worker(NUM_REQUESTS/NUM_WORKERS, i);

        workers.push(worker);
    }

    workers.forEach((worker) => {
        Thread.terminate(worker);
    })


}


addUserLoadTest();


// getUserLoadTest();










