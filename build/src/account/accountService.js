"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountService = void 0;
const path = require('path');
const auroraServer_1 = require("../../servers/auroraServer");
class AccountService {
    constructor() {
    }
    async addAccount(account) {
        auroraServer_1.auroraClient.query(`INSERT INTO accounts_1 VALUES ('${account.id}', '${account.name}', ${account.balance})`)
            .then((result) => {
            return result.rows[0];
        }).catch((err) => {
            console.log('Error: ' + err);
            return err;
        });
        return null;
    }
    async getAccount(id) {
        auroraServer_1.auroraClient.query(`SELECT * FROM accounts_1 WHERE id = ${id}`).then((result) => {
            return result.rows[0];
        }).catch((err) => {
            console.log(err);
            return err;
        });
        return null;
    }
    async getAllAccounts() {
        auroraServer_1.auroraClient.query('SELECT * FROM accounts_1').then((result) => {
            return result.rows;
        })
            .catch((err) => {
            console.log(err);
            return err;
        });
        return null;
    }
    async updateAccount(account) {
        auroraServer_1.auroraClient.query(`UPDATE accounts_1 SET name = '${account.name}', balance = ${account.balance} WHERE id = ${account.id}`)
            .then((result) => {
            return result.rows[0];
        })
            .catch((err) => {
            console.log(err);
            return err;
        });
        return null;
    }
    async deleteAccount(id) {
        auroraServer_1.auroraClient.query(`DELETE FROM accounts_1 WHERE id = ${id}`)
            .then((result) => {
            return true;
        })
            .catch((err) => {
            console.log(err);
            return false;
        });
        return false;
    }
    async debitRequest(id, amount) {
        auroraServer_1.auroraClient.query(`UPDATE accounts_1 SET balance = balance - ${amount} WHERE id = ${id}`)
            .then((result) => {
            return result.rows[0].balance;
        })
            .catch((err) => {
            console.log(err);
            return err;
        });
        return null;
    }
    async creditRequest(id, amount) {
        auroraServer_1.auroraClient.query(`UPDATE accounts_1 SET balance = balance + ${amount} WHERE id = ${id}`)
            .then((result) => {
            return true;
        })
            .catch((err) => {
            console.log(err);
            return err;
        });
        return null;
    }
}
exports.accountService = new AccountService();
//# sourceMappingURL=accountService.js.map