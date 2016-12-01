/**
 * MissingSelect
 * @Author Ace.c
 * @Create 2016-12-01 13:45
 */
class MissingSelect extends BaseSprite {

    private btn_wan: eui.Button;
    private btn_tiao: eui.Button;
    private btn_tong: eui.Button;

    public constructor() {
        super();

        this.skinName = "MissingSelectSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.btn_wan.scaleX = this.btn_wan.scaleY = 1.5;
        this.btn_tiao.scaleX = this.btn_tiao.scaleY = 1.5;
        this.btn_tong.scaleX = this.btn_tong.scaleY = 1.5;

        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height >> 1;

        this.btn_wan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_tiao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_tong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        this.hide();

        switch (e.currentTarget) {
            case this.btn_wan:
                break;
            case this.btn_tiao:
                break;
            case this.btn_tong:
                break;
        }
    }

    public show() {
        super.show();

        this.x = Acekit.i.width >> 1;
        this.y = Acekit.i.height - 220;
        Acekit.i.addChild(this);
    }

    public hide() {
        super.hide();

        Acekit.i.removeChild(this);
    }
}