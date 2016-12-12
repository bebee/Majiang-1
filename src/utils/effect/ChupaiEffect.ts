/**
 * ChupaiEffect
 * @Author Ace.c
 * @Create 2016-11-28 16:12
 */
class ChupaiEffect {

    private static group: eui.Group;

    private static dir: number;

    private static pai: any;

    private static isTweening: boolean = false;

    private static isDisappear: boolean = false;

    static play(dir: number, pai: any) {

        if (!this.group) this.init();

        this.dir = dir;
        this.pai = pai;

        this.isDisappear = false;
        this.isTweening = true;

        this.group.removeChildren();

        var card: CardView = CardView.create(1, 1, pai);
        card.scaleX = 1.2;
        card.scaleY = 1.2;
        this.group.addChild(card);

        this.setCardPosition(card, dir);

        var cardCopy: CardView = CardView.copy(card);
        this.group.addChild(cardCopy);

        var _this = this;
        egret.Tween.get(cardCopy).to({scaleX: 1.8, scaleY: 1.8, alpha: 0}, 500).wait(500).call(function () {
            if (_this.group.contains(this)) {
                _this.group.removeChild(this);
            }

            _this.isTweening = false;
            _this.stop();
        });
    }

    static stop(isDisappear?: boolean) {
        if (isDisappear)this.isDisappear = isDisappear;

        if (this.isDisappear && !this.isTweening && this.group && this.group.numElements) {
            var card: CardView = <CardView>this.group.getElementAt(0);
            if (!card) {
                this.group.removeChildren();
                return;
            }

            var _this = this;
            egret.Tween.get(card).to({alpha: 0}, 300).call(function () {
                if (_this.group.contains(card)) {
                    _this.group.removeChild(card);
                }
            });
        }
    }

    private static init() {
        this.group = new eui.Group();
        this.group.width = acekit.width;
        this.group.height = acekit.height;
        LayerManager.gameLayer().effectLayer.addChildAt(this.group, 0);
    }

    /**
     * 设置卡牌的位置
     * @param card
     * @param dir
     */
    private static setCardPosition(card: CardView, dir: number) {
        switch (dir) {
            case 1:
                card.x = acekit.stage.stageWidth / 2 - 2;
                card.y = acekit.stage.stageHeight - 200;
                break;
            case 2:
                card.x = acekit.stage.stageWidth - 300;
                card.y = acekit.stage.stageHeight / 2 - 20;
                break;
            case 3:
                card.x = acekit.stage.stageWidth / 2 - 2;
                card.y = 180;
                break;
            case 4:
                card.x = 300;
                card.y = acekit.stage.stageHeight / 2 - 20;
                break;
        }
    }
}