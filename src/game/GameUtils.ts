/**
 * GameUtils
 * @Author Ace.c
 * @Create 2016-11-22 10:49
 */
class GameUtils {

    private static group: eui.Group;

    private static dir: number;

    private static pai: any;

    static isTweening: boolean = false;

    static isDisappear: boolean = false;

    public constructor() {
    }

    /**
     * 复制一张牌
     * @param card
     * @returns {CardView|CardView}
     */
    static copyPai(card: CardView) {

        var cardView = CardView.getCardView();
        cardView.alpha = card.alpha;
        cardView.scaleX = card.scaleX;
        cardView.scaleY = card.scaleY;
        cardView.x = card.x;
        cardView.y = card.y;
        cardView.dir = card.dir;
        cardView.style = card.style;
        cardView.pai = card.pai;
        cardView.count = card.count;
        cardView.reDraw();

        return cardView;
    }

    static appear(dir: number, pai: any) {

        this.dir = dir;
        this.pai = pai;

        if (!this.group) {
            this.group = new eui.Group();
            GameLayerManager.gameLayer().effectLayer.addChildAt(this.group, 0);
            this.group.width = this.group.stage.stageWidth;
            this.group.height = this.group.stage.stageHeight;
        }

        this.group.removeChildren();

        var _this = this;

        function getPos(dir) {
            var pos: egret.Point = new egret.Point();
            switch (dir) {
                case 1:
                    pos.x = _this.group.stage.stageWidth / 2 - 2;
                    pos.y = _this.group.stage.stageHeight - 200;
                    break;
                case 2:
                    pos.x = _this.group.stage.stageWidth - 300;
                    pos.y = _this.group.stage.stageHeight / 2 - 20;
                    break;
                case 3:
                    pos.x = _this.group.stage.stageWidth / 2 - 2;
                    pos.y = 180;
                    break;
                case 4:
                    pos.x = 300;
                    pos.y = _this.group.stage.stageHeight / 2 - 20;
                    break;
            }
            return pos;
        }

        function moveComplete() {
            if (_this.group.contains(this)) {
                _this.group.removeChild(this);
            }

            _this.isTweening = false;
            _this.disappear();
        }

        var card: CardView = CardView.create(1, 1, pai);
        card.scaleX = 1.2;
        card.scaleY = 1.2;
        card.x = getPos(dir).x;
        card.y = getPos(dir).y;
        this.group.addChild(card);

        var cardCopy: CardView = this.copyPai(card);
        this.group.addChild(cardCopy);

        this.isDisappear = false;
        this.isTweening = true;

        egret.Tween.get(cardCopy)
            .to({scaleX: 1.8, scaleY: 1.8, alpha: 0}, 500)
            .wait(500)
            .call(moveComplete, cardCopy);
    }

    static disappear() {
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
}