import type { Long } from '@grpc/proto-loader';
export interface Account {
    'id'?: (string);
    'name'?: (string);
    'balance'?: (number | string | Long);
}
export interface Account__Output {
    'id'?: (string);
    'name'?: (string);
    'balance'?: (Long);
}
export declare function isAccount(account: any): account is Account;
