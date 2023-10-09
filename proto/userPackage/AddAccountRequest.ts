// Original file: proto/user.proto

import type { Account as _accountPackage_Account, Account__Output as _accountPackage_Account__Output } from '../accountPackage/Account';

export interface AddAccountRequest {
  'userId'?: (string);
  'account'?: (_accountPackage_Account | null);
}

export interface AddAccountRequest__Output {
  'userId'?: (string);
  'account'?: (_accountPackage_Account__Output);
}
