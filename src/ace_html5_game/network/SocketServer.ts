/**
 * SocketServer
 * @Author Ace.c
 * @Create 2016-12-17 10:35
 */
class SocketServer extends egret.WebSocket {

    ip: string;
    port: number;

    constructor(ip?: string, port?: number, type: string = egret.WebSocket.TYPE_STRING) {
        super();

        this.ip = ip;
        this.port = port;
        this.type = type;

        this.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.readData, this);
        this.addEventListener(egret.Event.CLOSE, this.onCloseed, this);
        this.addEventListener(egret.Event.CONNECT, this.onSuccess, this);

    }

    connect(ip?: string, port?: number, type?) {
        this.ip = ip;
        this.port = port;

        if(this.ip && this.port){

        }
        // if (gameConfig.code && gameConfig.protocolType == "https://") {
        //     this.socket.connectByUrl("wss://" + this.ip + ":" + this.port);
        // }
        // else {
        //     this.socket.connect(this.ip, this.port);
        // }
        //
        // this.status = 1;
        // console.log("请求链接！" + this.type);
    }

    private sendData() {

    }

    private readData() {

    }

    private onSuccess() {

    }

    private onCloseed() {

    }
}