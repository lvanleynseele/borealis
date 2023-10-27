import { Account } from "../../proto/accountPackage/Account";
import { Long } from '@grpc/proto-loader';
declare class AccountService {
    constructor();
    addAccount(account: Account): Promise<void>;
    getAccount(id: string): Promise<Account>;
    getAllAccounts(): Promise<any>;
    updateAccount(account: Account): Promise<void>;
    deleteAccount(id: string): Promise<void>;
    debitRequest(id: string, amount: Long): Promise<void>;
    creditRequest(id: string, amount: Long): Promise<void>;
}
export declare const accountService: AccountService;
export {};
