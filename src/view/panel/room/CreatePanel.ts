class CreatePanel extends BasePanel {

    private btn_xueliu: mui.EButton;
    private btn_xuezhan: mui.EButton;

    private scroller: eui.Scroller;
    private viewGroup: eui.Group;

    private btn_start: mui.EButton;

    private xueliuView: CreateXueliuView;
    private xuezhanView: CreateXuezhanView;

    private selectAll: boolean;

    private playType: PlayType = PlayType.xueliuchenghe;

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

        this.initPanel();

        this.btn_xueliu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_xuezhan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_xueliu:
                this.playType = PlayType.xueliuchenghe;
                break;
            case this.btn_xuezhan:
                this.playType = PlayType.xuezhandaodi;
                break;
            case this.btn_start:
                this.startGame();
                break;
        }

        this.updateView();
    }

    private initPanel() {
        this.selectAll = false;

        this.scroller.viewport.scrollV = 0;
        this.scroller.validateNow();

        this.updateView();
    }

    private updateView() {

        this.viewGroup.removeChildren();

        var arr: any[] = [this.btn_xueliu, this.btn_xuezhan];
        for (var i: number = 0; i < arr.length; i++) {
            arr[i].enabled = true;
        }

        switch (this.playType) {
            case PlayType.xueliuchenghe:
                this.viewGroup.addChild(this.xueliuView);
                this.xueliuView.update();
                this.btn_xueliu.enabled = false;
                break;
            case PlayType.xuezhandaodi:
                this.viewGroup.addChild(this.xuezhanView);
                this.xuezhanView.update();
                this.btn_xuezhan.enabled = false;
                break;
            case PlayType.sanren_2:
                break;
            case PlayType.sanren_3:
                break;
            case PlayType.siren_2:
                break;
        }
    }

    private startGame(): void {
        //创建房间
        SocketManager.getInstance().getGameConn().send(2, {
            "args": {
                "type": game.gameType,
                "round": game.ruleVo.quan,
                "rules": game.ruleVo.rules,
                "pass": "0"
            }
        });
    }
}