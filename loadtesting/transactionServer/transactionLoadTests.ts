import { spawn, Thread, Worker } from "threads"
import { loadTestingStats } from "../loadTestingInterfaces";

const NUM_REQUESTS = 1000;
const NUM_WORKERS = 5;

function runTransactionLoadTest() {
    
    return new Promise((resolve, reject) => {

        let stats: loadTestingStats[] = [];

        for(let i = 0; i < NUM_WORKERS; i++) {
            console.log("Starting worker " + i);
            runWorker("./transactionsRequest.ts", NUM_REQUESTS/NUM_WORKERS, i).then((results: any) => {
                console.log(results);
                stats.push(results);
            }).catch((err: any) => {
                console.log(err.message);
                // reject(err);
            })
        }

        resolve(stats);
    });

}

async function runWorker(filename: string, numRequests: number, workerId: number) {
    const worker = await spawn(new Worker(filename));
    const results = await worker(numRequests, workerId);

    Thread.terminate(worker);
    return results;
}

runTransactionLoadTest();