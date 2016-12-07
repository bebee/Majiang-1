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

        TimerManager.i.addEventListener(TimerManager.Second, this.timeHandler, this);
    }

    private timeHandler() {
        if (!this.initComplete)return;

    }

    private clickHandler(e: egret.TouchEvent) {
        this.hide();

        var type: number;

        switch (e.currentTarget) {
            case this.btn_wan:
                type = 1;
                break;
            case this.btn_tiao:
                type = 2;
                break;
            case this.btn_tong:
                type = 3;
                break;
        }

        SocketManager.getInstance().getGameConn().send(15, {
            "args": {
                "action": 9999,
                "pai": type
            }
        });
    }

    public show() {
        super.show();

        this.x = acekit.width >> 1;
        this.y = acekit.height - 220;
        GSController.i.gsView.frontUIContainer.addChild(this);
    }

    public hide() {
        super.hide();

        if (GSController.i.gsView.frontUIContainer.contains(this)) {
            GSController.i.gsView.frontUIContainer.removeChild(this);
        }
    }
}