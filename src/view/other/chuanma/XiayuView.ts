/**
 * XiayuView
 * @Author Ace.c
 * @Create 2016-12-08 15:16
 */
class XiayuView extends BaseSprite {

    private icon: eui.Image;

    public constructor() {
        super();

        this.skinName = "XiayuViewSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.icon.anchorOffsetX = this.icon.width >> 1;
        this.icon.anchorOffsetY = this.icon.height >> 1;

        this.clean();
    }

    play(dir: DirType) {
        this.show();

        switch (dir) {
            case DirType.top:
                this.icon.x = game.stage.stageWidth / 2;
                this.icon.y = 100;
                break;
            case DirType.bottom:
                this.icon.x = game.stage.stageWidth / 2;
                this.icon.y = 480;
                break;
            case DirType.left:
                this.icon.x = 160;
                this.icon.y = game.stage.stageHeight / 2;
                break;
            case DirType.right:
                this.icon.x = game.stage.stageWidth - 160;
                this.icon.y = game.stage.stageHeight / 2;
                break;
        }

        this.icon.scaleX = this.icon.scaleY = 0.5;
        this.icon.visible = true;

        egret.Tween.get(this.icon)
            .to({scaleX: 1.3, scaleY: 1.3}, 150)
            .to({scaleX: 0.9, scaleY: 0.9}, 100)
            .to({scaleX: 1.0, scaleY: 1.0}, 100)
            .wait(1000)
            .call(this.hide, this);
    }

    show() {
        super.show();

        GSController.i.gsView.frontUIContainer.addChild(this);
    }

    hide() {
        super.hide();

        this.clean();

        if (GSController.i.gsView.frontUIContainer.contains(this)) {
            GSController.i.gsView.frontUIContainer.removeChild(this);
        }
    }

    clean() {
        this.icon.alpha = 1;
        this.icon.scaleX = this.icon.scaleY = 1;
        this.icon.visible = false;
        egret.Tween.removeTweens(this.icon);
    }
}