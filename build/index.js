"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = void 0;
const accountServer_1 = require("./src/servers/accountServer");
const auroraServer_1 = require("./src/servers/auroraServer");
const transactionServer_1 = require("./src/servers/transactionServer");
const userServer_1 = require("./src/servers/userServer");
exports.account = {};
(0, userServer_1.startUserServer)();
(0, transactionServer_1.startTransactionServer)();
(0, accountServer_1.startAccountServer)();
(0, auroraServer_1.startAuroraServer)();
//# sourceMappingURL=index.js.map