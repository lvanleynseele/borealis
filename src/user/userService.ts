const path = require('path');
import { Account } from '../../proto/accountPackage/Account';
import { auroraClient } from '../servers/auroraServer';
import { User } from "../../proto/userPackage/User";
import { AddAccountResponse } from '../../proto/userPackage/AddAccountResponse';
import { AddUserResponse } from '../../proto/userPackage/AddUserResponse';
import { accountService } from '../account/accountService';
class UserService {


    constructor() {
    }

    public async addUser(user: User): Promise<AddUserResponse> {
        await auroraClient.query(`INSERT INTO users_2 VALUES ('${user.id}', '${user.name}', '${user.email}', '{${user.accountIds?.toString()}}')`);
    
        return { user : user }
    }

    public async addAccountToUser(userId: string, account: Account): Promise<AddAccountResponse> {
        await accountService.addAccount(account);
        await auroraClient.query(`UPDATE users_2 SET accountIds = array_append(accountIds, '${account.id}') WHERE id = ${userId}`)

        return {userId: userId, account: account};

    }

    public async getUser(id: string): Promise<User>{
        let user = await auroraClient.query(`SELECT * FROM users_2 WHERE id = '${id}'`);

        return {
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email,
            accountIds: user.rows[0].accountids,
        }   
    }

    //return rows and update server to convert to user objects
    public async getAllUsers(): Promise<User[]>  {
        let allUsers = await auroraClient.query('SELECT * FROM users_2');
        return allUsers.rows;
    }

    async deleteUser(id: string) {
        await auroraClient.query(`DELETE FROM users_2 WHERE id = '${id}'`);
    }

    async deleteAccount(userId: string, accountId: string) {
        await auroraClient.query(`DELETE FROM accounts_1 WHERE id = ${accountId}`);
        await auroraClient.query(`UPDATE users_2 SET accountIds = array_remove(accountIds, '${accountId}') WHERE id = ${userId}`);
    }
    
}


export const userService = new UserService();