const path = require('path');
import { auroraClient } from '../../servers/auroraServer';
import { Account } from "../../proto/accountPackage/Account";
import { TransferResponse } from '../../proto/accountPackage/TransferResponse';

class AccountService {

    constructor() {
    }

    public async addAccount(account: Account): Promise<Account|Error|null> {
        auroraClient.query(`INSERT INTO accounts_1 VALUES ('${account.id}', '${account.name}', ${account.balance})`)
        .then((result: any) => { 
            return result.rows[0];
        }).catch((err: any) => {
            console.log('Error: ' + err);
            return err;
        })
        return null;
    }

    public async getAccount(id: string): Promise<Account|Error|null> {
        auroraClient.query(`SELECT * FROM accounts_1 WHERE id = ${id}`).then((result: any) => {
            return result.rows[0];
        }).catch((err: any) => {
            console.log(err);
            return err;
        })

        return null;
    }

    public async getAllAccounts(): Promise<Account[]|Error|null>  {
        auroraClient.query('SELECT * FROM accounts_1').then((result: any) => {
            return result.rows;
        })
        .catch((err: any) => {
            console.log(err);
            return err;
        })

        return null;
    }

    public async updateAccount(account: Account): Promise<Account|Error|null> {
        auroraClient.query(`UPDATE accounts_1 SET name = '${account.name}', balance = ${account.balance} WHERE id = ${account.id}`)
        .then((result: any) => {
            return result.rows[0];
        })
        .catch((err: any) => {
            console.log(err);
            return err;
        });

        return null;
    }

    public async deleteAccount(id: string) {
        auroraClient.query(`DELETE FROM accounts_1 WHERE id = ${id}`)
        .then((result: any) => {
            return true;
        })
        .catch((err: any) => {
            console.log(err);
            return false;
        });

        return false;
    }

    public async debitRequest(id: string, amount: number): Promise<TransferResponse|Error|null> {
        auroraClient.query(`UPDATE accounts_1 SET balance = balance - ${amount} WHERE id = ${id}`)
        .then((result: any) => {
            return result.rows[0].balance;
        })
        .catch((err: any) => {
            console.log(err);
            return err;
        });

        return null;
    }

    public async creditRequest(id: string, amount: number): Promise<TransferResponse|Error|null> {
        auroraClient.query(`UPDATE accounts_1 SET balance = balance + ${amount} WHERE id = ${id}`)
        .then((result: any) => {
            return true;
        })
        .catch((err: any) => {
            console.log(err);
            return err;
        });

        return null;
    }

}

export const accountService = new AccountService();