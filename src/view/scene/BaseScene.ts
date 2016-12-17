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

        if (!LayerManager.gameLayer().sceneLayer.contains(this)) {
            LayerManager.gameLayer().sceneLayer.addChild(this);
        }
    }

    hide(): void {
        super.hide();

        if (LayerManager.gameLayer().sceneLayer.contains(this)) {
            LayerManager.gameLayer().sceneLayer.removeChild(this);
        }
    }
}