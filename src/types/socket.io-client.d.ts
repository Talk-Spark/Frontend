declare module "socket.io-client" {
    import { io, Socket } from "socket.io-client";
    export = Socket;
    export function io(uri: string, opts?: any): Socket;
}
