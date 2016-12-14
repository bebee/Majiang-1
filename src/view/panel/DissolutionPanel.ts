class DissolutionPanel extends BasePanel {

    public img_sign1: eui.Image;
    public img_sign2: eui.Image;
    public img_sign3: eui.Image;
    public img_sign4: eui.Image;
    public lab_nick1: eui.Label;
    public lab_nick2: eui.Label;
    public lab_nick3: eui.Label;
    public lab_nick4: eui.Label;
    public lab_description: eui.Label;
    public btn_cancel: mui.EButton;
    public btn_confirm: mui.EButton;

    public constructor() {
        super();

        this.skinName = "DissolutionPanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setType(BgViewType.normal);

        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        this.hide();
        switch (e.currentTarget) {
            case this.btn_cancel:
                SocketManager.getInstance().getGameConn().send(14, {"args": {"answer": 0}});  //发起解散房子
                break;
            case this.btn_confirm:
                SocketManager.getInstance().getGameConn().send(14, {"args": {"answer": 1}});  //发起解散房子
                break;
        }
        // EffectUtils.showTips("您已经选择过了", 5);
    }

    refresh(): void {
        if (game.dissolution && game.dissolution.vote && game.dissolution.vote.hasOwnProperty(game.player.uid)) {
            this.skinState = "after";
        }
        else {
            this.skinState = "before";
        }

        var index: number = 1;

        var num: number = 0;

        var isan: boolean = false;

        for (var uid in game.roomPlayers) {
            var playerVo: PlayerVo = game.roomPlayers[uid];

            var lab: eui.Label = this["lab_nick" + index];

            var arrt: any[] = [];

            arrt.push({
                text: playerVo.nick,
                style: {"textColor": 0xA07A4B, "fontFamily": "Microsoft YaHei", "size": 20}
            });

            if (playerVo.status == "offline") {
                arrt.push({text: "（离线）", style: {"textColor": 0xE7432A, "fontFamily": "Microsoft YaHei", "size": 18}});
            }
            else if (playerVo.status == "online") {
                arrt.push({text: "（在线）", style: {"textColor": 0x4BA05F, "fontFamily": "Microsoft YaHei", "size": 18}});
            }
            else if (playerVo.status == "leave") {
                arrt.push({text: "（离开）", style: {"textColor": 0x7B7978, "fontFamily": "Microsoft YaHei", "size": 18}});
            }

            lab.textFlow = arrt;

            var img: eui.Image = this["img_sign" + index];
            img.visible = false;

            index++;

            if (game.dissolution && game.dissolution.vote) {
                if (game.dissolution.vote[uid] >= 0) {
                    img.visible = true;

                    var n: number = +game.dissolution.vote[uid];

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
        }

        var _this = this;
        if (isan) {
            egret.setTimeout(function () {
                EffectUtils.showTips("因有玩家拒绝解散，房间未能解散", 5);
                game.dissolution = null;
                _this.hide();
            }, this, 1000);
        }
        else {
            if (num >= 4) {
                egret.setTimeout(function () {
                    EffectUtils.showTips("房间解散成功", 5);
                    _this.hide();
                }, this, 1000);
            }
        }
    }

    show() {
        super.show();

        this.refresh();
    }
}