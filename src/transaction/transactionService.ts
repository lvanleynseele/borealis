const path = require('path');
import { Long } from '@grpc/proto-loader';
import { accountService } from '../account/accountService';
import {v4 as uuid} from 'uuid';
import { auroraClient } from '../servers/auroraServer';



export class TransactionService {

    constructor() {
    }


    public async transactionRequest(senderId: string, receiverId: string, amount: Long) {
        if(senderId == receiverId){
            throw new Error(`senderId and receiverId cannot be the same`);
        }
        
        const sender = await accountService.getAccount(senderId);
        
        //transaction should fail if insufficient funds
        if(sender.balance! < amount) {
            throw new Error(`Insufficient funds in account ${senderId}`);
        }

        accountService.debitRequest(senderId, amount).then((result: any) => {
            accountService.creditRequest(receiverId, amount).then((result: any) => {
                let transactionId = uuid().toString();
                auroraClient.query(`INSERT INTO transactions_1 VALUES ('${senderId}', '${receiverId}', ${amount.low}, '${transactionId}')`)
                .then((result: any) => {
                    return;
                })
            }).catch((err: any) => {
                //if debit request fails, place transfer value back in sender account
                accountService.creditRequest(senderId, amount).finally(() => { 
                    throw new Error(`Failed to credit account ${receiverId}`);
                });
                
            })
        })
    }
}

export const transactionService = new TransactionService();