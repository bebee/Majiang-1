/**
 * Created by Ace.C on 2016/4/15.
 */
class BasePanel extends BaseGameSprite {

    protected bgView: BgView;

    constructor() {
        super();
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView = <BgView>this.getChildAt(0);
        if (this.bgView) {
            this.bgView.addCallback(this.hide, this);
        }
    }

    /**
     * 设置显示
     * @param type
     */
    setType(type: BgViewType) {
        this.bgView && this.bgView.setType(type);
    }

    /**
     * 设置title
     * @param source
     */
    setTitle(source: string | egret.Texture) {
        this.bgView && this.bgView.setTitle(source);
    }

    /**
     * 设置布幔类型
     * @param type
     */
    setCurtain(type: CurtainType) {
        this.bgView && this.bgView.setCurtain(type);
    }

    show(): void {
        super.show();

        this.manager.layerPanel.addChild(this);
    }

    hide(): void {
        super.hide();

        if (this.manager.layerPanel.contains(this)) {
            this.manager.layerPanel.removeChild(this);
        }
    }
}