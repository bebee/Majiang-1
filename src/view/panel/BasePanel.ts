/**
 * Created by Ace.C on 2016/4/15.
 */
class BasePanel extends BaseGameSprite {

    constructor() {
        super();
    }

    show(): void {
        super.show();

        if (!this.manager.layerPanel.contains(this)) {
            this.manager.layerPanel.addChild(this);
        }
    }

    hide(): void {
        super.hide();

        if (this.manager.layerPanel.contains(this)) {
            this.manager.layerPanel.removeChild(this);
        }
    }
}