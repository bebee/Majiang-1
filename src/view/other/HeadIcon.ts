class HeadIcon extends BaseGameSprite {

    private img_head: eui.Image;
    private img_kuang_normal: eui.Image;
    private img_kuang_owner: eui.Image;
    private img_zhuang: eui.Image;
    private img_que: eui.Image;
    private lab_nick: eui.Label;
    private lab_uid: eui.Label;
    private lab_fen: eui.Label;
    private btn_kill: eui.Button;

    private img_headMask: egret.Shape;

    private _isOwner: boolean = false;
    private _isZhuang: boolean = false;
    private _isOffline: boolean = false;
    private _que: CardType = CardType.unknow;

    dir: DirType;
    player: PlayerVo;

    constructor(dir: DirType = DirType.bottom) {
        super();
        this.skinName = "HeadIconSkin";
        this.dir = dir;
    }

    childrenCreated() {
        super.childrenCreated();

        this.img_headMask = new egret.Shape;
        this.img_headMask.graphics.beginFill(0);
        this.img_headMask.graphics.drawRoundRect(0, 0, 80, 80, 30, 30);
        this.img_head.mask = this.img_headMask;

        this.clean();

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.target) {
            case this.btn_kill:
                if (this.player) {
                    SocketManager.getInstance().getGameConn().send(22, {"args": {"pos": this.player.pos}});
                }
                break;
            default:
                var roleInfoPanel: RoleInfoPanel = StackManager.findDialog(RoleInfoPanel, "RoleInfoPanel");
                if (roleInfoPanel && this.player) {
                    roleInfoPanel.show();
                    roleInfoPanel.refreshRole(this.player);
                }
                break;
        }
    }

    update(player: PlayerVo) {
        this.player = player;
        if (player) {
            this.lab_nick.text = "" + this.player.nick;
            this.lab_uid.text = "" + this.player.uid;
            this.lab_fen.text = "" + this.player.cur;
            this.isOwner = this.player.pos == 1;

            this.isOffline = this.player.status == "offline";
            // this.que = player.que;

        }
        else {
            this.clean();
        }
    }

    set isOffline(value: boolean) {
        this._isOffline = value;
        if (value) {
            this.img_head.source = "game_head_lixian";
        }
        else {
            if (this.player && this.player.pic) {
                this.img_head.source = this.player.pic;
            }
            else {
                this.img_head.source = "game_head_null";
            }
        }

        if (this.currentState == "intable" && this.player) {
            this.btn_kill.visible = game.roomOwner && this.player.pos != 1;
        }
        else {
            this.btn_kill.visible = false;
        }
    }

    set isZhuang(value: boolean) {
        this._isZhuang = value;
        this.img_zhuang.visible = value;
    }

    set isOwner(value: boolean) {
        this._isOwner = value;
        this.img_kuang_owner.visible = value;
        this.img_kuang_normal.visible = !value;
    }

    set que(value: CardType) {
        this._que = value;

        this.img_que.visible = true;

        switch (value) {
            case CardType.wan:
                this.img_que.source = "img_dq_1";
                break;
            case CardType.tiao:
                this.img_que.source = "img_dq_2";
                break;
            case CardType.tong:
                this.img_que.source = "img_dq_3";
                break;
            default:
                this.img_que.source = "";
                this.img_que.visible = false;
                break;
        }
    }

    getScore() {
        return Number(this.lab_fen.text);
    }

    setScore(score: number) {
        this.lab_fen.text = "" + score;
    }

    setState(state: HeadIconState) {
        switch (state) {
            case HeadIconState.normal:
                this.skinState = "normal";
                break;
            case HeadIconState.ingame:
                this.skinState = "ingame";
                break;
            case HeadIconState.intable:
                this.skinState = "intable";
                break;
        }
    }

    reset() {
        this.isZhuang = false;
        this.que = CardType.unknow;
    }

    clean() {
        this.isOffline = false;
        this.isZhuang = false;
        this.isOwner = false;
        this.que = CardType.unknow;
        this.player = null;
        this.lab_nick.text = "";
        this.lab_uid.text = "";
        this.lab_fen.text = "";
    }
}

enum HeadIconState {
    normal, ingame, intable
}