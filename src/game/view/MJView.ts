/**
 * Created by Administrator on 2016/11/1.
 */
class MJView extends egret.DisplayObjectContainer {

    dir: number;

    handCon: egret.DisplayObjectContainer;
    poolCon: egret.DisplayObjectContainer;
    //最后的添加的池牌
    lastPoolCard: CardView;

    constructor(dir: number) {

        super();

        this.dir = dir;

        this.initView();

    }

    initView() {

        this.handCon = new egret.DisplayObjectContainer;

        this.poolCon = new egret.DisplayObjectContainer;

        this.addChild(this.handCon);

        this.addChild(this.poolCon);
    }


    getHandCard(index: number): CardView {

        for (var i: number = 0; i < this.handCon.numChildren; i++) {

            var card: CardView = <CardView> this.handCon.getChildAt(i);

            if (card.index == index) return card;

        }

    }

    //根据方位
    addHandCard(c: CardView) {

        (this.dir == 2) && this.handCon.addChildAt(c, 0) || this.handCon.addChild(c);

    }

    addPoolCard(c: CardView) {

        this.lastPoolCard = c;

        (this.dir == 1 || this.dir == 2) && this.poolCon.addChildAt(c, 0) || this.poolCon.addChild(c);

    }

    //移除最后加载的牌
    removePoolCard() {

        this.poolCon.removeChild(this.lastPoolCard);

    }

    //移除所有手牌
    removeAllHandCard() {

        while (this.handCon.numChildren) {

            var cardView: CardView = <CardView> this.handCon.removeChildAt(0);

            CardView.returnCardView(cardView);

        }

    }

    removeAllPoolCard() {

        while (this.poolCon.numChildren) {

            var cardView: CardView = <CardView> this.poolCon.removeChildAt(0);

            CardView.returnCardView(cardView);

        }
    }

    //移除立牌
    removeIndexPai() {

        for (var i: number = this.handCon.numChildren - 1; i >= 0; i--) {

            var cardView: CardView = <CardView> this.handCon.getChildAt(i);

            if (cardView.index > -1) {

                this.handCon.removeChild(cardView);

                CardView.returnCardView(cardView);

            }

        }
    }

    clear() {

        this.lastPoolCard = null;
        this.removeAllHandCard();
        this.removeAllPoolCard();

    }
}