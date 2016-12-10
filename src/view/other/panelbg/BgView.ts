/**
 * BgView
 * @Author Ace.c
 * @Create 2016-12-09 17:50
 */
class BgView extends BaseGameSprite {

    protected callback: Function;
    protected thisobj: any;

    title: eui.Image;

    constructor() {
        super();

        this.skinName = "BgViewSkin";

        this.title = new eui.Image();
    }

    childrenCreated() {
        super.childrenCreated();
    }

    addCallback(callback: Function, thisobj?: any) {
        this.callback = callback;
        this.thisobj = thisobj;
    }

    protected closeCall() {
        if (this.callback) {
            this.thisobj ? this.callback.call(this.thisobj) : this.callback();
        }
    }
}