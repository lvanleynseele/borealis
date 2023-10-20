// Original file: proto/account.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Account as _accountPackage_Account, Account__Output as _accountPackage_Account__Output } from '../accountPackage/Account';
import type { CreditRequest as _accountPackage_CreditRequest, CreditRequest__Output as _accountPackage_CreditRequest__Output } from '../accountPackage/CreditRequest';
import type { DebitRequest as _accountPackage_DebitRequest, DebitRequest__Output as _accountPackage_DebitRequest__Output } from '../accountPackage/DebitRequest';
import type { DeleteAccountRequest as _accountPackage_DeleteAccountRequest, DeleteAccountRequest__Output as _accountPackage_DeleteAccountRequest__Output } from '../accountPackage/DeleteAccountRequest';
import type { Empty as _accountPackage_Empty, Empty__Output as _accountPackage_Empty__Output } from '../accountPackage/Empty';
import type { GetAccountRequest as _accountPackage_GetAccountRequest, GetAccountRequest__Output as _accountPackage_GetAccountRequest__Output } from '../accountPackage/GetAccountRequest';
import type { UpdateAccountRequest as _accountPackage_UpdateAccountRequest, UpdateAccountRequest__Output as _accountPackage_UpdateAccountRequest__Output } from '../accountPackage/UpdateAccountRequest';

export interface AccountServiceClient extends grpc.Client {
  AddAccount(argument: _accountPackage_Account, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  AddAccount(argument: _accountPackage_Account, metadata: grpc.Metadata, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  AddAccount(argument: _accountPackage_Account, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  AddAccount(argument: _accountPackage_Account, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  addAccount(argument: _accountPackage_Account, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  addAccount(argument: _accountPackage_Account, metadata: grpc.Metadata, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  addAccount(argument: _accountPackage_Account, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  addAccount(argument: _accountPackage_Account, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  
  CreditRequest(argument: _accountPackage_CreditRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  CreditRequest(argument: _accountPackage_CreditRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  CreditRequest(argument: _accountPackage_CreditRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  CreditRequest(argument: _accountPackage_CreditRequest, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  creditRequest(argument: _accountPackage_CreditRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  creditRequest(argument: _accountPackage_CreditRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  creditRequest(argument: _accountPackage_CreditRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  creditRequest(argument: _accountPackage_CreditRequest, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  
  DebitRequest(argument: _accountPackage_DebitRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  DebitRequest(argument: _accountPackage_DebitRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  DebitRequest(argument: _accountPackage_DebitRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  DebitRequest(argument: _accountPackage_DebitRequest, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  debitRequest(argument: _accountPackage_DebitRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  debitRequest(argument: _accountPackage_DebitRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  debitRequest(argument: _accountPackage_DebitRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  debitRequest(argument: _accountPackage_DebitRequest, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  
  DeleteAccount(argument: _accountPackage_DeleteAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _accountPackage_DeleteAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _accountPackage_DeleteAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _accountPackage_DeleteAccountRequest, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _accountPackage_DeleteAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _accountPackage_DeleteAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _accountPackage_DeleteAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _accountPackage_DeleteAccountRequest, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  
  GetAccount(argument: _accountPackage_GetAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Account__Output>): grpc.ClientUnaryCall;
  GetAccount(argument: _accountPackage_GetAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_accountPackage_Account__Output>): grpc.ClientUnaryCall;
  GetAccount(argument: _accountPackage_GetAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Account__Output>): grpc.ClientUnaryCall;
  GetAccount(argument: _accountPackage_GetAccountRequest, callback: grpc.requestCallback<_accountPackage_Account__Output>): grpc.ClientUnaryCall;
  getAccount(argument: _accountPackage_GetAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Account__Output>): grpc.ClientUnaryCall;
  getAccount(argument: _accountPackage_GetAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_accountPackage_Account__Output>): grpc.ClientUnaryCall;
  getAccount(argument: _accountPackage_GetAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Account__Output>): grpc.ClientUnaryCall;
  getAccount(argument: _accountPackage_GetAccountRequest, callback: grpc.requestCallback<_accountPackage_Account__Output>): grpc.ClientUnaryCall;
  
  GetAllAccounts(argument: _accountPackage_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_accountPackage_Account__Output>;
  GetAllAccounts(argument: _accountPackage_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_accountPackage_Account__Output>;
  getAllAccounts(argument: _accountPackage_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_accountPackage_Account__Output>;
  getAllAccounts(argument: _accountPackage_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_accountPackage_Account__Output>;
  
  UpdateAccount(argument: _accountPackage_UpdateAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  UpdateAccount(argument: _accountPackage_UpdateAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  UpdateAccount(argument: _accountPackage_UpdateAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  UpdateAccount(argument: _accountPackage_UpdateAccountRequest, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  updateAccount(argument: _accountPackage_UpdateAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  updateAccount(argument: _accountPackage_UpdateAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  updateAccount(argument: _accountPackage_UpdateAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  updateAccount(argument: _accountPackage_UpdateAccountRequest, callback: grpc.requestCallback<_accountPackage_Empty__Output>): grpc.ClientUnaryCall;
  
}

export interface AccountServiceHandlers extends grpc.UntypedServiceImplementation {
  AddAccount: grpc.handleUnaryCall<_accountPackage_Account__Output, _accountPackage_Empty>;
  
  CreditRequest: grpc.handleUnaryCall<_accountPackage_CreditRequest__Output, _accountPackage_Empty>;
  
  DebitRequest: grpc.handleUnaryCall<_accountPackage_DebitRequest__Output, _accountPackage_Empty>;
  
  DeleteAccount: grpc.handleUnaryCall<_accountPackage_DeleteAccountRequest__Output, _accountPackage_Empty>;
  
  GetAccount: grpc.handleUnaryCall<_accountPackage_GetAccountRequest__Output, _accountPackage_Account>;
  
  GetAllAccounts: grpc.handleServerStreamingCall<_accountPackage_Empty__Output, _accountPackage_Account>;
  
  UpdateAccount: grpc.handleUnaryCall<_accountPackage_UpdateAccountRequest__Output, _accountPackage_Empty>;
  
}

export interface AccountServiceDefinition extends grpc.ServiceDefinition {
  AddAccount: MethodDefinition<_accountPackage_Account, _accountPackage_Empty, _accountPackage_Account__Output, _accountPackage_Empty__Output>
  CreditRequest: MethodDefinition<_accountPackage_CreditRequest, _accountPackage_Empty, _accountPackage_CreditRequest__Output, _accountPackage_Empty__Output>
  DebitRequest: MethodDefinition<_accountPackage_DebitRequest, _accountPackage_Empty, _accountPackage_DebitRequest__Output, _accountPackage_Empty__Output>
  DeleteAccount: MethodDefinition<_accountPackage_DeleteAccountRequest, _accountPackage_Empty, _accountPackage_DeleteAccountRequest__Output, _accountPackage_Empty__Output>
  GetAccount: MethodDefinition<_accountPackage_GetAccountRequest, _accountPackage_Account, _accountPackage_GetAccountRequest__Output, _accountPackage_Account__Output>
  GetAllAccounts: MethodDefinition<_accountPackage_Empty, _accountPackage_Account, _accountPackage_Empty__Output, _accountPackage_Account__Output>
  UpdateAccount: MethodDefinition<_accountPackage_UpdateAccountRequest, _accountPackage_Empty, _accountPackage_UpdateAccountRequest__Output, _accountPackage_Empty__Output>
}
