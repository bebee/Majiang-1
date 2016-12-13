/**
 * Created by Administrator on 2016/11/12.
 */
class HeadIconView extends BaseGameSprite {

    private img_head: eui.Image;
    private img_headMask: egret.Shape;
    private img_kuang: egret.Bitmap;
    private img_fangzhu: egret.Bitmap;
    private img_zhuang: egret.Bitmap;
    private img_que: eui.Image;
    btn_kill: egret.Bitmap;

    constructor() {
        super();

        this.skinName = "HeadIconViewSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.img_headMask = new egret.Shape;
        this.img_headMask.graphics.beginFill(0);
        this.img_headMask.graphics.drawRoundRect(0, 0, 72, 72, 30, 30);
        this.img_headMask.anchorOffsetX = this.img_headMask.anchorOffsetY = 36;

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

    /**
     * 是否显示踢人按钮
     * @param value
     */
    set isShowKill(value: boolean) {
        this.btn_kill.visible = value;
    }

    setHeadPic(pic: string) {
        var _this = this;
        RES.getResByUrl(pic, (t)=> {
            if (t) {
                _this.setHeadImg(t);
            }
        }, this, RES.ResourceItem.TYPE_IMAGE);
    }

    setHeadImg(source: string | egret.Texture) {
        this.img_head.source = source;
    }

    setQueImg(type: CardType = CardType.unknow) {
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

    visibleRoomOwn(boo: boolean) {
        this.img_fangzhu.visible = boo;
    }

    visibleZhuang(boo: boolean) {
        this.img_zhuang.visible = boo;
    }

    reset() {
        this.img_que.source = "";
    }

    clean() {
        this.img_zhuang.visible = false;
        this.img_fangzhu.visible = false;
        this.img_head.source = "";
        this.img_que.source = "";
        this.btn_kill.visible = false;
    }
}