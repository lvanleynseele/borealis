import { Account } from "../../proto/accountPackage/Account";
import { TransferResponse } from '../../proto/accountPackage/TransferResponse';
declare class AccountService {
    constructor();
    addAccount(account: Account): Promise<Account | Error | null>;
    getAccount(id: string): Promise<Account | Error | null>;
    getAllAccounts(): Promise<Account[] | Error | null>;
    updateAccount(account: Account): Promise<Account | Error | null>;
    deleteAccount(id: string): Promise<boolean>;
    debitRequest(id: string, amount: number): Promise<TransferResponse | Error | null>;
    creditRequest(id: string, amount: number): Promise<TransferResponse | Error | null>;
}
export declare const accountService: AccountService;
export {};
