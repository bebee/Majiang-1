/**
 * ChangeThreeAnimation
 * @Author Ace.c
 * @Create 2016-11-30 17:05
 */
class ChangeThreeAnimation extends BaseSprite {

    private lab_description: eui.Label;
    private img_change_1: eui.Image;
    private img_change_2l: eui.Image;
    private img_change_2r: eui.Image;

    private type: ChangeThreeType;

    public constructor(type?: ChangeThreeType) {
        super();
        this.skinName = "ChangeThreeAnimationSkin";

        this.type = type;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.touchChildren = false;
        this.touchEnabled = false;

        this.img_change_1.anchorOffsetX = this.img_change_1.width >> 1;
        this.img_change_1.anchorOffsetY = this.img_change_1.height >> 1;

        this.img_change_1.x = this.width >> 1;
        this.img_change_1.y = this.height >> 1;

        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height >> 1;

        this.setType(this.type);
    }

    public setType(type: ChangeThreeType) {

        this.type = type;

        if (!this.initComplete || this.type == undefined) {
            return;
        }

        this.clean();

        var _this = this;

        switch (this.type) {
            case ChangeThreeType.anti_clockwise:
                this.skinState = "anti_clockwise";
                this.lab_description.text = "本局逆时针换牌";

                egret.Tween.get(this.img_change_1, {loop: true}).to({rotation: -100}, 800).wait(500).call(function () {
                    _this.hide();

                    _this.tweenComplete();
                });
                break;
            case ChangeThreeType.clockwise:
                this.skinState = "clockwise";
                this.lab_description.text = "本局顺时针换牌";

                egret.Tween.get(this.img_change_1, {loop: true}).to({rotation: 100}, 800).wait(500).call(function () {
                    _this.hide();

                    _this.tweenComplete();
                });
                break;
            case ChangeThreeType.other:
                this.skinState = "other";
                this.lab_description.text = "本局对家换牌";

                egret.Tween.get(this.img_change_2l, {loop: true}).to({y: this.img_change_2l.y + 50}, 500).call(function () {
                    _this.img_change_2l.y = 128;
                });

                egret.Tween.get(this.img_change_2r, {loop: true}).to({y: this.img_change_2r.y - 50}, 500).call(function () {
                    _this.img_change_2r.y = 128;
                });

                egret.setTimeout(function () {

                    _this.tweenComplete();
                    _this.hide();

                }, this, 1500);
                break;
        }
    }

    tweenComplete() {
        GSController.i.updateMJView(1);
        GSController.i.updateMJView(2);
        GSController.i.updateMJView(3);
        GSController.i.updateMJView(4);

        game.isChangeThreeBoo = false;
        if (game.isQueBoo) {
            game.manager.dispatchEvent(GameEvent.Que);
        }
    }

    public show() {
        super.show();

        this.x = acekit.width >> 1;
        this.y = acekit.height >> 1;

        GSController.i.gsView.frontUIContainer.addChild(this);
    }

    public hide() {
        super.hide();

        this.clean();

        if (GSController.i.gsView.frontUIContainer.contains(this)) {
            GSController.i.gsView.frontUIContainer.removeChild(this);
        }
    }

    public clean() {
        this.lab_description.text = "";

        this.img_change_1.rotation = 0;
        this.img_change_2l.y = this.img_change_2r.y = 128;

        egret.Tween.removeTweens(this.img_change_1);
        egret.Tween.removeTweens(this.img_change_2l);
        egret.Tween.removeTweens(this.img_change_2r);
    }
}