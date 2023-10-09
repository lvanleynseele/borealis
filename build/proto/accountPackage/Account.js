"use strict";
// Original file: proto/account.proto
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAccount = void 0;
function isAccount(account) {
    return (account !== null &&
        typeof account === 'object' &&
        (account.id === undefined || typeof account.id === 'string') &&
        (account.name === undefined || typeof account.name === 'string') &&
        (account.balance === undefined ||
            typeof account.balance === 'number' ||
            typeof account.balance === 'string' ||
            typeof account.balance === 'bigint'));
}
exports.isAccount = isAccount;
//# sourceMappingURL=Account.js.map