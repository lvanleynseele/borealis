import { Account } from "../../proto/accountPackage/Account";
import { TransferResponse } from '../../proto/accountPackage/TransferResponse';
declare class AccountService {
    constructor();
    addAccount(account: Account): Promise<Account>;
    getAccount(id: string): Promise<Account | Error | null>;
    getAllAccounts(): Promise<any>;
    updateAccount(account: Account): Promise<Account>;
    deleteAccount(id: string): Promise<void>;
    debitRequest(id: string, amount: number): Promise<TransferResponse>;
    creditRequest(id: string, amount: number): Promise<TransferResponse>;
}
export declare const accountService: AccountService;
export {};
