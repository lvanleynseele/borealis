import { Account } from '../../proto/accountPackage/Account';
import { User } from "../../proto/userPackage/User";
import { AddAccountResponse } from '../../proto/userPackage/AddAccountResponse';
import { AddUserResponse } from '../../proto/userPackage/AddUserResponse';
declare class UserService {
    constructor();
    addUser(user: User): Promise<AddUserResponse | Error | null>;
    addAccountToUser(userId: string, account: Account): Promise<AddAccountResponse | Error | null>;
    getUser(id: string): Promise<User | Error | null>;
    getAllUsers(): Promise<User[] | Error | null>;
    deleteUser(id: string): Promise<any>;
    deleteAccount(userId: string, accountId: string): Promise<void>;
}
export declare const userService: UserService;
export {};
