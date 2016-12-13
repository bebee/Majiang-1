/**
 * 结算当单个人
 */
class GSTotlePerson extends eui.Component
{
    /**
     * 玩家头像
     */
    private _head:HeadIconView;

    /**
     * 玩家姓名
     */
    private _name:eui.Label;

    /**
     * 玩家数据
     */
    public pserson:any;

    /**
     * 大赢家
     */
    private iswin:eui.Image;

    /**
     * 最佳炮手
     */
    private pao_img:eui.Image;

    /**
     * 显示文字
     */
    private showText:any =
    {
        0:"坐　庄：",
        1:"胡　牌：",
        2:"点　炮：",
        3:"摸　宝：",
        4:"宝中宝：",
        5:"积　分："
    };

    /**
     * 奖励显示容器
     */
    private card_group:eui.Group;

    /**
     * @param p
     */
    constructor(p:any)
    {
        super();

        this.pserson = p;
    }
    createChildren()
    {
        super.createChildren();
    }

    refresh()
    {
        this.removeChildren();

        var nick = this.pserson.nick;
        var pic = this.pserson.pic;

        var pos:number = +this.pserson.pos;

        this._head = new HeadIconView();
        this.addChild(this._head);
        this._head.x = 40;
        this._head.y = 60;

        RES.getResByUrl(pic, function(t:egret.Texture)
        {
            if(t) this._head.setHeadImg(t);

        }, this, RES.ResourceItem.TYPE_IMAGE);

        this._name = new eui.Label();
        this.addChild(this._name);
        this._name.text = "" + nick;
        this._name.size = 20;
        this._name.textAlign = "center";
        this._name.textColor = 0xffffff;
        this._name.fontFamily = GameConfig.FontFamily;

        this._name.y = 110;
        this._name.x = 40 - this._name.textWidth * 0.5;

        this.iswin = new eui.Image();

        if(this.pserson["iswin"])
        {
            this.iswin.visible = true;
        }
        else
        {
            this.iswin.visible = false;
        }

        this.iswin.source = "sptWin";

        this.pao_img = new eui.Image();

         if(this.pserson["ispao"])
         {
             this.pao_img.visible = true;
         }
         else
         {
             this.pao_img.visible = false;
         }

        this.pao_img.source = "sptFangPao";

        if(+pos == 1)   //房主奖励
        {
            this._head.visibleRoomOwn(true);
        }

        var new_card:number = this.pserson.new_card;

        console.log(">>  " + new_card);

        if(new_card > 0)
        {
            this.card_group = new eui.Group();

            var layout:eui.HorizontalLayout = new eui.HorizontalLayout();
            layout.horizontalAlign = "center";
            layout.verticalAlign = "middle";
            this.card_group.layout = layout;
            this.addChild(this.card_group);

            var timg:eui.Image = new eui.Image();
            var cardimg:eui.Image = new eui.Image();
            cardimg.source = "money_icon";
            var cardcha:eui.Image = new eui.Image();
            cardcha.source = "card_cha";

            if(+pos == 1)   //房主奖励
            {
                this._head.visibleRoomOwn(true);

                timg.source = "card_jiangli2";
            }
            else   //新人奖励
            {
                timg.source = "card_jiangli1";
            }

            this.card_group.addChild(timg);
            this.card_group.addChild(cardimg);
            this.card_group.addChild(cardcha);

            var new_cardstr:string = "" + new_card;
            for(var n = 0; n < new_cardstr.length; n++)
            {
                var new_s:string = new_cardstr.charAt(n);

                var numimg:eui.Image = new eui.Image();
                numimg.source = "card_" + new_s;
                this.card_group.addChild(numimg);
            }
        }


        var list:Array<any> = [];

        var zhuang_num:number = this.pserson.zhuang_num;  //庄次数
        list.push(zhuang_num);

        var hu_num:number = this.pserson.hu_num;  //胡牌次数
        list.push(hu_num);

        var pao_num:number = this.pserson.pao_num;  //点炮次数
        list.push(pao_num);

        var bao_num:number = this.pserson.bao_num;  //摸宝次数
        list.push(bao_num);

        var baozhongbao_num:number = this.pserson.baozhongbao_num;  //宝中宝次数
        list.push(baozhongbao_num);

        var fen_num:number = this.pserson.cur;  //玩家总分数
        list.push(fen_num);

        for(var i = 0; i < list.length; i++)
        {
            var label:eui.Label = new eui.Label();
            this.addChild(label);
            label.text = this.showText[i] + "" + list[i];
            label.size = 20;
            label.textColor = 0xffffff;
            label.fontFamily = GameConfig.FontFamily;
            label.x = 40 - label.textWidth * 0.5;

            if(i == (list.length - 1))
            {
                label.y = 140 + ((label.textHeight + 20) * i) + 20;

                this.iswin.y = label.y - 20;

                if(this.card_group) this.card_group.y = label.y + 30;
            }
            else
            {
                label.y = 140 + ((label.textHeight + 20) * i);
            }

            if(i == 2) this.pao_img.y = label.y - 20;
        }

        this.addChild(this.pao_img);
        this.addChild(this.iswin);

        this.iswin.x = -10;
        this.pao_img.x = -5;

        this.iswin.alpha = 0.6;
        this.pao_img.alpha = 0.6;

        if(this.card_group) this.card_group.x = -45;
    }
}