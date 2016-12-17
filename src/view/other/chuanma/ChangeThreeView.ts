/**
 * ChangeThreeView
 * @Author Ace.c
 * @Create 2016-12-01 11:28
 */
class ChangeThreeView extends BaseSprite {

    private btn_confirm: eui.Button;
    private lab_time: eui.BitmapLabel;

    private time: number;

    public constructor() {
        super();
        this.skinName = "ChangeThreeViewSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height >> 1;

        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private timeHandler() {
        if (!this.initComplete)return;

        if (this.time > 0) {
            this.time--;
            this.lab_time.text = "" + this.time;
        }
    }

    private clickHandler(e: egret.TouchEvent) {

        if (game.roomPlayerOffline > 0) {
            EffectUtils.showTips("有人掉线啦，请耐心等待一下。",5);
            return;
        }

        switch (e.currentTarget) {
            case this.btn_confirm:
                if (game.changeThreeVo.cards.length < 3) {
                    return;
                }

                game.statusComplete = true;

                this.hide();
                this.removeChangeThree();

                SocketManager.getInstance().getGameConn().send(15, {
                    "args": {
                        "action": 35,
                        "pai": game.changeThreeVo.cards
                    }
                });

                break;
        }
    }

    private removeChangeThree() {
        var pai: any;
        for (var i: number = 0; i < game.changeThreeVo.cards.length; i++) {
            pai = game.changeThreeVo.cards[i];
            PublicVal.i.removeHandPai(1, pai);
        }

        FashionTools.sortPai(PublicVal.i.getHandPais(1));

        GSController.i.updateMJView(1, false, false);
    }

    public show() {
        super.show();

        this.x = acekit.width >> 1;
        this.y = acekit.height - 220;
        GSController.i.gsView.frontUIContainer.addChild(this);

        this.time = GameConst.ChangeThreeTime;
        this.lab_time.text = "" + this.time;
        TimerManager.i.addEventListener(TimerManager.Second, this.timeHandler, this);
    }

    public hide() {
        super.hide();

        if (GSController.i.gsView.frontUIContainer.contains(this)) {
            GSController.i.gsView.frontUIContainer.removeChild(this);
        }

        TimerManager.i.delEventListener(TimerManager.Second, this.timeHandler, this);
    }
}