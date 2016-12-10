/**
 * BgTitleView
 * @Author Ace.c
 * @Create 2016-12-09 17:50
 */
class BgTitleView extends BgView {

    protected callback: Function;
    protected thisobj: any;

    constructor() {
        super();

        this.skinName = "BgTitleViewSkin";
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