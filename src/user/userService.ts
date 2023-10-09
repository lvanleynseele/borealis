const path = require('path');
import { Account, isAccount } from '../../proto/accountPackage/Account';
import { auroraClient } from '../../servers/auroraServer';
import { User } from "../../proto/userPackage/User";
import { AddAccountResponse } from '../../proto/userPackage/AddAccountResponse';
import { AddUserResponse } from '../../proto/userPackage/AddUserResponse';
import { accountService } from '../account/accountService';
class UserService {


    constructor() {
        // this.addUser = this.addUser.bind(this);
        // this.getUser = this.getUser.bind(this);
        // this.getAllUsers = this.getAllUsers.bind(this);
        // this.updateUser = this.updateUser.bind(this);
        // this.deleteUser = this.deleteUser.bind(this);
        // // this.deleteAccount = this.deleteAccount.bind(this);
    }

    public async addUser(user: User): Promise<AddUserResponse|Error|null> {
        
        auroraClient.query(
            `INSERT INTO users_2 VALUES ('${user.id}', '${user.name}', '${user.email}', '{${user.accountIds?.toString()}}')`)
            .then((result: any) => {
                return result.rows[0]
            }).catch((err: any) => {
                console.log('Error: ' + err);
                return err;
            })
        return null;
    }

    public async addAccountToUser(userId: string, account: Account): Promise<AddAccountResponse|Error|null> {
        accountService.addAccount(account).then((accountResult: any) => {
            if(isAccount(accountResult)){
                auroraClient.query(`UPDATE users_2 SET accountIds = array_append(accountIds, '${account.id}') WHERE id = ${userId}`)
                .then((userResult: any) => {
                    return {userId: userResult.rows[0].userId, account: accountResult.id};
                }).catch((err: any) => {
                    console.log('Error: ' + err);
                    return err;
                })
            }
        }).catch((err: any) => {
            console.log('Error: ' + err);
            return err;
        });
        
        return null;
    }

    public async getUser(id: string): Promise<User|Error|null> {
        auroraClient.query(`SELECT * FROM users_2 WHERE id = ${id}`).then((result: any) => {

            return result.rows[0];
        }).catch((err: any) => {
            console.log(err);
            return err;
        });

        return null;
    }

    public async getAllUsers(): Promise<User[]|Error|null>  {
        auroraClient.query('SELECT * FROM users_2').then((result: any) => {
            return result.rows;
        }).catch((err: any) => {
            console.log(err);
            return err;
        });

        return null;
    }

    async deleteUser(id: string) {
        const result = await auroraClient.query('DELETE FROM users_2 WHERE id = $1', [id]);
        return result;
    }

    async deleteAccount(userId: string, accountId: string) {
        try {
            await auroraClient.query(`DELETE FROM accounts_1 WHERE id = ${accountId}`);
            await auroraClient.query(`UPDATE users_2 SET accountIds = array_remove(accountIds, '${accountId}') WHERE id = ${userId}`);
        } catch (error) {
            console.log('Error: ' + error);
        }
    }
    
}


export const userService = new UserService();