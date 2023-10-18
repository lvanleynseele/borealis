import { User } from "../proto/userPackage/User";
import { UserServiceClient } from "../proto/userPackage/UserService";
export declare const userClient: UserServiceClient;
export declare function startUserClient(): void;
export declare class UserClient {
    client: UserServiceClient;
    constructor();
    private startUserClient;
    private onClientReady;
    AddUser(user: User): Promise<void>;
    GetUser(id: string): Promise<User>;
    GetAllUsers(): Promise<User[]>;
}
