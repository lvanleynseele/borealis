import { startTransactionServer } from "./servers/transactionServer";
import { startUserServer } from "./servers/userServer";
import { startAccountServer } from "./servers/accountServer";
import { startAuroraServer } from "./servers/auroraServer";


startUserServer();
startTransactionServer();
startAccountServer();
startAuroraServer();