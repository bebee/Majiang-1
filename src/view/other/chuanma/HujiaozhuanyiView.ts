/**
 * GangshangkaihuaView
 * @Author Ace.c
 * @Create 2016-12-08 15:15
 */
class HujiaozhuanyiView extends BaseSprite {

    private icon: eui.Image;
    private icon_0: eui.Image;

    public constructor() {
        super();

        this.skinName = "HujiaozhuanyiViewSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.icon.anchorOffsetX = this.icon.width >> 1;
        this.icon.anchorOffsetY = this.icon.height >> 1;

        this.clean();
    }

    play(dir: DirType, dir_0: DirType) {
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

        this.icon.x -= 100;
        this.icon.alpha = 0.5;
        this.icon.visible = true;

        egret.Tween.get(this.icon)
            .to({x: this.icon.x + 100, alpha: 1}, 500)
            .wait(1000)
            .call(this.hide, this);

        switch (dir_0) {
            case DirType.top:
                this.icon_0.x = game.stage.stageWidth / 2;
                this.icon_0.y = 100;
                break;
            case DirType.bottom:
                this.icon_0.x = game.stage.stageWidth / 2;
                this.icon_0.y = 480;
                break;
            case DirType.left:
                this.icon_0.x = 160;
                this.icon_0.y = game.stage.stageHeight / 2;
                break;
            case DirType.right:
                this.icon_0.x = game.stage.stageWidth - 160;
                this.icon_0.y = game.stage.stageHeight / 2;
                break;
        }

        this.icon_0.x -= 100;
        this.icon_0.alpha = 0.5;
        this.icon_0.visible = true;

        egret.Tween.get(this.icon_0)
            .to({x: this.icon_0.x + 100, alpha: 1}, 500)
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