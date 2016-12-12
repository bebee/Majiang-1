/**
 * ScoreView
 * @Author Ace.c
 * @Create 2016-12-09 14:31
 */
class ScoreView extends BaseGameSprite {

    private lab_dir_1: eui.BitmapLabel;
    private lab_dir_2: eui.BitmapLabel;
    private lab_dir_3: eui.BitmapLabel;
    private lab_dir_4: eui.BitmapLabel;

    public constructor() {
        super();

        this.skinName = "ScoreViewSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.touchChildren = false;
        this.touchEnabled = false;

        this.clean();
    }

    play(scores: any) {
        this.show();

        for (var dir in scores) {
            this.excute(dir, scores[dir]);
        }

        egret.setTimeout(this.hide, this, 1300);
    }

    excute(dir, score) {
        var target: eui.BitmapLabel = this["lab_dir_" + dir];

        if (score >= 0) {
            target.font = "font_num_score_plus";
            target.text = "+" + score;
        }
        else {
            target.font = "font_num_score_minus";
            target.text = score;
        }

        switch (Number(dir)) {
            case DirType.top:
                target.x = game.stage.stageWidth / 2;
                target.y = 50;
                break;
            case DirType.bottom:
                target.x = game.stage.stageWidth / 2;
                target.y = 430;
                break;
            case DirType.left:
                target.x = 50;
                target.y = game.stage.stageHeight / 2;
                break;
            case DirType.right:
                target.x = game.stage.stageWidth - 50;
                target.y = game.stage.stageHeight / 2;
                break;
        }

        this.resetAnchor(target);

        target.scaleX = target.scaleY = 0.5;
        target.visible = true;

        egret.Tween.get(target)
            .to({scaleX: 1.3, scaleY: 1.3}, 150)
            .to({scaleX: 0.9, scaleY: 0.9}, 100)
            .to({scaleX: 1.0, scaleY: 1.0}, 100);
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
        this.lab_dir_1.text = "";
        this.lab_dir_1.alpha = 1;
        this.lab_dir_1.scaleX = this.lab_dir_1.scaleY = 1;
        this.lab_dir_1.visible = false;
        egret.Tween.removeTweens(this.lab_dir_1);
        this.lab_dir_2.text = "";
        this.lab_dir_2.alpha = 1;
        this.lab_dir_2.scaleX = this.lab_dir_1.scaleY = 1;
        this.lab_dir_2.visible = false;
        egret.Tween.removeTweens(this.lab_dir_2);
        this.lab_dir_3.text = "";
        this.lab_dir_3.alpha = 1;
        this.lab_dir_3.scaleX = this.lab_dir_3.scaleY = 1;
        this.lab_dir_3.visible = false;
        egret.Tween.removeTweens(this.lab_dir_3);
        this.lab_dir_4.text = "";
        this.lab_dir_4.alpha = 1;
        this.lab_dir_4.scaleX = this.lab_dir_4.scaleY = 1;
        this.lab_dir_4.visible = false;
        egret.Tween.removeTweens(this.lab_dir_4);
    }

    private resetAnchor(target?) {
        if (target) {
            target.anchorOffsetX = target.width >> 1;
            target.anchorOffsetY = target.height >> 1;
        }
        else {
            this.lab_dir_1.anchorOffsetX = this.lab_dir_1.width >> 1;
            this.lab_dir_1.anchorOffsetY = this.lab_dir_1.height >> 1;

            this.lab_dir_2.anchorOffsetX = this.lab_dir_2.width >> 1;
            this.lab_dir_2.anchorOffsetY = this.lab_dir_2.height >> 1;

            this.lab_dir_3.anchorOffsetX = this.lab_dir_3.width >> 1;
            this.lab_dir_3.anchorOffsetY = this.lab_dir_3.height >> 1;

            this.lab_dir_4.anchorOffsetX = this.lab_dir_4.width >> 1;
            this.lab_dir_4.anchorOffsetY = this.lab_dir_4.height >> 1;
        }
    }
}