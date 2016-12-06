/**
 * Created by Administrator on 2016/11/1.
 */
// class MJView extends egret.DisplayObjectContainer {
class MJView extends eui.Component {

    dir: number;

    handCon: egret.DisplayObjectContainer;
    poolCon: egret.DisplayObjectContainer;
    huview: HuView;
    stateImg: egret.Bitmap;
    //最后的添加的池牌
    lastPoolCard: CardView;

    constructor(dir: number) {

        super();

        this.dir = dir;

        this.initView();

    }

    initView() {

        this.handCon = new egret.DisplayObjectContainer;
        this.addChild(this.handCon);

        this.poolCon = new egret.DisplayObjectContainer;
        this.addChild(this.poolCon);

        this.huview = new HuView(this.dir);
        this.addChild(this.huview);

        // var _this = this;
        // egret.setInterval(function () {
        //     _this.huview.addCardView({type: 1, number: 1});
        // }, this, 3000);


        this.stateImg = new egret.Bitmap();
        this.addChild(this.stateImg);

        this.updateState();
    }

    pushHu(pai: any) {
        this.huview.addCardView(pai);
    }

    updateState() {

        if (this.dir == DirType.bottom) {
            this.stateImg.visible = false;
            return;
        }

        this.stateImg.visible = true;

        switch (PublicVal.state) {
            case StateType.changeThree:
                this.stateImg.texture = RES.getRes("img_txt_xuanpaizhong");
                break;
            case StateType.missing:
                this.stateImg.texture = RES.getRes("img_txt_dingquezhong");
                break;
            default:
                this.stateImg.visible = false;
                break;
        }

        switch (this.dir) {
            case DirType.top:
                this.stateImg.x = (game.stage.stageWidth - this.stateImg.width ) / 2;
                this.stateImg.y = 100;
                break;
            case DirType.left:
                this.stateImg.x = 160;
                this.stateImg.y = (game.stage.stageHeight - this.stateImg.height ) / 2;
                break;
            case DirType.right:
                this.stateImg.x = game.stage.stageWidth - 160 - this.stateImg.width;
                this.stateImg.y = (game.stage.stageHeight - this.stateImg.height ) / 2;
                break;
        }
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