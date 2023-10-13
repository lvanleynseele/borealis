import { startUserClient } from "./clients/userClient";
import { startAccountServer } from "./src/servers/accountServer";
import { startAuroraServer } from "./src/servers/auroraServer";
import { startTransactionServer } from "./src/servers/transactionServer";
import { startUserServer } from "./src/servers/userServer";

export const account= {};

startUserServer();
startTransactionServer();
startAccountServer();
startAuroraServer();

startUserClient();