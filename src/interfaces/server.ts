export interface IServer {
    use: (url: string, cb: any) => void;
    listen: (opts: any) => void;
}