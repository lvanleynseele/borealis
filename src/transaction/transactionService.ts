const path = require('path');
import { auroraClient } from '../servers/auroraServer';



export class TransactionService {

    constructor() {
    }

    public async transferMoney(fromAccountId: string, toAccountId: string, amount: number): Promise<boolean> {
        const fromAccount = await auroraClient.query(`SELECT * FROM accounts_1 WHERE id = ${fromAccountId}`);
        const toAccount = await auroraClient.query(`SELECT * FROM accounts_1 WHERE id = ${toAccountId}`);

        if(fromAccount.rows[0].balance < amount) {
            return false;
        }

        const fromAccountBalance = fromAccount.rows[0].balance - amount;
        const toAccountBalance = toAccount.rows[0].balance + amount;

        await auroraClient.query(`UPDATE accounts_1 SET balance = ${fromAccountBalance} WHERE id = ${fromAccountId}`);
        await auroraClient.query(`UPDATE accounts_1 SET balance = ${toAccountBalance} WHERE id = ${toAccountId}`);

        await auroraClient.query(`INSERT INTO transactions_1 VALUES (${fromAccountId}, ${toAccountId}, ${amount})`);
        
        return true;
    }
}