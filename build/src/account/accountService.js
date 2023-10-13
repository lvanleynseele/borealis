"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountService = void 0;
const path = require('path');
const auroraServer_1 = require("../servers/auroraServer");
class AccountService {
    constructor() {
    }
    async addAccount(account) {
        return await auroraServer_1.auroraClient.query(`INSERT INTO accounts_1 VALUES ('${account.id}', '${account.name}', ${account.balance})`).rows[0];
    }
    async getAccount(id) {
        return await auroraServer_1.auroraClient.query(`SELECT * FROM accounts_1 WHERE id = ${id}`).rows[0];
    }
    async getAllAccounts() {
        return await auroraServer_1.auroraClient.query('SELECT * FROM accounts_1').rows;
    }
    async updateAccount(account) {
        let updatedAccount = await auroraServer_1.auroraClient.query(`UPDATE accounts_1 SET name = '${account.name}', balance = ${account.balance} WHERE id = ${account.id}`).rows[0];
        return {
            id: updatedAccount.id,
            name: updatedAccount.name,
            balance: updatedAccount.balance,
        };
    }
    async deleteAccount(id) {
        await auroraServer_1.auroraClient.query(`DELETE FROM accounts_1 WHERE id = ${id}`);
    }
    async debitRequest(id, amount) {
        return {
            newBalance: await auroraServer_1.auroraClient.query(`UPDATE accounts_1 SET balance = balance - ${amount} WHERE id = ${id}`).rows[0].balance,
        };
    }
    async creditRequest(id, amount) {
        return {
            newBalance: await auroraServer_1.auroraClient.query(`UPDATE accounts_1 SET balance = balance + ${amount} WHERE id = ${id}`).rows[0].balance,
        };
    }
}
exports.accountService = new AccountService();
//# sourceMappingURL=accountService.js.map