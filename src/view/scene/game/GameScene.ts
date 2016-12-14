/**
 * GameScene
 * @Author Ace.c
 * @Create 2016-12-14 14:23
 */
class GameScene extends BaseScene {

    private lab_roomid: eui.Label;
    private lab_rule: eui.Label;
    private head_1: HeadIcon;
    private head_2: HeadIcon;
    private head_3: HeadIcon;
    private head_4: HeadIcon;
    private img_battleTxt: eui.Image;

    constructor() {
        super();

        this.skinName = "GameSceneSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        // this.btn_weixin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
        }
    }

    update() {
    }

    //刷新房间号
    updateRoomID(id: number) {
        this.lab_roomid.text = '房间号:' + id;
    }

    //刷新规则
    updateRule(str: string) {
        this.lab_rule.text = str;
    }

    //对局开始
    battleStart() {
        GameSound.PlaySound("sound_duijukaishi");

        this.img_battleTxt.visible = true;
        var _this = this;
        egret.Tween.get(this.img_battleTxt)
            .to({alpha: 0, scaleX: 2, scaleY: 2}, 300)
            .wait(500)
            .call(function () {
                _this.img_battleTxt.visible = false;
            }, this);
    }
}