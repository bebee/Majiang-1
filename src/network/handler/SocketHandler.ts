/**
 * SocketHandler
 * @Author Ace.c
 * @Create 2016-12-17 10:08
 */
class SocketHandler {

    public socket: egret.WebSocket;

    private ip;

    private port;

    private type; //1 中心服务 2游戏服务

    private status; //0未连接 1连接中 2已连接 3已断开

    private waitSend = []; //等待发送的消息

    constructor(ip, port, type) {
        this.ip = ip;
        this.port = port;
        this.type = type;
    }

    createConn() {

        this.clean();

        this.socket = new egret.WebSocket();

        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);

        this.socket.addEventListener(egret.Event.CONNECT, this.onSuccess, this);

        this.socket.addEventListener(egret.Event.CLOSE, this.onBeClose, this);

        this.socket.type = egret.WebSocket.TYPE_STRING;

        this.onConnect();

    }

    onConnect() {
        if (gameConfig.code && gameConfig.protocolType == "https://") {
            this.socket.connectByUrl("wss://" + this.ip + ":" + this.port);
        }
        else {
            this.socket.connect(this.ip, this.port);
        }

        this.status = 1;
        console.log("请求链接！" + this.type);
    }

    onSuccess() {
        console.log("链接成功！" + this.type);
        this.status = 2;

        for (var i = 0; i < this.waitSend.length; i++) {
            if (!this.waitSend[i])continue;
            this.send(this.waitSend[i].mId, this.waitSend[i].obj);
        }

        this.waitSend = [];
    }

    onBeClose() {
        console.log("连接断开" + this.type);
        this.status = 3;

        switch (this.type) {
            case 1:

                break;
            case 2:

                break;
        }

        Global.reLogin();
    }

    onClose() {
        console.log("主动断开连接！" + this.type);
        this.socket.close();
        this.status = 3;
    }

    clean() {
        console.log("清空连接" + this.type);
        if (this.socket) {
            this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.socket.removeEventListener(egret.Event.CONNECT, this.onSuccess, this);
            this.socket.removeEventListener(egret.Event.CLOSE, this.onBeClose, this);
            this.socket = null;
        }
    }

    isConnected() {
        if (this.status == 1) return true;
        if (this.status == 2) return this.socket.connected;
        return false;
    }

    getStatus() {
        return this.status;
    }

    setStatus(s) {
        this.status = s;
        if (this.status == 3) {
            SocketManager.getInstance().clean(this.type);
        }
    }

    onReceiveMessage() {
        var start: string = this.socket.readUTF();

        console.log("==================", start);

        if (start == "start") {
            if (game.player.code) {
                var p = game.player;
                SocketManager.getInstance().getGameConn().send(1, {
                    "uid": p.uid,
                    "code": p.code,
                    "length": p.code.length
                });
            }
            else {
                SocketManager.getInstance().getGameConn().send(1);
            }
            return;
        }
        else if (start == "end") {
            Weixin.getAccessCode(gameConfig.appid, gameConfig.clientUrl, game.roomid);
            return;
        }

        var obj: any = JSON.parse(start);

        if (+obj["code"] > 0) {
            if (!gameConfig.msgList[obj["code"]]) {
                EffectUtils.showTips("未知错误 code：" + obj["code"], 5);
            }
            else {
                EffectUtils.showTips("" + gameConfig.msgList[obj["code"]], 5);
            }
        }

        var sequence = obj.sequence;

        var msgId = "S" + sequence;

        var response = SocketManager.getInstance().Agree[msgId];

        if (!response) {
            console.log("can't find the response messageID:" + msgId + " data is: ", obj.data);
        }
        else {
            console.log(">>Read<<---------:  ", msgId, obj.data);
            response.parseData(obj);
        }
    }


    send(messageID: number, obj: any = null) {
        var request = SocketManager.getInstance().Agree["_" + messageID];
        if (request) {
            if (obj && messageID != 1) obj["sequence"] = messageID;

            console.log("<<Send>>---------:  ", messageID, obj);

            this.socket.writeUTF(request.writeData(obj));
        }
        else {
            console.log("can't find the request messageID:" + "_" + messageID);
        }
    }
}