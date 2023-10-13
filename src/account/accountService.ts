const path = require('path');
import { auroraClient } from '../servers/auroraServer';
import { Account } from "../../proto/accountPackage/Account";
import { TransferResponse } from '../../proto/accountPackage/TransferResponse';

class AccountService {

    constructor() {
    }

    public async addAccount(account: Account): Promise<Account> {
        return await auroraClient.query(`INSERT INTO accounts_1 VALUES ('${account.id}', '${account.name}', ${account.balance})`).rows[0];
    }

    public async getAccount(id: string): Promise<Account|Error|null> {
        return await auroraClient.query(`SELECT * FROM accounts_1 WHERE id = ${id}`).rows[0];       
    }

    public async getAllAccounts()  {
        return await auroraClient.query('SELECT * FROM accounts_1').rows;
    }

    public async updateAccount(account: Account): Promise<Account> {
        let updatedAccount = await auroraClient.query(`UPDATE accounts_1 SET name = '${account.name}', balance = ${account.balance} WHERE id = ${account.id}`).rows[0];
        return{
            id: updatedAccount.id,
            name: updatedAccount.name,
            balance: updatedAccount.balance,
        } 
    }

    public async deleteAccount(id: string) {
        await auroraClient.query(`DELETE FROM accounts_1 WHERE id = ${id}`);
    }

    public async debitRequest(id: string, amount: number): Promise<TransferResponse> {
        return {
            newBalance: await auroraClient.query(`UPDATE accounts_1 SET balance = balance - ${amount} WHERE id = ${id}`).rows[0].balance,
        }
     }

    public async creditRequest(id: string, amount: number): Promise<TransferResponse> {
       return {
        newBalance: await auroraClient.query(`UPDATE accounts_1 SET balance = balance + ${amount} WHERE id = ${id}`).rows[0].balance,
       }
       
    }

}

export const accountService = new AccountService();