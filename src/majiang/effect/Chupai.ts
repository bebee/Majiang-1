/**
 * Chupai
 * @Author Ace.c
 * @Create 2016-11-28 15:20
 */
class Chupai {

    private static group: eui.Group;

    private static dir: number;

    private static pai: any;

    private static isTweening: boolean = false;

    private static isDisappear: boolean = false;

    static play(dir: number, pai: any) {

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
            _this.stop();
        }

        var card: CardView = CardView.create(1, 1, pai);
        card.scaleX = 1.2;
        card.scaleY = 1.2;
        card.x = getPos(dir).x;
        card.y = getPos(dir).y;
        this.group.addChild(card);

        var cardCopy: CardView = GameCopy.copyPai(card);
        this.group.addChild(cardCopy);

        this.isDisappear = false;
        this.isTweening = true;

        egret.Tween.get(cardCopy)
            .to({scaleX: 1.8, scaleY: 1.8, alpha: 0}, 500)
            .wait(500)
            .call(moveComplete, cardCopy);
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
}