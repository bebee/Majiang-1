/**
 * CreateXueliuView
 * @Author Ace.c
 * @Create 2016-12-06 18:24
 */
class CreateXueliuView extends CreateBaseView {

    private btn_quan_1: eui.RadioButton;
    private btn_quan_2: eui.RadioButton;

    private btn_rate_2: eui.RadioButton;
    private btn_rate_3: eui.RadioButton;
    private btn_rate_4: eui.RadioButton;

    private btn_rule_1: eui.RadioButton;
    private btn_rule_2: eui.RadioButton;
    private btn_rule_3: eui.RadioButton;
    private btn_rule_4: eui.RadioButton;
    private btn_rule_5: eui.CheckBox;
    private btn_rule_6: eui.CheckBox;
    private btn_rule_7: eui.CheckBox;
    private btn_rule_8: eui.CheckBox;

    public constructor() {
        super();

        this.skinName = "CreateXueliuViewSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

    }

    getQuan() {
        if (this.btn_quan_1.selected) {
            return 1;
        }
        else if (this.btn_quan_2.selected) {
            return 2;
        }
    }

    getRate() {
        if (this.btn_rate_2.selected) {
            return 2;
        }
        else if (this.btn_rate_3.selected) {
            return 3;
        }
        else if (this.btn_rate_4.selected) {
            return 4;
        }
    }

    getRule() {
        var rule: any[] = [];

        rule.push(PlayType.xueliuchenghe);
        rule.push([19, this.getRate()]);

        var box: eui.CheckBox;
        for (var i: number = 1; i <= 8; i++) {
            box = this["btn_rule_" + i];
            if (box && box.selected) {
                switch (i) {
                    case 1:
                        rule.push(GameRule.zimojiadi);
                        break;
                    case 2:
                        rule.push(GameRule.zimojiafan);
                        break;
                    case 3:
                        rule.push(GameRule.dianganghua_pao);
                        break;
                    case 4:
                        rule.push(GameRule.dianganghua_zimo);
                        break;
                    case 5:
                        rule.push(GameRule.huansanzhang);
                        break;
                    case 6:
                        rule.push(GameRule.yaojiujiangdui);
                        break;
                    case 7:
                        rule.push(GameRule.menqingzhongzhang);
                        break;
                    case 8:
                        rule.push(GameRule.tiandihu);
                        break;
                }
            }
        }

        return rule;
    }
}