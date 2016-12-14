class HeadIcon extends BaseGameSprite {

    private img_head: eui.Image;
    private img_kuang_normal: eui.Image;
    private img_kuang_owner: eui.Image;
    private img_zhuang: eui.Image;
    private img_que: eui.Image;
    private lab_nick: eui.Label;
    private lab_uid: eui.Label;
    private lab_fen: eui.Label;
    btn_kill: eui.Button;

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

        this.skinState = "normal";

        this.img_headMask = new egret.Shape;
        this.img_headMask.graphics.beginFill(0);
        this.img_headMask.graphics.drawRoundRect(0, 0, 80, 80, 30, 30);
        this.img_head.mask = this.img_headMask;

        this.clean();

        this.btn_kill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissHandler, this);
    }

    private dismissHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_kill:
                break;
        }
    }

    update(player: PlayerVo) {
        this.player = player;
        if (!player) {
            return;
        }

        this.lab_nick.text = "" + this.player.nick;
        this.lab_uid.text = "" + this.player.uid;

        this.isOwner = this.player.pos == 1;
        this.isOffline = this.player.status == "offline";

        this.que = game.allQue[this.player.dir];
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
            this.btn_kill.visible = game.player.pos == 1 && this.player.pos != 1;
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
        this.img_kuang_normal.visible = !value;
        this.img_kuang_owner.visible = value;
    }

    set que(value: CardType) {
        this._que = value;

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
        this.dir = DirType.bottom;
        this.player = null;
        this.setState(HeadIconState.normal);
    }
}

enum HeadIconState {
    normal, ingame, intable
}