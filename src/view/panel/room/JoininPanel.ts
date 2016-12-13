class JoininPanel extends BasePanel {

    private lab_roomid: eui.Label;
    private btn_0: eui.Button;
    private btn_1: eui.Button;
    private btn_2: eui.Button;
    private btn_3: eui.Button;
    private btn_4: eui.Button;
    private btn_5: eui.Button;
    private btn_6: eui.Button;
    private btn_7: eui.Button;
    private btn_8: eui.Button;
    private btn_9: eui.Button;
    private btn_cancel: eui.Button;
    private btn_confirm: eui.Button;

    private selectNums: number[] = [];

    public constructor() {
        super();

        this.skinName = "JoininPanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setType(BgViewType.curtain);
        this.bgView.setTitle("joingame_txt");

        var arr: eui.Button[] = [
            this.btn_1, this.btn_2, this.btn_3,
            this.btn_4, this.btn_5, this.btn_6,
            this.btn_7, this.btn_8, this.btn_9,
            this.btn_0
        ];

        for (var i: number = 0; i < arr.length; i++) {
            arr[i].name = "" + i;
            arr[i].scaleX = arr[i].scaleY = 1.2;
            arr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        }

        this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_cancel:
                if (this.selectNums.length) {
                    this.selectNums.pop();
                    this.lab_roomid.text = this.selectNums.join("  ");
                }
                break;
            case this.btn_confirm:
                if (this.selectNums.length < 4) {
                    EffectUtils.showTips("请输入4-6位的房间号", 5, false);
                    return;
                }

                GSData.i.roomID = Number(this.selectNums.join(""));
                SocketManager.getInstance().getGameConn().send(3, {args: {roomid: GSData.i.roomID, pass: "0"}});
                break;
            default:
                if (this.selectNums.length < 6) {
                    this.selectNums.push(e.currentTarget.name);
                    this.lab_roomid.text = this.selectNums.join("  ");
                }
                break;
        }
    }

    public show(): void {
        super.show();

        this.selectNums = [];
        this.lab_roomid.text = "";
    }
}