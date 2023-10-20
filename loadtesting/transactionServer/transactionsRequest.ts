const path = require("path");
import { faker } from '@faker-js/faker';
import {v4 as uuid} from 'uuid';
import { Account } from '../../proto/accountPackage/Account';
import { accountClient } from '../../clients/accountClient';
import { expose } from "threads";
import { TransactionRequest } from '../../proto/transactionPackage/TransactionRequest';
import { transactionClient } from '../../clients/transactionClient';

let allAccounts: Account[] = [];

function createRandomTransaction(): TransactionRequest {

    let fromAccount = allAccounts[Math.floor(Math.random() * allAccounts.length)];
    let toAccount = allAccounts[Math.floor(Math.random() * allAccounts.length)];

    let amount = Math.floor(Math.random() * 100);

    return {
        senderId: fromAccount.id!,
        receiverId: toAccount.id!,
        amount: amount
    }

}

async function loadllAccounts() {

    allAccounts = await new Promise((resolve, reject) => {
        let accounts: Account[] = [];
        let accountsStream = accountClient.getAllAccounts({});
        accountsStream.on('data', (account: Account) => {
            accounts.push(account);
        });
        
        accountsStream.on('end', () => {
            resolve(accounts);
        });

        accountsStream.on('error', (err: any) => {
            reject(err);
        });
    });
}


async function runTransactions(numRequests: number, worker: number) {
    await loadllAccounts();

    let runtimes: number[] = [];
    let errors = 0;

    console.log("Worker " + worker + " Running " + numRequests + " requests");

    for(let i = 0; i < numRequests; i++) {
        let transaction = createRandomTransaction();
        
        let startTime = process.hrtime();
        
        await TransactionRequest(transaction).catch((err) => {
            console.log(err);
            errors++;
        });

        let endTime = process.hrtime(startTime);
        let runtime = endTime[0] * 1000 + endTime[1] / 1000000;
        runtimes.push(runtime);
    }

}

async function TransactionRequest(transaction: TransactionRequest) {
    await new Promise((resolve, reject) => {
        transactionClient.TransactionRequest(transaction, (err: any, res: any) => {
            if (err){
                reject(err);
            }
            resolve(res);
        });
    });
}


expose(runTransactions);