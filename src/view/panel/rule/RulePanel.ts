class RulePanel extends BasePanel {

    private btn_xueliu: eui.Button;
    private btn_xuezhan: eui.Button;
    private scroller: eui.Scroller;
    private group: eui.Group;
    private lab_description: eui.Label;

    private text: eui.Label;

    private type: PlayType;

    public constructor() {
        super();

        this.skinName = "RulePanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setTitle("rule_txt");

        this.type = PlayType.xueliuchenghe;

        this.decode();

        this.btn_xueliu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_xuezhan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {

        this.cleanButton();

        switch (e.currentTarget) {
            case this.btn_xueliu:
                this.btn_xuezhan.enabled = true;
                this.type = PlayType.xueliuchenghe;
                break;
            case this.btn_xuezhan:
                this.btn_xueliu.enabled = true;
                this.type = PlayType.xuezhandaodi;
                break;
        }

        this.decode();
    }

    public decode(): void {

        var key: string;
        switch (this.type) {
            case PlayType.xuezhandaodi:
                key = "rule_xuezhandaodi";
                break;
            case PlayType.xueliuchenghe:
            default:
                key = "rule_xueliuchenghe";
                break;
        }

        var _this = this;

        RES.getResAsync(key, function (json, k) {

            if (k != key)return;

            if (!json) return;

            var desc: string = "";

            if (json.title && json.title != "") {
                desc += "　　" + json.title;
            }

            var rule: any;
            for (var key1 in json.content) {
                rule = json.content[key1];

                if (!rule) continue;

                desc += "\n\n　　" + rule["desc"];

                if (!rule.list) continue;

                for (var key2 in rule.list) {
                    desc += "\n　　　" + rule.list[key2];
                }
            }

            _this.lab_description.text = desc;

            _this.scroller.viewport.scrollV = 0;
            _this.scroller.validateNow();

        }, this);
    }

    private cleanButton() {
        this.btn_xueliu.enabled = false;
        this.btn_xuezhan.enabled = false;
    }
}