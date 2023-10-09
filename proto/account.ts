import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AccountServiceClient as _accountPackage_AccountServiceClient, AccountServiceDefinition as _accountPackage_AccountServiceDefinition } from './accountPackage/AccountService';
import type { TransactionServiceClient as _transactionPackage_TransactionServiceClient, TransactionServiceDefinition as _transactionPackage_TransactionServiceDefinition } from './transactionPackage/TransactionService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  accountPackage: {
    Account: MessageTypeDefinition
    AccountService: SubtypeConstructor<typeof grpc.Client, _accountPackage_AccountServiceClient> & { service: _accountPackage_AccountServiceDefinition }
    CreditRequest: MessageTypeDefinition
    DebitRequest: MessageTypeDefinition
    DeleteAccountRequest: MessageTypeDefinition
    Empty: MessageTypeDefinition
    GetAccountRequest: MessageTypeDefinition
    TransferResponse: MessageTypeDefinition
    UpdateAccountRequest: MessageTypeDefinition
  }
  transactionPackage: {
    TransactionRequest: MessageTypeDefinition
    TransactionService: SubtypeConstructor<typeof grpc.Client, _transactionPackage_TransactionServiceClient> & { service: _transactionPackage_TransactionServiceDefinition }
    TransferResponse: MessageTypeDefinition
  }
}

