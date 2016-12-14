class ChatExpression extends egret.Sprite
{
    private img:eui.Image;
    private playindex:number = 1;
    private isPlay:boolean = true;
    private timerNumer:number;
    public constructor()
    {
        super();

        this.touchChildren = false;
        this.touchEnabled = false;

        this.init();
    }

    init()
    {
        this.img = new eui.Image();
        this.addChild(this.img);
    }

    plays(id:number)
    {
        var my = this;

        if(!my.isPlay) return;

        my.img.source = "expression" + id + "." + my.playindex;

        function change()
        {
            if(my.playindex == 1) my.playindex = 2;
            else my.playindex = 1;

            my.plays(id);
        }

        my.timerNumer = egret.setTimeout(change, my, 200);
    }

    stop()
    {
        egret.clearTimeout(this.timerNumer);
        this.isPlay = false;
    }

}
