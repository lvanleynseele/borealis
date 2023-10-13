// Original file: proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AddAccountRequest as _userPackage_AddAccountRequest, AddAccountRequest__Output as _userPackage_AddAccountRequest__Output } from '../userPackage/AddAccountRequest';
import type { AddAccountResponse as _userPackage_AddAccountResponse, AddAccountResponse__Output as _userPackage_AddAccountResponse__Output } from '../userPackage/AddAccountResponse';
import type { AddMultipleUsersRequest as _userPackage_AddMultipleUsersRequest, AddMultipleUsersRequest__Output as _userPackage_AddMultipleUsersRequest__Output } from '../userPackage/AddMultipleUsersRequest';
import type { AddMultipleUsersResponse as _userPackage_AddMultipleUsersResponse, AddMultipleUsersResponse__Output as _userPackage_AddMultipleUsersResponse__Output } from '../userPackage/AddMultipleUsersResponse';
import type { AddUserRequest as _userPackage_AddUserRequest, AddUserRequest__Output as _userPackage_AddUserRequest__Output } from '../userPackage/AddUserRequest';
import type { AddUserResponse as _userPackage_AddUserResponse, AddUserResponse__Output as _userPackage_AddUserResponse__Output } from '../userPackage/AddUserResponse';
import type { DeleteAccountRequest as _userPackage_DeleteAccountRequest, DeleteAccountRequest__Output as _userPackage_DeleteAccountRequest__Output } from '../userPackage/DeleteAccountRequest';
import type { DeleteUserRequest as _userPackage_DeleteUserRequest, DeleteUserRequest__Output as _userPackage_DeleteUserRequest__Output } from '../userPackage/DeleteUserRequest';
import type { Empty as _userPackage_Empty, Empty__Output as _userPackage_Empty__Output } from '../userPackage/Empty';
import type { GetUserRequest as _userPackage_GetUserRequest, GetUserRequest__Output as _userPackage_GetUserRequest__Output } from '../userPackage/GetUserRequest';
import type { GetUserResponse as _userPackage_GetUserResponse, GetUserResponse__Output as _userPackage_GetUserResponse__Output } from '../userPackage/GetUserResponse';
import type { User as _userPackage_User, User__Output as _userPackage_User__Output } from '../userPackage/User';

export interface UserServiceClient extends grpc.Client {
  AddAccount(argument: _userPackage_AddAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_AddAccountResponse__Output>): grpc.ClientUnaryCall;
  AddAccount(argument: _userPackage_AddAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_AddAccountResponse__Output>): grpc.ClientUnaryCall;
  AddAccount(argument: _userPackage_AddAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_AddAccountResponse__Output>): grpc.ClientUnaryCall;
  AddAccount(argument: _userPackage_AddAccountRequest, callback: grpc.requestCallback<_userPackage_AddAccountResponse__Output>): grpc.ClientUnaryCall;
  addAccount(argument: _userPackage_AddAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_AddAccountResponse__Output>): grpc.ClientUnaryCall;
  addAccount(argument: _userPackage_AddAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_AddAccountResponse__Output>): grpc.ClientUnaryCall;
  addAccount(argument: _userPackage_AddAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_AddAccountResponse__Output>): grpc.ClientUnaryCall;
  addAccount(argument: _userPackage_AddAccountRequest, callback: grpc.requestCallback<_userPackage_AddAccountResponse__Output>): grpc.ClientUnaryCall;
  
  AddMultipleUsers(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_AddMultipleUsersResponse__Output>): grpc.ClientWritableStream<_userPackage_AddMultipleUsersRequest>;
  AddMultipleUsers(metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_AddMultipleUsersResponse__Output>): grpc.ClientWritableStream<_userPackage_AddMultipleUsersRequest>;
  AddMultipleUsers(options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_AddMultipleUsersResponse__Output>): grpc.ClientWritableStream<_userPackage_AddMultipleUsersRequest>;
  AddMultipleUsers(callback: grpc.requestCallback<_userPackage_AddMultipleUsersResponse__Output>): grpc.ClientWritableStream<_userPackage_AddMultipleUsersRequest>;
  addMultipleUsers(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_AddMultipleUsersResponse__Output>): grpc.ClientWritableStream<_userPackage_AddMultipleUsersRequest>;
  addMultipleUsers(metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_AddMultipleUsersResponse__Output>): grpc.ClientWritableStream<_userPackage_AddMultipleUsersRequest>;
  addMultipleUsers(options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_AddMultipleUsersResponse__Output>): grpc.ClientWritableStream<_userPackage_AddMultipleUsersRequest>;
  addMultipleUsers(callback: grpc.requestCallback<_userPackage_AddMultipleUsersResponse__Output>): grpc.ClientWritableStream<_userPackage_AddMultipleUsersRequest>;
  
  AddUser(argument: _userPackage_AddUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_AddUserResponse__Output>): grpc.ClientUnaryCall;
  AddUser(argument: _userPackage_AddUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_AddUserResponse__Output>): grpc.ClientUnaryCall;
  AddUser(argument: _userPackage_AddUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_AddUserResponse__Output>): grpc.ClientUnaryCall;
  AddUser(argument: _userPackage_AddUserRequest, callback: grpc.requestCallback<_userPackage_AddUserResponse__Output>): grpc.ClientUnaryCall;
  addUser(argument: _userPackage_AddUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_AddUserResponse__Output>): grpc.ClientUnaryCall;
  addUser(argument: _userPackage_AddUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_AddUserResponse__Output>): grpc.ClientUnaryCall;
  addUser(argument: _userPackage_AddUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_AddUserResponse__Output>): grpc.ClientUnaryCall;
  addUser(argument: _userPackage_AddUserRequest, callback: grpc.requestCallback<_userPackage_AddUserResponse__Output>): grpc.ClientUnaryCall;
  
  DeleteAccount(argument: _userPackage_DeleteAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _userPackage_DeleteAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _userPackage_DeleteAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _userPackage_DeleteAccountRequest, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _userPackage_DeleteAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _userPackage_DeleteAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _userPackage_DeleteAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _userPackage_DeleteAccountRequest, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  
  DeleteUser(argument: _userPackage_DeleteUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _userPackage_DeleteUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _userPackage_DeleteUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _userPackage_DeleteUserRequest, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _userPackage_DeleteUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _userPackage_DeleteUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _userPackage_DeleteUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _userPackage_DeleteUserRequest, callback: grpc.requestCallback<_userPackage_Empty__Output>): grpc.ClientUnaryCall;
  
  GetAllUsers(argument: _userPackage_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_userPackage_User__Output>;
  GetAllUsers(argument: _userPackage_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_userPackage_User__Output>;
  getAllUsers(argument: _userPackage_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_userPackage_User__Output>;
  getAllUsers(argument: _userPackage_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_userPackage_User__Output>;
  
  GetUser(argument: _userPackage_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _userPackage_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _userPackage_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _userPackage_GetUserRequest, callback: grpc.requestCallback<_userPackage_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_GetUserRequest, callback: grpc.requestCallback<_userPackage_GetUserResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  AddAccount: grpc.handleUnaryCall<_userPackage_AddAccountRequest__Output, _userPackage_AddAccountResponse>;
  
  AddMultipleUsers: grpc.handleClientStreamingCall<_userPackage_AddMultipleUsersRequest__Output, _userPackage_AddMultipleUsersResponse>;
  
  AddUser: grpc.handleUnaryCall<_userPackage_AddUserRequest__Output, _userPackage_AddUserResponse>;
  
  DeleteAccount: grpc.handleUnaryCall<_userPackage_DeleteAccountRequest__Output, _userPackage_Empty>;
  
  DeleteUser: grpc.handleUnaryCall<_userPackage_DeleteUserRequest__Output, _userPackage_Empty>;
  
  GetAllUsers: grpc.handleServerStreamingCall<_userPackage_Empty__Output, _userPackage_User>;
  
  GetUser: grpc.handleUnaryCall<_userPackage_GetUserRequest__Output, _userPackage_GetUserResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  AddAccount: MethodDefinition<_userPackage_AddAccountRequest, _userPackage_AddAccountResponse, _userPackage_AddAccountRequest__Output, _userPackage_AddAccountResponse__Output>
  AddMultipleUsers: MethodDefinition<_userPackage_AddMultipleUsersRequest, _userPackage_AddMultipleUsersResponse, _userPackage_AddMultipleUsersRequest__Output, _userPackage_AddMultipleUsersResponse__Output>
  AddUser: MethodDefinition<_userPackage_AddUserRequest, _userPackage_AddUserResponse, _userPackage_AddUserRequest__Output, _userPackage_AddUserResponse__Output>
  DeleteAccount: MethodDefinition<_userPackage_DeleteAccountRequest, _userPackage_Empty, _userPackage_DeleteAccountRequest__Output, _userPackage_Empty__Output>
  DeleteUser: MethodDefinition<_userPackage_DeleteUserRequest, _userPackage_Empty, _userPackage_DeleteUserRequest__Output, _userPackage_Empty__Output>
  GetAllUsers: MethodDefinition<_userPackage_Empty, _userPackage_User, _userPackage_Empty__Output, _userPackage_User__Output>
  GetUser: MethodDefinition<_userPackage_GetUserRequest, _userPackage_GetUserResponse, _userPackage_GetUserRequest__Output, _userPackage_GetUserResponse__Output>
}
