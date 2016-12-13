/**
 * Created by Administrator on 2016/11/12.
 */
class HeadIconView extends BaseGameSprite {

    private img_head: eui.Image;
    private img_headMask: egret.Shape;
    private img_kuang: eui.Image;
    private img_fangzhu: eui.Image;
    private img_zhuang: eui.Image;
    private img_que: eui.Image;
    btn_kill: eui.Button;
    private lab_name: eui.Label;
    private lab_uid: eui.Label;

    player: Player;

    constructor() {
        super();

        this.skinName = "HeadIconViewSkin";
    }

    childrenCreated() {
        super.childrenCreated();

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

    update(player: Player) {
        this.lab_name.text = "" + player.nick;
        this.lab_uid.text = "" + player.uid;

    }

    /**
     * 是否显示踢人按钮
     * @param value
     */
    set isShowKill(value: boolean) {
        this.btn_kill.visible = value;
    }

    setHeadSource(url: string = null) {
        if (this.player && this.player.pic) {
            this.img_head.source = url;
        }
        else if (this.currentState == "offline") {
            this.img_head.source = "game_head_lixian";
        }
        else {
            this.img_head.source = "game_head_null";
        }
    }

    setQue(type: CardType = CardType.unknow) {
        switch (type) {
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

    showFangzhu(boo: boolean) {
        this.img_fangzhu.visible = boo;
    }

    showZhuang(boo: boolean) {
        this.img_zhuang.visible = boo;
    }

    reset() {
        this.img_que.source = "";
    }

    clean() {
        this.img_fangzhu.visible = false;
        this.img_zhuang.visible = false;
        this.img_que.source = "";
        this.btn_kill.visible = false;
    }
}