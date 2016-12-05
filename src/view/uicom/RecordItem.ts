class RecordItem extends eui.Component
{
    public obj:any;
    public constructor(some:any)
    {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "RecordItemSkin";

        this.touchChildren = true;

        this.obj = some;
    }

    public _rank:eui.Label;

    public _code:eui.Label;

    public _name:eui.Label;

    private btn:mui.EButton;

    public _time:eui.Label;

    onComplete()
    {

    }

    public onUpdate():void
    {
        if(!this.obj) return;

        var persons:Array<any> = this.obj.persons;
        var roomid = this.obj.roomid;
        var t:number = this.obj.time;
        var total:Array<any> = this.obj.total;
        var rank = this.obj.rank;
       
        this._rank.text = "" + (rank+1);

        var str:string = "";

        this._name.text = "";

        var date:Date = new Date(t * 1000);

        var times:string = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() +" " +
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        this._code.text = "房间号：" + roomid;

        this._time.text = "" + times;

        for(var i = 0; i < persons.length; i++)
        {
            var p = persons[i];

            var nick = p.nick;
            var pic = p.pic;
            var pos:number = +p.pos;
            var uid = p.uid;
            var fen:number = +total[pos - 1];

            if(i == 2) str += "\n" + nick;
            else if(i == 3 || i == 1)str += "　　　　" + nick;
            else str += "" + nick;

            if(fen >0)
            {
                str += "  +" + fen;
            }
            else if(fen == 0)
            {
                str += "  " + fen;
            }
            else
            {
                str += "  " + fen;
            }
        }

        this._name.text = str;
    }

    private onClick():void
    {
        SocketManager.getInstance().getGameConn().send(20, {"args":{"id":this.obj.id}});


        var d:RecordDialog = StackManager.findDialog(RecordDialog, "RecordDialog");
        d.pcList = this.obj.persons;
        GlobalData.getInstance().personList = this.obj.persons;
        GlobalData.getInstance().roomid = this.obj.roomid;
    }

    createChildren()
    {
        super.createChildren();

        this.btn = new mui.EButton("btn_blue", "详  情");

        this.addChild(this.btn);

        this.btn.y = 26;

        this.btn.x = 655;

        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
}
