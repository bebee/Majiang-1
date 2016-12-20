/**
 * CreateSiren2View
 * @Author Ace.c
 * @Create 2016-12-06 18:24
 */
class CreateSiren2View extends CreateBaseView {

    private btn_quan_1: eui.RadioButton;
    private btn_quan_2: eui.RadioButton;

    private btn_shou_7: eui.RadioButton;
    private btn_shou_10: eui.RadioButton;
    private btn_shou_13: eui.RadioButton;

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

    //圈数
    private quan: number = 1;
    //番数
    private rate: number = 2;

    private ruleVo: GameRuleVo;

    public constructor() {
        super();

        this.skinName = "CreateSiren2ViewSkin";
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

    private getShou() {
        if (this.btn_shou_7.selected) {
            return 7;
        }
        else if (this.btn_shou_10.selected) {
            return 10;
        }
        else if (this.btn_shou_13.selected) {
            return 13;
        }
    }

    private getRate() {
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

        rule.push(PlayType.siren_2);
        rule.push([GameRule.paizhang, this.getShou()]);
        rule.push([GameRule.fengding, this.getRate()]);

        var box: eui.CheckBox;
        for (var i: number = 1; i <= 10; i++) {
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
                        rule.push(GameRule.kaertiao);
                        break;
                    case 6:
                        rule.push(GameRule.yaojiujiangdui);
                        break;
                    case 7:
                        rule.push(GameRule.tiandihu);
                        break;
                }
            }
        }

        return rule;
    }
}