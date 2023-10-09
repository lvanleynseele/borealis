export declare class TransactionService {
    constructor();
    transferMoney(fromAccountId: string, toAccountId: string, amount: number): Promise<boolean>;
}
