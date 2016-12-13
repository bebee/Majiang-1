/**
 * Created by Administrator on 2016/11/8.
 */
class PersonItem extends BaseGameSprite {

    spacing = 105;

    private headGroup: eui.Group;
    private lab_nick: eui.Label;
    private lab_uid: eui.Label;
    private lab_description: eui.Label;
    private paiGroup: eui.Group;
    private lab_fan: eui.Label;
    private lab_hu: eui.Label;
    private lab_gang: eui.Label;

    headIcon: HeadIconView;
    cardViews: CardView[];
    pos: egret.Point;

    constructor() {
        super();

        this.skinName = "ResultItemViewSkin";

        this.cardViews = [];
    }

    childrenCreated() {
        super.childrenCreated();

        this.pos = new egret.Point();

        this.headIcon = new HeadIconView;
        this.headIcon.x = 40;
        this.headIcon.y = 40;
        this.headGroup.addChild(this.headIcon);
    }

    // //添加胡牌 1:点炮 2:自摸
    // addHuPai(pai: any) {
    //     var cardView: CardView = CardView.create(1, 4, pai);
    //     this.paiGroup.addChild(cardView);
    //
    //     this.cardViews.push(cardView);
    // }

    update(obj: any) {

        this.data = obj;

        this.lab_uid.text = "" + this.data.uid;
        this.lab_nick.text = "" + this.data.nick;
        this.lab_description.text = "" + this.getDescription();
        this.lab_fan.text = "合计:" + (this.data.fan ? this.data.fan : 0) + "番";
        this.lab_hu.text = "    胡:" + this.data.cur;
        this.lab_gang.text = "    杠:" + this.data.gang;

        this.showDown();
        this.showUp();
    }

    //显示手牌
    showUp() {
        for (var i: number = 0; i < this.data.left.length; i++) {
            var pai = this.data.left[i];
            var o = GSConfig.getPosByIndex(1, 4, i);
            this.addCardView(pai, this.pos.x + o.x, this.pos.y);
        }

        //判断手牌长度进行间隔错位
        if (GSConfig.handLens[this.data.left.length]) {
            var cardView: CardView = <CardView>this.paiGroup.getElementAt(this.paiGroup.numElements - 1);
            cardView.posView(cardView.pos.x + this.spacing, this.pos.y);
        }
    }

    //显示门前牌
    showDown() {
        var checks: any[] = [1, 2, 24, 25];
        for (var i: number = 0; i < checks.length; i++) {
            var type: number = checks[i];
            var group: any[] = this.data[type];
            if (group && group.length) {
                switch (type) {
                    case 1://吃
                    case 2://碰
                        for (var j: number = 0; j < group.length; j++) {
                            var pais = group[j];
                            for (var k: number = 0; k < pais.length; k++) {
                                var o = GSConfig.getPosByIndex(1, 4, k);
                                this.addCardView(pais[k], this.pos.x + o.x, this.pos.y);
                            }
                            this.pos.x += this.spacing;
                        }
                        break;
                    case 24://暗杠
                        for (var j: number = 0; j < group.length; j++) {
                            var pais = group[j];
                            var centerO: any;
                            for (var k: number = 0; k < 3; k++) {
                                var o = GSConfig.getPosByIndex(1, 4, k);
                                if (k == 1) {
                                    centerO = o;
                                }

                                this.addCardView(pais[k], this.pos.x + o.x, this.pos.y, null, 0.55, 2);
                            }

                            this.addCardView(pais[0], this.pos.x + centerO.x, this.pos.y - 10);

                            this.pos.x += this.spacing;
                        }
                        break;
                    case 25://明杠
                        for (var j: number = 0; j < group.length; j++) {
                            var pais = group[j];
                            var centerO: any;
                            for (var k: number = 0; k < 3; k++) {
                                var o = GSConfig.getPosByIndex(1, 4, k);
                                if (k == 1) {
                                    centerO = o;
                                }

                                this.addCardView(pais[k], this.pos.x + o.x, this.pos.y);
                            }

                            this.addCardView(pais[0], this.pos.x + centerO.x, this.pos.y - 10);

                            this.pos.x += this.spacing;
                        }
                        break;
                }
            }
        }
    }

    private addCardView(pai, x, y, count?, scale?, style?) {
        var card = CardView.create(1, style ? style : 4, pai, count ? count : 1);
        card.posView(x, y + 20);
        scale && (card.scaleX = card.scaleY = scale);
        this.paiGroup.addChild(card);

        this.cardViews.push(card);
    }

    clear() {
        while (this.cardViews.length) {
            var cardView: CardView = <CardView>this.cardViews.shift();
            this.paiGroup.removeChild(cardView);

            CardView.returnCardView(cardView);
        }
    }

    private getDescription() {
        var ting_desc: string = "";
        if (GSData.i.hasTingRule) {
            ting_desc = (this.data.ting == 1 ? "听牌 " : "未听牌 ");
        }

        var hu_types: any[] = this.data.hu_type;
        var types: any[] = [];

        var hu_desc: string = "";
        for (var i: number = 0; i < hu_types.length; i++) {
            types = hu_types[i];
            if (types.length < 2 || typeof types[0] == "number" || typeof types[1] == "object") {
                continue;
            }
            hu_desc += "" + GSConfig.huTypeMap[types[0]];
            hu_desc += "(";
            for (var j: number = 1; j < types.length; j++) {
                if (types[j].length) {
                    hu_desc += GSConfig.huTypeMap[types[j][0]] + "x" + types[j][1];
                }
                else {
                    hu_desc += GSConfig.huTypeMap[types[j]];
                }
                if (j != types.length - 1) {
                    hu_desc += " ";
                }
            }
            hu_desc += ") ";
        }
        return ting_desc + hu_desc;
    }
}