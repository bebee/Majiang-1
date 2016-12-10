/**
 * CloseBgView
 * @Author Ace.c
 * @Create 2016-12-09 17:40
 */
class CloseBgView extends BgView {

    close: eui.Button;

    constructor() {
        super();

        this.skinName = "CloseBgViewSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
    }

    private closeHandler() {
        this.closeCall();
    }
}