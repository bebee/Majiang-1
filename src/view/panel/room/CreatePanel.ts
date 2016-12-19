class CreatePanel extends BasePanel {

    private btn_xueliu: mui.EButton;
    private btn_xuezhan: mui.EButton;
    private scroller: eui.Scroller;
    private viewGroup: eui.Group;
    private btn_start: mui.EButton;

    private xueliuView: CreateXueliuView;
    private xuezhanView: CreateXuezhanView;

    private playType: PlayType = PlayType.xueliuchenghe;
    private view: CreateBaseView;

    public constructor() {
        super();

        this.skinName = "CreatePanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setType(BgViewType.curtain);
        this.bgView.setTitle("create_btn");

        this.xueliuView = new CreateXueliuView();
        this.xuezhanView = new CreateXuezhanView();

        this.update();

        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);

        this.btn_xueliu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_xuezhan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_xueliu:
                this.playType = PlayType.xueliuchenghe;
                break;
            case this.btn_xuezhan:
                this.playType = PlayType.xuezhandaodi;
                break;
        }

        this.update();
    }

    private update() {

        this.clear();

        switch (this.playType) {
            case PlayType.xueliuchenghe:
                this.btn_xueliu.enabled = false;
                this.view = this.xueliuView;
                break;
            case PlayType.xuezhandaodi:
                this.btn_xuezhan.enabled = false;
                this.view = this.xuezhanView;
                break;
            case PlayType.sanren_2:
                break;
            case PlayType.sanren_3:
                break;
            case PlayType.siren_2:
                break;
        }

        this.viewGroup.addChild(this.view);
    }

    clear() {
        this.viewGroup.removeChildren();

        var arr: any[] = [this.btn_xueliu, this.btn_xuezhan];
        for (var i: number = 0; i < arr.length; i++) {
            arr[i].enabled = true;
        }
    }

    private startGame(): void {
        //创建房间
        SocketManager.getInstance().getGameConn().send(2, {
            args: {
                type: game.gameType,
                pass: "0",
                round: this.view.getQuan(),
                rules: this.view.getRule()
            }
        });
    }
}