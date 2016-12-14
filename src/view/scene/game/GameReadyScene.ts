/**
 * GameReadyScene
 * @Author Ace.c
 * @Create 2016-12-14 14:23
 */
class GameReadyScene extends BaseScene {

    private lab_roomid: eui.Label;
    private lab_rule: eui.Label;
    private lab_description: eui.Label;
    private head_1: HeadIcon;
    private head_2: HeadIcon;
    private head_3: HeadIcon;
    private head_4: HeadIcon;
    private btn_weixin: eui.Button;
    private btn_quit: eui.Button;
    private btn_invite: eui.Button;
    private btn_start: eui.Button;
    private btn_continue: eui.Button;

    constructor() {
        super();

        this.skinName = "GameReadySceneSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.btn_continue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_quit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_weixin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_continue:
                this.btn_continue.visible = false;
                SocketManager.getInstance().getGameConn().send(17, {});
                break;
            case this.btn_invite:
                Global.showShare(true);
                Weixin.onMenuShareAppMessage(game.roomid + "");
                Weixin.onMenuShareTimeline(game.roomid + "");
                break;
            case this.btn_quit:
                if (PublicVal.state == StateType.reconnect || PublicVal.state == StateType.gamestart || PublicVal.state == StateType.ting) {
                    if (game.dissolution && game.dissolution.vote) {
                        StackManager.open(DissolutionPanel, "DissolutionPanel");
                    }
                    else {
                        game.askPanel.showMsg(function (r) {
                            if (r) {
                                SocketManager.getInstance().getGameConn().send(14, {"args": {"answer": 1}});//发起解散房子
                            }
                        }, "您确定发起解散房间吗？\n（当所有在线玩家同意解散之后房间将解散）");
                    }
                } else if (PublicVal.state == 6) {
                    game.askPanel.showMsg(function (r) {
                        if (r) {
                            Replayer.i.exit();
                        }
                    }, "您确定要退出回放吗？");
                }
                else {
                    var info: string;
                    if (GSData.i.roomOwnDir == 1) {
                        info = "您未开始一局游戏，解散房间不扣房卡，\n是否解散？";

                    } else {
                        info = "您确定要离开房间吗？";
                    }

                    game.askPanel.showMsg(function (r) {
                        if (r) {
                            SocketManager.getInstance().getGameConn().send(12, {});   //离开房子
                        }
                    }, info);
                }
                break;
            case this.btn_start://发送开始游戏
                SocketManager.getInstance().getGameConn().send(10, {});
                break;
            case this.btn_weixin:
                Weixin.closeWindow();
                break;
        }
    }

    update() {

        this.updateRoomID();
        this.updateRule();
        this.updateQuit();

        var player: PlayerVo;
        var head: HeadIcon;
        for (var dirKey in GSData.i.roomPlayers) {
            player = GSData.i.roomPlayers[dirKey];
            head = <HeadIcon>this["head_" + dirKey];
            if (head) {
                head.update(player);
            }
        }

        if(this.currentState == "ready" || this.currentState == "start"){
            if (game.roomPlayerCount != game.roomPlayerMax) {
                this.lab_description.text = "等待其他玩家，请稍候...";
            }
            else if (game.player.pos == 1) {
                this.lab_description.text = "所有玩家准备就绪，尽快开始游戏吧！！！";
            }
            else {
                this.lab_description.text = "等待房主开始游戏，请稍候...";
            }
        }
        else {
            this.lab_description.text = "等待其他玩家，请稍候...";
        }
    }

    //刷新房间号
    updateRoomID() {
        this.lab_roomid.text = '房间号:' + game.roomid;
    }

    //刷新规则
    updateRule() {
        this.lab_rule.text = "" + PublicVal.i.rules;
    }

    //更新退出按钮文本
    updateQuit() {
        this.btn_quit.label = game.player.pos == 1 ? "解散房间" : "离开房间";
    }

    setState(state: GameReadySceneState) {
        switch (state) {
            case GameReadySceneState.ready:
                this.skinState = "ready";
                break;
            case GameReadySceneState.start:
                this.skinState = "start";
                break;
            case GameReadySceneState.continue:
                this.skinState = "continue";
                break;
        }
    }
}

enum GameReadySceneState {
    ready, start, continue
}