/**
 * Created by Administrator on 2016/10/21.
 */
class CardView extends egret.DisplayObjectContainer {

    static pool: CardView[] = [];

    /**
     * 创建一张牌
     * @param dir 方位 1 2 3 4 自己开始逆时针
     * @param style 样式 1正面 2背面 3躺
     * @param pai
     * @param count
     * @returns {CardView|CardView}
     */
    static create(dir: number, style: number, pai: any = null, count = 1) {

        var cardView = CardView.getCardView();
        cardView.dir = dir;
        cardView.style = style;
        cardView.pai = pai;
        cardView.count = count;
        cardView.reDraw();

        return cardView;

    }

    /**
     * 复制一张牌
     * @param card
     * @returns {CardView|CardView}
     */
    static copy(card: CardView) {
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

    static createThreeGroup(dir: number, style: number, pais: any[] = null) {

        if (pais == null) pais = [];

        var group = [];

        for (var i: number = 0; i < 3; i++) {

            var o = GSConfig.getPosByIndex(dir, style, i);

            var cardView = CardView.create(dir, style, pais[i]);

            cardView.posView(o.x, o.y);


            group.push(cardView);
        }

        return group;

    }

    static getCardView() {

        if (CardView.pool.length) {

            return CardView.pool.shift();
        }

        var cardView = new CardView();
        cardView.reset();
        return cardView;
    }

    static returnCardView(card: CardView) {

        card.reset();

        CardView.pool.push(card);
    }


    //52,76

    dir: number;

    style: number;

    pai: any;

    pos: egret.Point;

    /////////////////////

    bg: egret.Bitmap;

    top: egret.DisplayObjectContainer;

    icon: egret.Bitmap;

    countText: egret.TextField;

    d: egret.Shape;

    pRule: Rule;

    index: number;

    count: number;

    hotArea: eui.Rect;

    //iconBG:eui.Rect;

    constructor() {

        super();

        //this.entity = entity;

        this.bg = new egret.Bitmap;
        this.addChild(this.bg);

        /*        this.iconBG = new eui.Rect(2,2,0x6aacc1);
         this.iconBG.touchEnabled = false;
         this.iconBG.alpha = .5;
         this.addChild(this.iconBG);*/

        this.top = new egret.DisplayObjectContainer();

        this.icon = new egret.Bitmap;


        this.countText = new egret.TextField;

        this.top.addChild(this.icon);
        this.top.addChild(this.countText);

        this.countText.bold = true;
        this.countText.background = true;
        this.countText.backgroundColor = 0;
        this.countText.textColor = 0x8ebd49;
        //this.countText.x = 24;
        this.countText.y = 70;

        this.addChild(this.top);

        this.pos = new egret.Point;

        //
        /*        this.hotArea = new egret.Shape;
         this.hotArea.graphics.beginFill(0, 0);
         this.hotArea.graphics.drawRect(0, 0, 64, 120);
         this.addChild(this.hotArea);
         this.hotArea.anchorOffsetX = GSConfig.posRule[1][1].bgosX;
         this.hotArea.anchorOffsetY = GSConfig.posRule[1][1].bgosY;*/

        this.hotArea = new eui.Rect();
        this.hotArea.width = 64;
        this.hotArea.height = 120;
        this.hotArea.alpha = 0;
        this.hotArea.touchEnabled = false;
        this.addChild(this.hotArea);
        this.hotArea.anchorOffsetX = GSConfig.posRule[1][1].bgosX;
        this.hotArea.anchorOffsetY = GSConfig.posRule[1][1].bgosY;

        this.unactivate();

    }

    activate() {
        this.touchEnabled = true;
        this.hotArea.visible = true;
    }

    unactivate() {
        this.touchEnabled = false;
        this.hotArea.visible = false;
        this.enabled = true;
    }

    set enabled(value) {
        this.bg.alpha = value ? 1 : .7;
    }

    //移出
    moveUp(tween: boolean = true) {
        if (tween)egret.Tween.get(this).to({y: this.pos.y - GSConfig.moveUpDis}, 200);
        else this.y = this.pos.y - GSConfig.moveUpDis;
    }

    //移回
    moveDown(tween: boolean = true) {
        if (tween)egret.Tween.get(this).to({y: this.pos.y}, 200);
        else this.y = this.pos.y;
    }

    //重置位置
    resetPos() {
        this.x = this.pos.x;
        this.y = this.pos.y;
    }

    //添加点击
    addClick(func: Function, thisObj: any) {
        if (!this.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, func, thisObj);
        }
    }

    //设置坐标
    posView(x: number, y: number) {
        this.pos.x = x;
        this.pos.y = y;

        this.x = x;
        this.y = y;
    }

    //改变样式
    changeStyle(style: number, draw: boolean = true) {
        this.style = style;
        this.count = 1;
        draw && this.reDraw();
    }

    //改变数据
    changePai(pai: any, draw: boolean = true) {
        this.pai = pai;
        this.count = 1;
        draw && this.reDraw();
    }

    showD() {
        this.d = new egret.Shape;
        this.d.graphics.beginFill(0xff0000);
        this.d.graphics.drawRect(0, 0, 10, 10);
        this.addChild(this.d);
    }

    //重置
    reset() {
        this.posView(0, 0);
        this.count = 1;
        this.index = -1;
        this.scaleX = this.scaleY = 1;
        this.visible = true;
        this.unactivate();
        egret.Tween.removeTweens(this);
    }

    //重绘
    reDraw() {
        //var _style  = (this.style == 4 ? 3 : this.style);

        //var _dir = (this.dir == 4 ? 2 : this.dir);

        var type = this.dir * 10 + this.style;

        switch (type) {
            case 11:
            case 12:
            case 13:
                break;
            case 14:
                type = 33;
                break;
            case 15:
                type = 12;
                break;
            case 24:
                type = 23;
                break;
            case 34:
                type = 33;
                break;
            case 41:
                type = 21;
                break;
            case 42:
                type = 22;
                break;
            case 43:
                type = 23;
                break;
            case 44:
                type = 23;
                break;
        }

        var bg_res = "M_" + type;

        this.bg.texture = GameRes.getCard(bg_res);

        if (this.count > 1) {
            this.countText.text = "x" + this.count;
        } else {
            this.countText.text = "";
        }

        if (this.style == 2 || this.style == 5) {
            this.icon.texture = null;
            this.countText.text = "";
        } else {
            if (this.pai != null) {
                var up_res = "Z_" + (this.pai.type * 10 + this.pai.number);
                this.icon.texture = GameRes.getCard(up_res);

            } else {
                this.countText.text = "";
                this.icon.texture = null;
            }
        }

        ////////////////////////////////////////

        this.pRule = GSConfig.posRule[this.dir][this.style];

        this.bg.anchorOffsetX = this.pRule.bgosX;
        this.bg.anchorOffsetY = this.pRule.bgosY;

        this.bg.scaleX = this.pRule.bgScaleX;
        this.bg.scaleY = this.pRule.bgScaleY;

        this.top.anchorOffsetX = this.pRule.toposX;
        this.top.anchorOffsetY = this.pRule.toposY;

        this.top.rotation = this.pRule.topRot;

        this.top.scaleX = this.pRule.topScaleX;
        this.top.scaleY = this.pRule.topScaleY;
    }
}