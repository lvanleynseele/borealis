"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const path = require('path');
const auroraServer_1 = require("../servers/auroraServer");
const accountService_1 = require("../account/accountService");
class UserService {
    constructor() {
    }
    async addUser(user) {
        var _a;
        return {
            user: await auroraServer_1.auroraClient.query(`INSERT INTO users_2 VALUES ('${user.id}', '${user.name}', '${user.email}', '{${(_a = user.accountIds) === null || _a === void 0 ? void 0 : _a.toString()}}')`).rows[0]
        };
    }
    async addAccountToUser(userId, account) {
        await accountService_1.accountService.addAccount(account);
        await auroraServer_1.auroraClient.query(`UPDATE users_2 SET accountIds = array_append(accountIds, '${account.id}') WHERE id = ${userId}`);
        return { userId: userId, account: account };
    }
    async getUser(id) {
        let user = await auroraServer_1.auroraClient.query(`SELECT * FROM users_2 WHERE id = '${id}'`);
        return {
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email,
            accountIds: user.rows[0].accountids,
        };
    }
    //return rows and update server to convert to user objects
    async getAllUsers() {
        return await auroraServer_1.auroraClient.query('SELECT * FROM users_2').rows;
    }
    async deleteUser(id) {
        return await auroraServer_1.auroraClient.query(`DELETE FROM users_2 WHERE id = '${id}'`);
    }
    async deleteAccount(userId, accountId) {
        await auroraServer_1.auroraClient.query(`DELETE FROM accounts_1 WHERE id = ${accountId}`);
        await auroraServer_1.auroraClient.query(`UPDATE users_2 SET accountIds = array_remove(accountIds, '${accountId}') WHERE id = ${userId}`);
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map