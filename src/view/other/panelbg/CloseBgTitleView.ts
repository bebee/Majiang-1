/**
 * CloseBgTitleView
 * @Author Ace.c
 * @Create 2016-12-09 17:40
 */
class CloseBgTitleView extends BgTitleView {

    close: eui.Button;

    constructor() {
        super();

        this.skinName = "CloseBgTitleViewSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
    }

    private closeHandler() {
        this.closeCall();
    }
}