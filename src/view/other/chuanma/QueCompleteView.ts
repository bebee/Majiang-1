/**
 * QueCompleteView
 * @Author Ace.c
 * @Create 2016-12-19 14:00
 */
class QueCompleteView extends BaseGameSprite {

    private dir_1: eui.Image;
    private dir_2: eui.Image;
    private dir_3: eui.Image;
    private dir_4: eui.Image;

    constructor() {
        super();

        this.skinName = "QueCompleteViewSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        var img: eui.Image;
        for (var i: number = 1; i <= 4; i++) {
            img = this["dir_" + i];
            img.anchorOffsetX = img.width >> 1;
            img.anchorOffsetY = img.height >> 1;
        }
    }

    excute() {
        var img: eui.Image;
        var tarx: number;
        var tary: number;
        for (var i: number = 1; i <= 4; i++) {
            img = this["dir_" + i];

            img.x = this.width >> 1;
            img.y = this.height >> 1;
            img.source = "img_dq_" + game.roomQue[i];

            switch (i) {
                case 1:
                    img.anchorOffsetY = 0;
                    img.y = acekit.height / 2 + 80;
                    tarx = 10;
                    tary = 420;
                    break;
                case 2:
                    img.x += 300;
                    tarx = 870;
                    tary = 280;
                    break;
                case 3:
                    img.y -= 200;
                    tarx = 695;
                    tary = 10;
                    break;
                case 4:
                    img.x -= 300;
                    tarx = 10;
                    tary = 280;
                    break;
            }

            this.animation(img, tarx, tary);
        }
    }

    animation(img: eui.Image, tarx: number, tary: number) {

        img.alpha = 0;
        img.scaleX = img.scaleY = 0.6;

        egret.Tween.get(img)
            .to({scaleX: 1.1, scaleY: 1.1, alpha: 1.0}, 500)
            .to({scaleX: 1.0, scaleY: 1.0}, 100)
            .wait(1000)
            .to({x: tarx, y: tary, scaleX: 0.6, scaleY: 0.6, alpha: 0}, 300)
            .call(this.animationComplete, this);
    }

    animationComplete() {

        if (!this.visible)return;

        this.hide();

        GSController.i.gsView.updateRoom();
        FashionTools.sortPai(PublicVal.i.getHandPais(1));
        GSController.i.updateMJView(1);
    }

    show() {
        super.show();

        GSController.i.gsView.frontUIContainer.addChild(this);

        this.excute();
    }

    hide() {
        super.hide();

        if (GSController.i.gsView.frontUIContainer.contains(this)) {
            GSController.i.gsView.frontUIContainer.removeChild(this);
        }
    }
}