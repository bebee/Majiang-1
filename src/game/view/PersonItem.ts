/**
 * Created by Administrator on 2016/11/8.
 */
class PersonItem extends BaseGameSprite {

    dis = 105;

    private headGroup: eui.Group;
    private lab_nick: eui.Label;
    private lab_uid: eui.Label;
    private lab_description: eui.Label;
    private paiGroup: eui.Group;
    private lab_fan: eui.Label;
    private lab_hu: eui.Label;
    private lab_gang: eui.Label;

    headIcon: GSHeadIcon;
    cardViews: CardView[];
    currPos: egret.Point;

    constructor() {
        super();

        this.skinName = "ResultItemViewSkin";

        this.cardViews = [];
    }

    childrenCreated() {
        super.childrenCreated();

        this.currPos = new egret.Point();

        this.headIcon = new GSHeadIcon;
        this.headGroup.addChildAt(this.headIcon, 0);
    }

    update(obj: any) {

        this.lab_uid.text = "" + obj.uid;
        this.lab_nick.text = "" + obj.nick;
        this.lab_description.text = "" + this.getDescription(obj);
        this.lab_fan.text = "合计:" + (obj.fan ? obj.fan : 0) + "番";
        this.lab_hu.text = "    胡:" + obj.cur;
        this.lab_gang.text = "    杠:" + obj.gang;

        //判断牌型 可以排序
        this.showDown(2, obj[2]);
        this.showDown(24, obj[24]);
        this.showDown(25, obj[25]);

        this.showUp(obj.left);
    }

    private getDescription(obj: any) {
        var ting_desc: string = "";
        if (GSData.i.hasTingRule) {
            ting_desc = (obj.ting == 1 ? "听牌 " : "未听牌 ");
        }

        var hu_types: any[] = obj.hu_type;
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

    //显示手牌
    showUp(pais: any[]) {
        for (var i: number = 0; i < pais.length; i++) {
            var pai = pais[i];
            var cardView: CardView = CardView.create(1, 4, pai);
            var o = GSConfig.getPosByIndex(1, 4, i);

            cardView.posView(this.currPos.x + o.x, this.currPos.y);
            this.paiGroup.addChild(cardView);

            this.cardViews.push(cardView);
        }

        //判断手牌长度进行间隔错位
        if (GSConfig.handLens[pais.length]) {
            cardView.posView(cardView.pos.x + 10, this.currPos.y);
        }
    }

    //添加胡牌 1:点炮 2:自摸
    addHuPai(pai: any) {
        var cardView: CardView = CardView.create(1, 4, pai);
        this.paiGroup.addChild(cardView);

        this.cardViews.push(cardView);
    }

    showDown(action: number, group: any[]) {
        if (!group) return;
        switch (action) {
            case 1://吃
            case 2://碰
                for (var i: number = 0; i < group.length; i++) {
                    var pais = group[i];
                    for (var j: number = 0; j < pais.length; j++) {
                        var o = GSConfig.getPosByIndex(1, 4, j);
                        this.addCardView(pais[j], this.currPos.x + o.x, this.currPos.y);
                    }
                    this.currPos.x += this.dis;
                }
                break;
            case 24://暗杠
                for (var i: number = 0; i < group.length; i++) {
                    var pais = group[i];
                    var centerO: any;
                    for (var j: number = 0; j < 3; j++) {
                        var o = GSConfig.getPosByIndex(1, 4, j);
                        if (j == 1) {
                            centerO = o;
                        }

                        this.addCardView(pais[j], this.currPos.x + o.x, this.currPos.y, null, 0.55, 2);
                    }

                    this.addCardView(pais[0], this.currPos.x + centerO.x, this.currPos.y - 10);

                    this.currPos.x += this.dis;
                }
                break;
            case 25://明杠
                for (var i: number = 0; i < group.length; i++) {
                    var pais = group[i];
                    var centerO: any;
                    for (var j: number = 0; j < 3; j++) {
                        var o = GSConfig.getPosByIndex(1, 4, j);
                        if (j == 1) {
                            centerO = o;
                        }

                        this.addCardView(pais[j], this.currPos.x + o.x, this.currPos.y);
                    }

                    this.addCardView(pais[0], this.currPos.x + centerO.x, this.currPos.y - 10);

                    this.currPos.x += this.dis;
                }
                break;
        }
    }

    private addCardView(pai, x, y, count?, scale?, style?) {
        var card = CardView.create(1, style ? style : 4, pai, count ? count : 1);
        card.posView(x + 30, y + 50);
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
}