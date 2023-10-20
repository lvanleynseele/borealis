import { Account } from "../../proto/accountPackage/Account";
import { TransferResponse } from '../../proto/accountPackage/TransferResponse';
import { Long } from '@grpc/proto-loader';
declare class AccountService {
    constructor();
    addAccount(account: Account): Promise<void>;
    getAccount(id: string): Promise<Account>;
    getAllAccounts(): Promise<any>;
    updateAccount(account: Account): Promise<Account>;
    deleteAccount(id: string): Promise<void>;
    debitRequest(id: string, amount: Long): Promise<TransferResponse>;
    creditRequest(id: string, amount: Long): Promise<TransferResponse>;
}
export declare const accountService: AccountService;
export {};
