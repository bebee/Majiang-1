/**
 * YipaoduoxiangView
 * @Author Ace.c
 * @Create 2016-12-08 15:15
 */
class YipaoduoxiangView extends BaseSprite {

    private icon0: eui.Image;
    private icon1: eui.Image;
    private icon2: eui.Image;

    public constructor() {
        super();

        this.skinName = "YipaoduoxiangViewSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.icon0.anchorOffsetX = this.icon0.width >> 1;
        this.icon0.anchorOffsetY = this.icon0.height >> 1;

        this.icon1.anchorOffsetX = this.icon1.width >> 1;
        this.icon1.anchorOffsetY = this.icon1.height >> 1;

        this.icon2.anchorOffsetX = this.icon2.width >> 1;
        this.icon2.anchorOffsetY = this.icon2.height >> 1;

        this.clean();
    }

    play(dirs: DirType[]) {
        this.show();

        for (var i: number = 0; i < dirs.length; i++) {
            this.excute(i, dirs[i]);
        }
    }

    excute(index: number, dir: DirType) {
        var target: any = this["icon" + index];

        switch (dir) {
            case DirType.top:
                target.x = game.stage.stageWidth / 2;
                target.y = 100;
                break;
            case DirType.bottom:
                target.x = game.stage.stageWidth / 2;
                target.y = 480;
                break;
            case DirType.left:
                target.x = 160;
                target.y = game.stage.stageHeight / 2;
                break;
            case DirType.right:
                target.x = game.stage.stageWidth - 160;
                target.y = game.stage.stageHeight / 2;
                break;
        }

        target.scaleX = target.scaleY = 0.5;
        target.visible = true;

        egret.Tween.get(target)
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
        this.icon0.alpha = 1;
        this.icon0.scaleX = this.icon0.scaleY = 1;
        this.icon0.visible = false;
        egret.Tween.removeTweens(this.icon0);
        this.icon1.alpha = 1;
        this.icon1.scaleX = this.icon0.scaleY = 1;
        this.icon1.visible = false;
        egret.Tween.removeTweens(this.icon1);
        this.icon2.alpha = 1;
        this.icon2.scaleX = this.icon2.scaleY = 1;
        this.icon2.visible = false;
        egret.Tween.removeTweens(this.icon2);
    }
}