/**
 * Created by Ace.C on 2016/4/15.
 */
class BasePanel extends BaseGameSprite {

    private bgView: BgView;

    constructor() {
        super();
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView = <BgView|CloseBgView>this.getChildAt(0);
        if (this.bgView) {
            this.bgView.addCallback(this.hide, this);
        }
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