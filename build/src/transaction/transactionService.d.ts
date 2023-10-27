import { Long } from '@grpc/proto-loader';
export declare class TransactionService {
    constructor();
    transactionRequest(senderId: string, receiverId: string, amount: Long): Promise<void>;
}
export declare const transactionService: TransactionService;
