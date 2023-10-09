// Original file: proto/transaction.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { TransactionRequest as _transactionPackage_TransactionRequest, TransactionRequest__Output as _transactionPackage_TransactionRequest__Output } from '../transactionPackage/TransactionRequest';
import type { TransferResponse as _transactionPackage_TransferResponse, TransferResponse__Output as _transactionPackage_TransferResponse__Output } from '../transactionPackage/TransferResponse';

export interface TransactionServiceClient extends grpc.Client {
  TransactionRequest(argument: _transactionPackage_TransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transactionPackage_TransferResponse__Output>): grpc.ClientUnaryCall;
  TransactionRequest(argument: _transactionPackage_TransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transactionPackage_TransferResponse__Output>): grpc.ClientUnaryCall;
  TransactionRequest(argument: _transactionPackage_TransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transactionPackage_TransferResponse__Output>): grpc.ClientUnaryCall;
  TransactionRequest(argument: _transactionPackage_TransactionRequest, callback: grpc.requestCallback<_transactionPackage_TransferResponse__Output>): grpc.ClientUnaryCall;
  transactionRequest(argument: _transactionPackage_TransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_transactionPackage_TransferResponse__Output>): grpc.ClientUnaryCall;
  transactionRequest(argument: _transactionPackage_TransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_transactionPackage_TransferResponse__Output>): grpc.ClientUnaryCall;
  transactionRequest(argument: _transactionPackage_TransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_transactionPackage_TransferResponse__Output>): grpc.ClientUnaryCall;
  transactionRequest(argument: _transactionPackage_TransactionRequest, callback: grpc.requestCallback<_transactionPackage_TransferResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface TransactionServiceHandlers extends grpc.UntypedServiceImplementation {
  TransactionRequest: grpc.handleUnaryCall<_transactionPackage_TransactionRequest__Output, _transactionPackage_TransferResponse>;
  
}

export interface TransactionServiceDefinition extends grpc.ServiceDefinition {
  TransactionRequest: MethodDefinition<_transactionPackage_TransactionRequest, _transactionPackage_TransferResponse, _transactionPackage_TransactionRequest__Output, _transactionPackage_TransferResponse__Output>
}
