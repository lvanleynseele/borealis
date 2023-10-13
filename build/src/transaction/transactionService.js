"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const path = require('path');
const auroraServer_1 = require("../servers/auroraServer");
class TransactionService {
    constructor() {
    }
    async transferMoney(fromAccountId, toAccountId, amount) {
        const fromAccount = await auroraServer_1.auroraClient.query(`SELECT * FROM accounts_1 WHERE id = ${fromAccountId}`);
        const toAccount = await auroraServer_1.auroraClient.query(`SELECT * FROM accounts_1 WHERE id = ${toAccountId}`);
        if (fromAccount.rows[0].balance < amount) {
            return false;
        }
        const fromAccountBalance = fromAccount.rows[0].balance - amount;
        const toAccountBalance = toAccount.rows[0].balance + amount;
        await auroraServer_1.auroraClient.query(`UPDATE accounts_1 SET balance = ${fromAccountBalance} WHERE id = ${fromAccountId}`);
        await auroraServer_1.auroraClient.query(`UPDATE accounts_1 SET balance = ${toAccountBalance} WHERE id = ${toAccountId}`);
        await auroraServer_1.auroraClient.query(`INSERT INTO transactions_1 VALUES (${fromAccountId}, ${toAccountId}, ${amount})`);
        return true;
    }
}
exports.TransactionService = TransactionService;
//# sourceMappingURL=transactionService.js.map