import { startAccountClient } from "./clients/accountClient";
import { startTransactionClient } from "./clients/transactionClient";
import { startUserClient } from "./clients/userClient";
import { startAccountServer } from "./src/servers/accountServer";
import { startAuroraServer } from "./src/servers/auroraServer";
import { startTransactionServer } from "./src/servers/transactionServer";
import { startUserServer } from "./src/servers/userServer";

export const account= {};


//start gRPC servers for rpc calls
startUserServer();
startTransactionServer();
startAccountServer();

//start server to connect to aurora db 
startAuroraServer();

//start clients to make calls to gRPC servers
//initialized clients exported from module
startUserClient();
startAccountClient();
startTransactionClient();