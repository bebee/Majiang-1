/**
 * QueView
 * @Author Ace.c
 * @Create 2016-12-01 13:45
 */
class QueView extends BaseSprite {

    private btn_wan: eui.Button;
    private btn_tiao: eui.Button;
    private btn_tong: eui.Button;
    private tipGroup: eui.Group;

    private queBtn: eui.Button;

    public constructor() {
        super();

        this.skinName = "QueViewSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.anchorOffsetX = this.width >> 1;
        this.x = acekit.width >> 1;
        this.y = acekit.height / 2 + 80;

        var arr: eui.Button[] = [this.btn_wan, this.btn_tiao, this.btn_tong];
        var btn: eui.Button;
        for (var i: number = 0; i < arr.length; i++) {
            btn = arr[i];
            btn.anchorOffsetX = btn.width >> 1;
            btn.anchorOffsetY = btn.height >> 1;
            btn.x = 35 + i * 100;
            btn.y = 35;
        }

        this.btn_wan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_tiao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_tong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {

        if (game.roomPlayerOffline > 0) {
            EffectUtils.showTips("有人掉线啦，请耐心等待一下。", 5);
            return;
        }

        game.isQue = false;

        this.queBtn = e.currentTarget;

        this.selected();
    }

    private selected() {
        this.tipGroup.visible = false;

        var arr: eui.Button[] = [this.btn_wan, this.btn_tiao, this.btn_tong];
        var btn: eui.Button;
        for (var i: number = 0; i < arr.length; i++) {
            btn = arr[i];

            egret.Tween.removeTweens(btn);

            if (btn != this.queBtn) {
                egret.Tween.get(btn).to({alpha: 0}, 300);
            }
            else {
                egret.Tween.get(btn)
                    .wait(1000)
                    .to({x: 135, scaleX: 1.5, scaleY: 1.5}, 500)
                    .to({scaleX: 0.6, scaleY: 0.6}, 300)
                    .wait(300)
                    .call(this.selectedComplete, this);
            }
        }
    }

    private selectedComplete() {

        this.hide();

        var type: CardType = CardType.unknow;

        switch (this.queBtn) {
            case this.btn_wan:
                type = CardType.wan;
                break;
            case this.btn_tiao:
                type = CardType.tiao;
                break;
            case this.btn_tong:
                type = CardType.tong;
                break;
        }

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
                this.playRecommend(this.btn_tiao);
                break;
            case CardType.tong:
                this.playRecommend(this.btn_tong);
                break;
            case CardType.wan:
                this.playRecommend(this.btn_wan);
                break;
        }

        var types: CardType[] = [CardType.tong, CardType.tiao, CardType.wan];

        for (var i: number = 0; i < types.length; i++) {
            if (types[i] != type && gamePai.getCtLength(type) == gamePai.getCtLength(types[i])) {
                switch (types[i]) {
                    case CardType.tiao:
                        this.playRecommend(this.btn_tiao);
                        break;
                    case CardType.tong:
                        this.playRecommend(this.btn_tong);
                        break;
                    case CardType.wan:
                        this.playRecommend(this.btn_wan);
                        break;
                }
            }
        }
    }

    private playRecommend(target: any) {
        egret.Tween.get(target, {loop: true})
            .to({scaleX: 1.1, scaleY: 1.1}, 300)
            .to({scaleX: 1.0, scaleY: 1.0}, 300);
    }

    show() {
        super.show();

        this.clean();
        this.recommend();

        GSController.i.gsView.updateState();

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
        var arr: eui.Button[] = [this.btn_wan, this.btn_tiao, this.btn_tong];
        var btn: eui.Button;
        for (var i: number = 0; i < arr.length; i++) {
            btn = arr[i];

            egret.Tween.removeTweens(btn);

            btn.scaleX = btn.scaleY = 1;
            btn.alpha = 1;
            btn.x = 35 + i * 100;
            btn.y = 35;
        }

        this.tipGroup.visible = true;
    }
}