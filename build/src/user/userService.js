"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const path = require('path');
const Account_1 = require("../../proto/accountPackage/Account");
const auroraServer_1 = require("../../servers/auroraServer");
const accountService_1 = require("../account/accountService");
class UserService {
    constructor() {
        // this.addUser = this.addUser.bind(this);
        // this.getUser = this.getUser.bind(this);
        // this.getAllUsers = this.getAllUsers.bind(this);
        // this.updateUser = this.updateUser.bind(this);
        // this.deleteUser = this.deleteUser.bind(this);
        // // this.deleteAccount = this.deleteAccount.bind(this);
    }
    async addUser(user) {
        var _a;
        auroraServer_1.auroraClient.query(`INSERT INTO users_2 VALUES ('${user.id}', '${user.name}', '${user.email}', '{${(_a = user.accountIds) === null || _a === void 0 ? void 0 : _a.toString()}}')`)
            .then((result) => {
            return result.rows[0];
        }).catch((err) => {
            console.log('Error: ' + err);
            return err;
        });
        return null;
    }
    async addAccountToUser(userId, account) {
        accountService_1.accountService.addAccount(account).then((accountResult) => {
            if ((0, Account_1.isAccount)(accountResult)) {
                auroraServer_1.auroraClient.query(`UPDATE users_2 SET accountIds = array_append(accountIds, '${account.id}') WHERE id = ${userId}`)
                    .then((userResult) => {
                    return { userId: userResult.rows[0].userId, account: accountResult.id };
                }).catch((err) => {
                    console.log('Error: ' + err);
                    return err;
                });
            }
        }).catch((err) => {
            console.log('Error: ' + err);
            return err;
        });
        return null;
    }
    async getUser(id) {
        auroraServer_1.auroraClient.query(`SELECT * FROM users_2 WHERE id = ${id}`).then((result) => {
            return result.rows[0];
        }).catch((err) => {
            console.log(err);
            return err;
        });
        return null;
    }
    async getAllUsers() {
        auroraServer_1.auroraClient.query('SELECT * FROM users_2').then((result) => {
            return result.rows;
        }).catch((err) => {
            console.log(err);
            return err;
        });
        return null;
    }
    async deleteUser(id) {
        const result = await auroraServer_1.auroraClient.query('DELETE FROM users_2 WHERE id = $1', [id]);
        return result;
    }
    async deleteAccount(userId, accountId) {
        try {
            await auroraServer_1.auroraClient.query(`DELETE FROM accounts_1 WHERE id = ${accountId}`);
            await auroraServer_1.auroraClient.query(`UPDATE users_2 SET accountIds = array_remove(accountIds, '${accountId}') WHERE id = ${userId}`);
        }
        catch (error) {
            console.log('Error: ' + error);
        }
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map