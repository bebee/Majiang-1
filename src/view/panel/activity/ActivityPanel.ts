class ActivityPanel extends BasePanel {

    private activit: any = {
        1: {"title": "新手福利", "content": "　　公测期间，凡首次登陆游戏的玩家，均可获得4张房卡福利，便于体验游戏。"},
        2: {"title": "邀请福利", "content": "　　公测期间，凡邀请任何一位新人体验游戏（至少两圈）并完成牌局，其对应的邀请人可获得2张房卡。"},
        3: {"title": "关注福利", "content": "　　公测期间，关注微信公众号：老友棋牌（微信号：CCTV1V5）进入公众号回复“关注奖励”，即可获得4张房卡。"}
    };

    private btn_new: eui.Button;
    private btn_invite: eui.Button;
    private btn_follow: eui.Button;
    private lab_description: eui.Label;

    public constructor() {
        super();

        this.skinName = "ActivityPanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setType(BgViewType.curtain);
        this.bgView.setTitle("shop_txt");
        this.bgView.setCurtain(CurtainType.red);

        this.lab_description.text = "" + this.activit[1].content;

        this.btn_new.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_follow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent): void {
        this.cleanButton();
        switch (e.currentTarget) {
            case this.btn_new:
                this.btn_new.enabled = false;
                this.lab_description.text = "" + this.activit[1].content;
                break;
            case this.btn_invite:
                this.btn_invite.enabled = false;
                this.lab_description.text = "" + this.activit[2].content;
                break;
            case this.btn_follow:
                this.btn_follow.enabled = false;
                this.lab_description.text = "" + this.activit[3].content;
                break;
        }
    }

    private cleanButton(): void {
        var arr: any[] = [this.btn_new, this.btn_invite, this.btn_follow];
        for (var i: number = 0; i < arr.length; i++) {
            arr[i].enabled = true;
        }
    }
}