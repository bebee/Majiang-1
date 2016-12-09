/**
 * CloseBgView
 * @Author Ace.c
 * @Create 2016-12-09 17:40
 */
class CloseBgView extends BaseGameSprite {

    close: eui.Button;

    private callback: Function;
    private thisobj: any;

    constructor() {
        super();

        this.skinName = "CloseBgViewSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
    }

    private closeHandler() {
        if (this.callback) {
            this.thisobj ? this.callback.call(this) : this.callback();
        }
    }

    addCallback(callback: Function, thisobj?: any) {
        this.callback = callback;
        this.thisobj = thisobj;
    }
}