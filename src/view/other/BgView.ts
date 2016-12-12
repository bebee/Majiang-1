/**
 * BgView
 * @Author Ace.c
 * @Create 2016-12-12 14:28
 */
class BgView extends BaseGameSprite {

    private curtain: eui.Image;
    private title: eui.Image;
    private close: eui.Button;

    private callback: Function;
    private thisobj: any;

    constructor() {
        super();

        this.skinName = "BgViewSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.setType(BgViewType.decorate);

        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
    }

    private closeHandler() {
        if (this.callback) {
            this.thisobj ? this.callback.call(this.thisobj) : this.callback();
        }
    }

    addCallback(callback: Function, thisobj?: any) {
        this.callback = callback;
        this.thisobj = thisobj;
    }

    /**
     * 隐藏关闭按钮
     */
    hideClose() {
        this.close.visible = false;
    }

    /**
     * 设置显示
     * @param type
     */
    setType(type: BgViewType) {
        switch (type) {
            case BgViewType.normal:
                this.skinState = "normal";
                break;
            case BgViewType.curtain:
                this.skinState = "title";
                break;
            case BgViewType.decorate:
                this.skinState = "decorate";
                break;
        }
    }

    /**
     * 设置title
     * @param source
     */
    setTitle(source: string | egret.Texture) {
        this.title.source = source;
    }

    /**
     * 设置布幔类型
     * @param type
     */
    setCurtain(type: CurtainType) {
        switch (type) {
            case CurtainType.green:
                this.curtain.source = "dialog_head_img";
                break;
            case CurtainType.red:
                this.curtain.source = "shop_dialog_head_img";
                break;
        }
    }
}

/**
 * 布幔类型
 */
enum CurtainType {
    green, red
}

/**
 * 类型
 */
enum BgViewType {
    normal, curtain, decorate
}