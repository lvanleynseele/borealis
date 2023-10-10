import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';
import type { TransactionServiceClient as _transactionPackage_TransactionServiceClient, TransactionServiceDefinition as _transactionPackage_TransactionServiceDefinition } from './transactionPackage/TransactionService';
type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
    new (...args: ConstructorParameters<Constructor>): Subtype;
};
export interface ProtoGrpcType {
    transactionPackage: {
        TransactionRequest: MessageTypeDefinition;
        TransactionService: SubtypeConstructor<typeof grpc.Client, _transactionPackage_TransactionServiceClient> & {
            service: _transactionPackage_TransactionServiceDefinition;
        };
        TransferResponse: MessageTypeDefinition;
    };
}
export {};
