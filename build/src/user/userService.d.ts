import { Account } from '../../proto/accountPackage/Account';
import { User } from "../../proto/userPackage/User";
import { AddAccountResponse } from '../../proto/userPackage/AddAccountResponse';
import { AddUserResponse } from '../../proto/userPackage/AddUserResponse';
declare class UserService {
    constructor();
    addUser(user: User): Promise<AddUserResponse>;
    addAccount(userId: string, account: Account): Promise<AddAccountResponse>;
    getUser(id: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    deleteUser(id: string): Promise<void>;
    deleteAccount(userId: string, accountId: string): Promise<void>;
}
export declare const userService: UserService;
export {};
