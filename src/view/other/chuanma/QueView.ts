/**
 * QueView
 * @Author Ace.c
 * @Create 2016-12-01 13:45
 */
class QueView extends BaseSprite {

    private btn_wan: eui.Button;
    private btn_tiao: eui.Button;
    private btn_tong: eui.Button;

    public constructor() {
        super();

        this.skinName = "QueViewSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.btn_wan.scaleX = this.btn_wan.scaleY = 1.5;
        this.btn_tiao.scaleX = this.btn_tiao.scaleY = 1.5;
        this.btn_tong.scaleX = this.btn_tong.scaleY = 1.5;

        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height >> 1;

        this.btn_wan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_tiao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_tong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        TimerManager.i.addEventListener(TimerManager.Second, this.timeHandler, this);
    }

    private timeHandler() {
        if (!this.initComplete)return;

    }

    private clickHandler(e: egret.TouchEvent) {

        if (game.roomPlayerOffline > 0) {
            EffectUtils.showTips("有人掉线啦，请耐心等待一下。",5);
            return;
        }

        this.hide();

        var type: number;

        switch (e.currentTarget) {
            case this.btn_wan:
                type = 1;
                break;
            case this.btn_tiao:
                type = 2;
                break;
            case this.btn_tong:
                type = 3;
                break;
        }

        game.isQue = false;

        SocketManager.getInstance().getGameConn().send(15, {
            "args": {
                "action": 9999,
                "pai": type
            }
        });
    }

    private recommend() {
        var type: CardType = gamePai.getCtShortest();
        switch (type) {
            case CardType.tiao:
                this.setTween(this.btn_tiao);
                break;
            case CardType.tong:
                this.setTween(this.btn_tong);
                break;
            case CardType.wan:
                this.setTween(this.btn_wan);
                break;
        }
        var types: CardType[] = [CardType.tong, CardType.tiao, CardType.wan];

        for (var i: number = 0; i < types.length; i++) {
            if (types[i] != type && gamePai.getCtLength(type) == gamePai.getCtLength(types[i])) {
                switch (types[i]) {
                    case CardType.tiao:
                        this.setTween(this.btn_tiao);
                        break;
                    case CardType.tong:
                        this.setTween(this.btn_tong);
                        break;
                    case CardType.wan:
                        this.setTween(this.btn_wan);
                        break;
                }
            }
        }
    }

    private setTween(target: any) {
        target.alpha = 1;
        egret.Tween.get(target, {loop: true}).to({alpha: 0.5}, 300).to({alpha: 1}, 300);
    }

    show() {
        super.show();

        this.x = acekit.width >> 1;
        this.y = acekit.height - 220;
        GSController.i.gsView.frontUIContainer.addChild(this);

        this.clean();
        this.recommend();
    }

    hide() {
        super.hide();

        this.clean();

        if (GSController.i.gsView.frontUIContainer.contains(this)) {
            GSController.i.gsView.frontUIContainer.removeChild(this);
        }
    }

    clean() {
        egret.Tween.removeTweens(this.btn_tiao);
        egret.Tween.removeTweens(this.btn_tong);
        egret.Tween.removeTweens(this.btn_wan);

        this.btn_tong.alpha = this.btn_tiao.alpha = this.btn_wan.alpha = 1;
    }
}