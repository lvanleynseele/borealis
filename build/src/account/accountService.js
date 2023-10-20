"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountService = void 0;
const path = require('path');
const auroraServer_1 = require("../servers/auroraServer");
class AccountService {
    constructor() { }
    async addAccount(account) {
        await auroraServer_1.auroraClient.query(`INSERT INTO accounts_1 VALUES ('${account.id}', '${account.name}', ${account.balance})`);
    }
    async getAccount(id) {
        const response = await auroraServer_1.auroraClient.query(`SELECT * FROM accounts_1 WHERE id = '${id}'`);
        return {
            ...response.rows[0]
        };
    }
    async getAllAccounts() {
        const response = await auroraServer_1.auroraClient.query('SELECT * FROM accounts_1');
        return response.rows;
    }
    async updateAccount(account) {
        let response = await auroraServer_1.auroraClient.query(`UPDATE accounts_1 SET name = '${account.name}', balance = ${account.balance} WHERE id = ${account.id}`);
        return {
            ...response.rows[0]
        };
    }
    async deleteAccount(id) {
        await auroraServer_1.auroraClient.query(`DELETE FROM accounts_1 WHERE id = ${id}`);
    }
    async debitRequest(id, amount) {
        const response = await auroraServer_1.auroraClient.query(`UPDATE accounts_1 SET balance = balance - ${amount.low} WHERE id = '${id}'`);
        return { newBalance: response.rows[0].balance };
    }
    async creditRequest(id, amount) {
        const response = await auroraServer_1.auroraClient.query(`UPDATE accounts_1 SET balance = balance + ${amount.low} WHERE id = '${id}'`);
        return { newBalance: response.rows[0].balance };
    }
}
exports.accountService = new AccountService();
//# sourceMappingURL=accountService.js.map