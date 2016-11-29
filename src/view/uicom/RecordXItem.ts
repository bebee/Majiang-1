class RecordXItem extends eui.Component {
    public obj: Array<any>;

    public constructor(some: Array<any>) {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);

        this.skinName = "RecordXItemSkin";

        this.touchChildren = true;

        this.obj = some;
    }

    public _rank: eui.Label;

    public _name: eui.Label;

    public _time: eui.Label;

    private btn: mui.EButton;

    onComplete() {

    }

    public onUpdate(): void {
        if (!this.obj || this.obj.length <= 0) return;

        var t = this.obj[0];
        var rank: number = this.obj[6];

        var date: Date = new Date(t * 1000);
        var times: string = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        this._time.text = "" + times;

        var str: string = "";

        var d: RecordDialog = StackManager.findDialog(RecordDialog, "RecordDialog");
        var pcl: Array<any> = d.pcList;

        for (var i = 2; i <= 5; i++) {
            var pos: number = this.obj[i];

            var slot: number = i - 2;

            var p = pcl[slot];

            var nick = p.nick;

            if (pos < 0) {
                str += nick + "： " + pos;
            }
            else if (pos == 0) {
                str += nick + "： " + pos;
            }
            else if (pos > 0) {
                str += nick + "：+" + pos;
            }

            if (i == 3) str += "\n";
            else if (i == 4 || i == 2) str += "　　　　";
        }

        this._name.text = str;

        this._rank.text = "第" + rank + "局";
    }

    private onClick(): void {
        EffectUtils.showTips("即将开放", 5);
        //SocketManager.getInstance().getGameConn().send(21, {"args":{"id":this.obj[1]}});
    }

    createChildren() {
        super.createChildren();

        this.btn = new mui.EButton("btn_blue", "回  放");

        this.addChild(this.btn);

        this.btn.y = 26;

        this.btn.x = 655;

        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
}