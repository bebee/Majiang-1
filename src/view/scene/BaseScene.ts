/**
 * Created by Ace.C on 2016/4/15.
 */
class BaseScene extends BaseGameSprite {

    public constructor() {
        super();
    }



    show(): void {
        super.show();

        this.top = this.bottom = this.left = this.right = 0;

        if (!this.manager.layerScene.contains(this)) {
            this.manager.layerScene.addChild(this);
        }
    }

    hide(): void {
        super.hide();

        if (this.manager.layerScene.contains(this)) {
            this.manager.layerScene.removeChild(this);
        }
    }
}