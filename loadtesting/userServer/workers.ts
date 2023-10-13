// import { Worker, isMainThread } from 'worker_threads';
// import { userClient } from '../../clients/userClient';

// const numWorkers = 4; // Change this to the number of worker processes you want to create
// const numRequestsPerWorker = 1000; // Change this to the number of requests each worker should make
// const duration = 10; // Change this to the number of seconds you want the test to run

// export function loadTest(file: string) {
//     if (isMainThread) {
        
//         // Create an array of worker threads
//         const workers = new Array(numWorkers);
//         for (let i = 0; i < numWorkers; i++) {
//             workers[i] = new Worker(file);
//         }
    
//         // Listen for messages from the worker threads
//         let numResponses = 0;
//         workers.forEach((worker) => {
//             worker.on('message', (message) => {
//                 if (message === 'done') {
//                     numResponses++;
//                     if (numResponses === numWorkers) {
//                         console.log('All workers finished');
//                     }
//                 }
//             });
//         });
    
//         // Send messages to the worker threads to start load testing
//         workers.forEach((worker) => {
//             worker.postMessage(numRequestsPerWorker);
//         });
//     } else {
//         // This code will be executed by each worker thread
    
//         // Listen for messages from the main thread
//         process.on('message', (numRequests) => {
//             // Make the specified number of requests
//             for (let i = 0; i < numRequests; i++) {
//                 client.addAccount({ username: 'testuser', password: 'testpassword' }, (err, response) => {
//                     if (err) {
//                         console.error(err);
//                     } else {
//                         console.log(response);
//                     }
//                 });
//             }
    
//             // Send a message back to the main thread when finished
//             process.send('done');
//         });
//     }
// }


