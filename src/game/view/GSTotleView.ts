/**
 * 结算界面
 */
class GSTotleView extends eui.Component
{
    /**
     * 半透的背景
     */
    private spr:egret.Sprite = new egret.Sprite();

    /**
     * 装组件的容器
     */
    private _group:eui.Group;

    /**
     * 顶上牌局结束的介绍文字
     */
    private descImg:eui.Image;

    /**
     * 游戏logo
     */
    private logoImg:eui.Image;

    /**
     * 关闭按钮
     */
    private btn_close:mui.EButton;

    /**
     * 分享按钮
     */
    private btn_fen:mui.EButton;

    /**
     * 结束时间
     */
    private endTime:eui.Label;

    /**
     * 规则
     */
    private ruleLabel:eui.Label;

    /**
     * 玩家列表
     */
    private roleList:Array<any> = [];


    /**
     * 分数列表
     * @type {Array}
     */
    private fenList:Array<any> = [];

    constructor()
    {
        super();

        this.width = GameConfig.curWidth();
        this.height = GameConfig.curHeight();

        this.addChild(this.spr);
        this.spr.graphics.clear();
        this.spr.graphics.beginFill(0x0, 0.5);
        this.spr.graphics.drawRect(0,100, GameConfig.curWidth(), GameConfig.curHeight() - 200);
    }

    createChildren()
    {
        super.createChildren();

        this.descImg = new eui.Image();
        this.descImg.source = "img_pjjs";
        this.addChild(this.descImg);
        this.descImg.horizontalCenter = 0;
        this.descImg.top = 30;

        this.ruleLabel = new eui.Label();
        this.addChild(this.ruleLabel);
        this.ruleLabel.horizontalCenter = 0;
        this.ruleLabel.top = 80;
        this.ruleLabel.bold = true;
        this.ruleLabel.size = 20;
        this.ruleLabel.text = "" + GSData.i.rules;

        this._group = new eui.Group();
        this._group.right = this._group.left = this._group.bottom = this._group.top = 0;

        var layout:eui.HorizontalLayout = new eui.HorizontalLayout();
        layout.horizontalAlign = "center";
        //layout.verticalAlign = "middle";

        layout.gap = 70;
        layout.paddingTop = 100;

        this._group.layout = layout;
        this.addChild(this._group);

        this.logoImg = new eui.Image();
        this.addChild(this.logoImg);
        this.logoImg.source = "logo";
        this.logoImg.top = 0;
        this.logoImg.right = 90;
        this.logoImg.width *= 0.5;
        this.logoImg.height *= 0.5;

        this.btn_close = new mui.EButton("JS_close");
        this.addChild(this.btn_close);
        this.btn_close.top = 20;
        this.btn_close.right = 20;
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

        this.btn_fen = new mui.EButton("game_invite_button", "分享总成绩");
        this.addChild(this.btn_fen);
        this.btn_fen.horizontalCenter = 0;
        this.btn_fen.bottom = 10;
        this.btn_fen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFen, this);
        this.btn_fen.textField.verticalCenter = -5;
        this.btn_fen.scaleX = 1.2;
        this.btn_fen.scaleY = 1.2;

        this.endTime = new eui.Label();
        this.addChild(this.endTime);
        this.endTime.size = 20;
        this.endTime.textAlign = "center";
        this.endTime.textColor = 0xffffff;
        this.endTime.fontFamily = GameConfig.FontFamily;
        this.endTime.right = 10;
        this.endTime.bottom = 70;
    }

    private onFen():void
    {
        Weixin.onClickShare(this.fenList);
    }
    public onClose():void
    {
        var p = this.parent;

        if(p && p.contains(this))
        {
            p.removeChild(this);

            GSController.i.jiesuanData = null;

            GSController.i.exit();
        }
    }

    public show(obj:any):void
    {
        var p = GameLayerManager.gameLayer().mainLayer;

        this.top = this.right = this.bottom = this.left = 0;

        p.addChild(this);

        if(!obj) return;

        this._group.removeChildren();


        var persons:Array<any> = []; //数组 四个人

        for(var key in obj.persons)
        {
            persons.push(obj.persons[key]);
        }

        persons.sort(function (a, b)
        {
            if(+a.pos > +b.pos) return 1;
            else return -1;
        });

        var paolist:Array<number> = [];

        var settlement = obj.settlement;  //json  四个分


        for(var k = 0; k < persons.length; k++)
        {
            var ps = persons[k];

            var pos = ps.pos;

            var cur:number = +settlement[pos];

            var pao_num:number = +ps["pao_num"];

            ps["iswin"] = this.getMaxNum(settlement, cur);

            ps["cur"] = cur;

            var head:GSTotlePerson;
            if(this.roleList[k])
            {
                head = this.roleList[k];

                head.pserson = ps;
            }
            else
            {
                head = new GSTotlePerson(ps);

                this.roleList.push(head);
            }

            paolist.push(pao_num);

            this.fenList.push(ps);
        }


        for(var pi = 0; pi < this.roleList.length; pi++)
        {
            var pn:GSTotlePerson = this.roleList[pi];


            if(+pn.pserson["pao_num"] > 0)
            {
                pn.pserson["ispao"] = true;
            }

            for(var k = 0; k < paolist.length; k++)
            {
                var kn:number = paolist[k];

                if(+pn.pserson["pao_num"] < kn)
                {
                    pn.pserson["ispao"] = false;
                }
            }
        }


        for(var c = 0; c < this.roleList.length; c++)
        {
            var cc:GSTotlePerson = this.roleList[c];
            this._group.addChild(cc);
            cc.refresh();
        }

        var date:Date = new Date(Date.now());
        var times:string = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() +" " +
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        this.endTime.text = "" + times;
    }

    getMaxNum(arr:any, fen:number)
    {
        var b:boolean = true;

        if(fen <= 0)
        {
            return false;
        }

        for(var k in arr)
        {
            var num:number = +arr[k];

            if(fen < num)
            {
                b = false;
                break;
            }
        }

        return b;
    }

    update()
    {

    }
}