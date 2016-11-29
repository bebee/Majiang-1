/**
 * 公告条
 */

class HornPanel extends eui.Component
{
    private textList:Array<any> = [];

    private _shape:egret.Shape;

    private _sprite:egret.Sprite;

    private _group:eui.Group;

    private _size:number;

    private _color:number;

    public constructor()
    {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "HornSkin";

        this.touchChildren = true;
    }

    _horn:eui.Image;

    onComplete()
    {

    }

    createChildren()
    {
        super.createChildren();

        var my = this;

        my._sprite = new egret.Sprite();
        my._sprite .width = 560;
        my._sprite .height = 38;
        my._sprite .x = 78;
        my.addChild(my._sprite);

        my._shape = new egret.Shape();
        my._shape.graphics.clear();
        my._shape.graphics.beginFill(0x0, 1);
        my._shape.graphics.drawRect(0,0, 485, 38);
        my._shape.graphics.endFill();
        my._shape.x = 60;
        my._shape.y = 0;
        my.addChild(my._shape);

        my._sprite.mask = my._shape;


    }

    public playEff(group:eui.Group, size:number, color:number):void
    {
        var my = this;

        group.addChild(my);


        my.horizontalCenter = 0;

        my.width = 0;

        my._horn.visible =false;

        egret.Tween.get(my).to({width:560},300, egret.Ease.sineOut).call(function ()
        {
            my._horn.visible = true;

            my.playHorn(group, size, color);

            my.addEventListener(egret.Event.ENTER_FRAME, my.onFrame, my);

        }, my);

        my._group = group;
        my._color = color;
        my._size = size;

    }

    public playHorn(group:eui.Group, size:number, color:number):void
    {
        var my = this;

        var list = GlobalData.getInstance().hornList;
        var str:string = list.shift();
        var text:eui.Label = new eui.Label();
        text.text = str;
        text.textAlign = "center";
        text.verticalAlign = "middle";
        text.fontFamily = GameConfig.FontFamily;
        text.size = size;
        text.textColor = color;
        text.x = my.width;
        text.bold = true;
        my._sprite.addChild(text);
        text.y = my.height * 0.5 - text.textHeight * 0.5;

        my.textList.push(text);
    }

    private onFrame(e:egret.Event):void
    {
        var my = this;

        if (my.textList.length <= 0)
        {
            my.endPlay(my._group);
            return;
        }

        var list = GlobalData.getInstance().hornList;

        var t0:eui.Label = my.textList[0];

        if(t0.x <= -t0.textWidth)
        {
            my._sprite.removeChild(t0);

            my.textList.shift();

            t0 = null;
        }

        for (var i = 0; i < my.textList.length; i++)
        {
            var t:eui.Label = my.textList[i];

            t.x -= 2;

            if(i == my.textList.length - 1)
            {
                if(t.x <= (-t.textWidth + 200))
                {
                    if(list.length > 0) my.playHorn(my._group,my._size, my._color);
                }
            }
        }
    }

    public endPlay(group:eui.Group):void
    {
        var my = this;

        my._horn.visible = false;

        my.removeEventListener(egret.Event.ENTER_FRAME, my.onFrame, my);

        egret.Tween.get(my).to({width:0},300, egret.Ease.sineOut).call(function ()
        {
            if(group.contains(my))
            {
                group.removeChild(my);
            }
        }, my);
    }
}
