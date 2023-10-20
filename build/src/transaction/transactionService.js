"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionService = exports.TransactionService = void 0;
const path = require('path');
const accountService_1 = require("../account/accountService");
const uuid_1 = require("uuid");
const auroraServer_1 = require("../servers/auroraServer");
class TransactionService {
    constructor() {
    }
    async transactionRequest(senderId, receiverId, amount) {
        const sender = await accountService_1.accountService.getAccount(senderId);
        if (sender.balance < amount) {
            return false;
        }
        accountService_1.accountService.debitRequest(senderId, amount).then((result) => {
            accountService_1.accountService.creditRequest(receiverId, amount).then((result) => {
                return true;
            }).catch((err) => {
                accountService_1.accountService.creditRequest(senderId, amount).finally(() => { });
                return false;
            });
        }).catch((err) => {
            console.log(err);
            return false;
        });
        let transactionId = (0, uuid_1.v4)().toString();
        await auroraServer_1.auroraClient.query(`INSERT INTO transactions_1 VALUES ('${senderId}', '${receiverId}', ${amount.low}, '${transactionId}')`);
        return false;
    }
}
exports.TransactionService = TransactionService;
exports.transactionService = new TransactionService();
//# sourceMappingURL=transactionService.js.map