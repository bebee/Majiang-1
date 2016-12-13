class DissolutionPanel extends BasePanel {

    public _img1: eui.Image;
    public _img2: eui.Image;
    public _img3: eui.Image;
    public _img4: eui.Image;

    public _label1: eui.Label;
    public _label2: eui.Label;
    public _label3: eui.Label;
    public _label4: eui.Label;

    public btn_true: mui.EButton;

    public btn_false: mui.EButton;

    public _desc: eui.Label;

    public plist: any = {};

    public isClick: boolean = false;

    public constructor() {
        super();

        this.skinName = "DissolutionPanelSkin";
    }

    createChildren() {
        super.createChildren();

        this.btn_true.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btn_false.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuxiao, this);
    }

    public clear(): void {
        this.isClick = false;

        this.plist = {};

        this.hide();
    }

    private onQuxiao(): void {
        if (this.isClick) {
            EffectUtils.showTips("您已经选择过了", 5);
            return;
        }

        SocketManager.getInstance().getGameConn().send(14, {"args": {"answer": 0}});  //发起解散房子

        this.isClick = true;
    }


    private onClick(e: egret.TouchEvent): void {
        if (this.isClick) {
            EffectUtils.showTips("您已经选择过了", 5);
            return;
        }
        SocketManager.getInstance().getGameConn().send(14, {"args": {"answer": 1}});  //发起解散房子

        this.isClick = true;
    }

    public refresh(): void {
        if (!this.plist) return;

        var my = this;

        if (this.isClick) {
            this.btn_false.visible = false;
            this.btn_true.visible = false;
            this._desc.visible = true;
        }
        else {
            this.btn_false.visible = true;
            this.btn_true.visible = true;
            this._desc.visible = false;
        }

        var index: number = 1;

        var num: number = 0;

        var isan: boolean = false;

        for (var k in GSData.i.roomPlayerMap) {
            var p: RoomPlayer = GSData.i.roomPlayerMap[k];

            var label: eui.Label = this["_label" + index];

            var arrt: Array<any> = [];

            arrt.push({text: p.nick, style: {"textColor": 0xA07A4B, "fontFamily": "Microsoft YaHei", "size": 20}});

            if (p.status == "offline") {
                arrt.push({text: "（离线）", style: {"textColor": 0xE7432A, "fontFamily": "Microsoft YaHei", "size": 18}});
            }
            else if (p.status == "online") {
                arrt.push({text: "（在线）", style: {"textColor": 0x4BA05F, "fontFamily": "Microsoft YaHei", "size": 18}});
            }
            else if (p.status == "leave") {
                arrt.push({text: "（离开）", style: {"textColor": 0x7B7978, "fontFamily": "Microsoft YaHei", "size": 18}});
            }

            label.textFlow = <Array < egret.ITextElement >>arrt;

            var img: eui.Image = this["_img" + index];

            img.visible = false;

            index++;

            if (this.plist[k] >= 0) {
                img.visible = true;

                var n: number = +this.plist[k];

                if (n == 1) {
                    img.source = "diss_dui";
                }
                else {
                    img.source = "diss_cuo";
                    isan = true;
                }

                num++;
            }
            else {
                img.visible = false;
            }
        }

        if (isan) {
            egret.setTimeout(function () {
                my.clear();

                EffectUtils.showTips("因有玩家拒绝解散，房间未能解散", 5);

            }, this, 1000);
        }
        else {
            if (num >= 4) {


                egret.setTimeout(function () {
                    my.clear();

                    EffectUtils.showTips("房间解散成功", 5);

                }, this, 1000);
            }
        }
    }
}