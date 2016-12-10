/**
 * Created by Administrator on 2016/11/8.
 */
class PersonItem extends egret.DisplayObjectContainer {
    headIcon: GSHeadIcon;
    pos: number;

    //牌开始的位置
    so = {x: 150, y: 46};
    //胡字位置
    huPos = {x: 838, y: 40};

    dis = 105;

    hupaiDis: number = 44;
    //文本的偏移位置
    o = {
        1: {ox: 127, oy: 0, w: 130},
        2: {ox: 200, oy: 0, w: 130},
        3: {ox: 451, oy: 0, w: 130},
        4: {ox: 652, oy: 0, w: 130},
        5: {ox: 703, oy: 30, w: 130},
        6: {ox: 703, oy: 50, w: 130}
    };
    texts: egret.TextField[];

    currPos: egret.Point;

    cardViews: CardView[];

    hulogo: FuncEffectView;

    diaoPaoLogo: egret.Bitmap;


    constructor() {
        super();
        this.cardViews = [];
        this.init();
        this.initView();
    }

    init() {

        this.currPos = new egret.Point(this.so.x, this.so.y);

    }

    clear() {

        this.currPos.x = this.so.x;
        this.currPos.y = this.so.y;

        while (this.cardViews.length) {

            var cardView: CardView = <CardView>this.cardViews.shift();

            this.removeChild(cardView);

            CardView.returnCardView(cardView);
        }

    }

    initView() {

        this.headIcon = new GSHeadIcon;
        this.headIcon.x = 83;
        this.headIcon.y = 39;

        this.addChild(this.headIcon);

        this.texts = [];
        for (var i: number = 1; i <= 6; i++) {
            var t = new egret.TextField();
            t.size = 18;
            t.x = this.o[i].ox;
            t.y = this.o[i].oy;
            t.width = this.o[i].w;
            this.addChild(t);
            this.texts[i] = t;
        }

        this.texts[3].width = 340;
        this.texts[3].textAlign = egret.HorizontalAlign.CENTER;
        this.texts[3].anchorOffsetX = this.texts[3].width >> 1;

        this.hulogo = new FuncEffectView;
        this.hulogo.x = this.huPos.x;
        this.hulogo.y = this.huPos.y;
        this.addChild(this.hulogo);

        this.diaoPaoLogo = new egret.Bitmap(GameRes.getUI("JS_fangpao"));

        this.diaoPaoLogo.anchorOffsetX = this.diaoPaoLogo.width >> 1;
        this.diaoPaoLogo.anchorOffsetY = this.diaoPaoLogo.height >> 1;

        this.diaoPaoLogo.x = this.hulogo.x;
        this.diaoPaoLogo.y = this.hulogo.y;

        this.addChild(this.diaoPaoLogo);
    }


    //0:空 1:胡牌 2:点炮
    updateHuLogo(type: number) {

        switch (type) {

            case 0:
                this.diaoPaoLogo.visible = false;
                this.hulogo.reset();
                break;
            case 1:
                this.diaoPaoLogo.visible = false;
                this.hulogo.reset();
                this.hulogo.play(GameRes.getUI("JS_hulogo"), false);
                //this.hulogo.texture = GameRes.getUI("JS_hulogo");
                //this.hulogo.anchorOffsetX = this.hulogo.width >> 1;
                //this.hulogo.anchorOffsetY = this.hulogo.height >> 1;
                break;
            case 2:
                this.hulogo.reset();
                this.diaoPaoLogo.visible = true;

                /*this.hulogo.texture = GameRes.getUI("JS_fangpao");
                 this.hulogo.anchorOffsetX = this.hulogo.width >> 1;
                 this.hulogo.anchorOffsetY = this.hulogo.height >> 1;*/
                break;
        }
    }


    updatePai(obj: any) {

        var hu_type = obj.hu_type;

        var hu_info: string = "";

        for (var k: number = 0; k < hu_type.length; k++) {

            var type = hu_type[k];

            hu_info += GSConfig.huTypeMap[type] + " "

        }

        var ting: string = "";

        if (GSData.i.hasTingRule) {

            ting = (obj.ting == 1 ? "听牌 " : "未听牌 ");
        }

        this.texts[1].text = obj.uid;
        this.texts[2].text = obj.nick;
        //this.texts[2].text = (obj.ting == 0 ? "未听牌 " : "听牌 ") + hu_info;
        this.texts[3].text = ting + hu_info;
        this.texts[4].text = "合计: " + (obj.fan ? obj.fan : 0) + "番";
        this.texts[5].text = "胡: " + obj.cur;
        this.texts[6].text = "杠: " + obj.gang;

        //判断牌型 可以排序
        this.switchPai(1, obj[1]);
        this.switchPai(2, obj[2]);
        this.switchPai(22, obj[22]);
        this.switchPai(24, obj[24]);
        this.switchPai(25, obj[25]);
        this.switchPai(26, obj[26]);
        this.showLeft(obj.left);
    }

    hupaiPos: egret.Point = new egret.Point;

    //显示手牌
    showLeft(pais: any[]) {

        for (var i: number = 0; i < pais.length; i++) {

            var pai = pais[i];

            var cardView: CardView = CardView.create(1, 4, pai);

            var o = GSConfig.getPosByIndex(1, 4, i);

            cardView.posView(this.currPos.x + o.x, this.currPos.y);

            this.addChild(cardView);

            this.cardViews.push(cardView);
        }
        //判断手牌长度进行间隔错位
        if (GSConfig.handLens[pais.length]) {


            cardView.posView(cardView.pos.x + 10, this.currPos.y);
        }

        /*this.hupaiPos.x = cardView.pos.x + this.hupaiDis;
         this.hupaiPos.y = this.currPos.y;*/
    }

    //添加胡牌 1:点炮 2:自摸
    addHuPai(pai: any) {

        var cardView: CardView = CardView.create(1, 4, pai);

        cardView.posView(this.hupaiPos.x, this.hupaiPos.y);

        this.addChild(cardView);

        this.cardViews.push(cardView);

    }

    switchPai(action: number, group: any[]) {
        if (!group) return;


        switch (action) {

            case 1://吃
            case 2://碰

                for (var i: number = 0; i < group.length; i++) {

                    var pais = group[i];

                    for (var j: number = 0; j < pais.length; j++) {

                        var pai = pais[j];

                        var cardView = CardView.create(1, 4, pai);

                        var o = GSConfig.getPosByIndex(1, 4, j);

                        cardView.posView(this.currPos.x + o.x, this.currPos.y);

                        this.addChild(cardView);

                        this.cardViews.push(cardView);
                    }

                    this.currPos.x += this.dis;
                }

                break;
            case 22://幺九杠

                for (var i: number = 0; i < group.length; i++) {

                    var pais = group[i].slice(-3);

                    group[i].length -= 3;

                    var oggPais = group[i];

                    var ever = [1, 1, 1];
                    //补蛋
                    for (var oi: number = 0; oi < oggPais.length; oi++) {

                        ever[oggPais[oi].type - 1]++;

                    }
                    //最后三张是牌型
                    for (var j: number = 0; j < pais.length; j++) {

                        var pai = pais[j];

                        var cardView = CardView.create(1, 4, pai, ever[j]);

                        var o = GSConfig.getPosByIndex(1, 4, j);

                        cardView.posView(this.currPos.x + o.x, this.currPos.y);
                        this.addChild(cardView);
                        this.cardViews.push(cardView);
                    }

                    this.currPos.x += this.dis;
                }

                break;
            case 24://暗杠

                for (var i: number = 0; i < group.length; i++) {

                    var pais = group[i];

                    var centerO: any;

                    for (var j: number = 0; j < 3; j++) {

                        var pai = pais[j];

                        var cardView = CardView.create(1, 2, pai);

                        cardView.scaleX = cardView.scaleY = 0.6;

                        var o = GSConfig.getPosByIndex(1, 4, j);

                        if (j == 1) centerO = o;

                        cardView.posView(this.currPos.x + o.x, this.currPos.y);
                        this.addChild(cardView);
                        this.cardViews.push(cardView);
                    }
                    cardView = CardView.create(1, 4, pais[0]);

                    cardView.posView(this.currPos.x + centerO.x, this.currPos.y - 10);

                    this.addChild(cardView);
                    this.cardViews.push(cardView);

                    this.currPos.x += this.dis;
                }
                break;
            case 25://明杠
                for (var i: number = 0; i < group.length; i++) {

                    var pais = group[i];

                    var centerO: any;

                    for (var j: number = 0; j < 3; j++) {

                        var pai = pais[j];

                        var cardView = CardView.create(1, 4, pai);

                        //cardView.scaleX = cardView.scaleY = 0.6;

                        var o = GSConfig.getPosByIndex(1, 4, j);

                        if (j == 1) centerO = o;

                        cardView.posView(this.currPos.x + o.x, this.currPos.y);
                        this.addChild(cardView);
                        this.cardViews.push(cardView);
                    }
                    cardView = CardView.create(1, 4, pais[0]);

                    cardView.posView(this.currPos.x + centerO.x, this.currPos.y - 10);

                    this.addChild(cardView);
                    this.cardViews.push(cardView);

                    this.currPos.x += this.dis;
                }
                break;
            case 26://中发白杠

                var pais: any = group.slice(-3);

                group.length -= 3;

                var ever = [1, 1, 1];

                for (var i: number = 0; i < group.length; i++) {

                    ever[group[i].number - 1]++;

                }
                //最后三张是牌型
                for (var i: number = 0; i < pais.length; i++) {

                    var pai = pais[i];

                    var cardView = CardView.create(1, 4, pai, ever[i]);

                    var o = GSConfig.getPosByIndex(1, 4, i);

                    cardView.posView(this.currPos.x + o.x, this.currPos.y);

                    this.addChild(cardView);

                    this.cardViews.push(cardView);
                }
                this.currPos.x += this.dis;

                break;
        }
    }
}