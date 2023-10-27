const path = require("path");
import { User } from '../../proto/userPackage/User'
import { faker } from '@faker-js/faker';
import {v4 as uuid} from 'uuid';
import { Account } from '../../proto/accountPackage/Account';
import { userClient } from '../../clients/userClient';('../../clients/userClient');
import { expose } from "threads";

function generateRandomUser(): User {
    let person = faker.person;

    return {
        "id": uuid().toString(),
        "name": person.fullName(),
        "email": faker.internet.email({firstName: person.firstName(), lastName: person.lastName()}),
        
    }
}

function generateRandomAccount(): Account[] {

    let numAccounts = Math.floor(Math.random() * 5) + 1;
    let accounts: Account[] = [];

    for(let i = 0; i < numAccounts; i++) {
        accounts.push({
            "id": uuid().toString(),
            "name": faker.company.name(),
            "balance": faker.finance.amount(),
        });
    }

    return accounts;
}


async function runAddUsers(NUM_REQUESTS: number, worker: number) {

    let runtimes: number[] = [];
    let errors = 0;

    console.log("Worker " + worker + " Running " + NUM_REQUESTS + " requests");

    for(let i = 0; i < NUM_REQUESTS; i++) {
        let user = generateRandomUser();
        let accounts = generateRandomAccount();
        
        let startTime = process.hrtime();
        
        await addUser(user).catch((err) => {
            console.log(err);
            errors++;
        });


        await addAccounts(accounts, user.id!).catch((err) => {
            console.log(err);
            errors++;
        });


        let endTime = process.hrtime(startTime);

        runtimes.push(endTime[0] * 1000000 + endTime[1]);
    }

    console.log("Average runtime: " + runtimes.reduce((a, b) => a + b, 0) / runtimes.length);    
    console.log("Errors: " + errors);
}


async function addUser(user: User) {
    return new Promise((resolve, reject) => {
        userClient.AddUser({user: user}, (err: any, res: any) => {
            if (err){
                reject(err);
            }
            resolve(res.user);
        })
    });
    
}

async function addAccounts(accounts: Account[], userId: string) {
    accounts.forEach((account) => {
        new Promise((resolve, reject) => {
            userClient.AddAccount({userId: userId, account: account}, (err: any, res: any) => {
                if (err){
                    // console.error(err);
                    reject(err);
                }
                resolve(res.account);
            });

        });
    });
}

expose(runAddUsers);