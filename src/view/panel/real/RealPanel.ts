class RealPanel extends BasePanel {
    private lab_name: eui.TextInput;
    private lab_id: eui.TextInput;
    private btn_confirm: eui.Button;

    public constructor() {
        super();

        this.skinName = "RealPanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setTitle("idcard_title");

        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmHandler, this);
    }

    private confirmHandler(): void {
        if (RegUtils.isNull(this.lab_name.text)) {
            return EffectUtils.showTips("姓名不能为空!");
        }

        if (RegUtils.isNull(this.lab_id.text)) {
            return EffectUtils.showTips("身份证号不能为空!");
        }

        if (this.lab_id.text.length != 18 && this.lab_id.text.length != 15) {
            return EffectUtils.showTips("身份证号长度不正确!");
        }

        SocketManager.getInstance().getGameConn().send(27, {
            "args": {
                "name": this.lab_name.text,
                "id_no": this.lab_id.text
            }
        });
    }
}