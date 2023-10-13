"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAuroraServer = exports.auroraClient = void 0;
const { Client } = require('pg');
const path = require('path');
const config = require('../../awsConfig.json')['development'];
exports.auroraClient = new Client({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.username,
    password: config.password
});
function startAuroraServer() {
    exports.auroraClient.connect();
}
exports.startAuroraServer = startAuroraServer;
//# sourceMappingURL=auroraServer.js.map