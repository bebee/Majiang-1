/**
 * Created by Administrator on 2016/11/8.
 */
//场景层
class GSScene extends egret.DisplayObjectContainer {

    bg: egret.Bitmap;
    gsView: GSView;
    gsResultView: GSResultView;
    roomIDText: egret.TextField;


    face: IGameTapEvent;


    inviteButton: egret.DisplayObjectContainer;

    startButton: egret.DisplayObjectContainer;

    gameLogo: egret.Bitmap;

    gameFight: egret.Bitmap;

    gameFightTop: egret.Bitmap;

    waitText: egret.TextField;

    weixinButton: egret.DisplayObjectContainer;
    jiesanButton: egret.DisplayObjectContainer;

    //规则文字
    ruleText: egret.TextField;

    //260 c4e6a2

    //断线重连的准备按钮
    readyButton: mui.EButton;

    constructor() {
        super();
        this.initView();
    }

    initView() {

        this.bg = new egret.Bitmap;

        this.bg.texture = RES.getRes(GSConfig.table_bg_res);

        this.bg.width = game.stageWidth;
        this.bg.height = game.stageHeight;

        this.gameLogo = new egret.Bitmap(GameRes.getUI("game_logo"));
        this.gameLogo.x = (GSConfig.width - this.gameLogo.width) >> 1;
        this.gameLogo.y = (GSConfig.height - this.gameLogo.height >> 1) - 110;

        this.addChild(this.bg);
        this.addChild(this.gameLogo);


        this.gsView = new GSView;
        this.gsView.visible = false;

        this.gsResultView = new GSResultView;
        this.gsResultView.visible = false;

        this.roomIDText = new egret.TextField();
        this.roomIDText.bold = true;
        this.roomIDText.x = 15;
        this.roomIDText.y = 20;
        this.roomIDText.size = 20;
        this.addChild(this.roomIDText);


        this.inviteButton = GameRes.createCenterButton(222 >> 1, 74 >> 1, GSConfig.width >> 1, GSConfig.height >> 1, "game_invite_button", "邀请好友", 30, 0, -5);
        this.addChild(this.inviteButton);


        this.startButton = GameRes.createCenterButton(133 >> 1, 58 >> 1, 630, 480, "game_start_button", "开  始");
        this.addChild(this.startButton);

        this.weixinButton = GameRes.createCenterButton(176 >> 1, 66 >> 1, 830, 130, "game_jiesan_button", "返回微信");
        this.addChild(this.weixinButton);

        this.jiesanButton = GameRes.createCenterButton(176 >> 1, 66 >> 1, 830, 200, "game_weixin_button", "解散房间");
        this.addChild(this.jiesanButton);


        this.waitText = new egret.TextField;
        this.waitText.textAlign = egret.HorizontalAlign.CENTER;
        this.waitText.width = 400;
        this.waitText.anchorOffsetX = 400 >> 1;
        //this.waitText.anchorOffsetY = this.waitText.textHeight >> 1;
        this.waitText.x = GSConfig.width >> 1;
        this.waitText.y = (GSConfig.height >> 1) - 10;
        this.waitText.visible = false;
        this.addChild(this.waitText);

        //830,90 170




        //this.visibleFirstRoundButton(false);
        this.startButton.visible = this.inviteButton.visible = false;

        this.readyButton = new mui.EButton("JS_continue_button", "继续游戏");
        this.readyButton.x = 554;
        this.readyButton.y = 452;
        this.readyButton.textField.verticalCenter = -8;
        this.readyButton.visible = false;
        this.addChild(this.readyButton);

        this.ruleText = new egret.TextField;
        this.ruleText.fontFamily = "微软雅黑";
        this.ruleText.textColor = 0xc4e6a2;
        this.ruleText.size = 16;
        this.ruleText.height = 60;
        this.ruleText.anchorOffsetY = 30;
        this.ruleText.textAlign = egret.HorizontalAlign.CENTER;
        this.ruleText.x = GSConfig.width >> 1;
        this.ruleText.y = 280;

        this.addChild(this.ruleText);

        this.addChild(this.gsView);
        this.addChild(this.gsResultView);


        this.addChild(this.gameFight = new egret.Bitmap(GameRes.getUI("game_fight")));
        this.addChild(this.gameFightTop = new egret.Bitmap(GameRes.getUI("game_fight")));
        this.gameFight.anchorOffsetX = this.gameFight.width >> 1;
        this.gameFight.anchorOffsetY = this.gameFight.height >> 1;
        this.gameFight.x = GSConfig.width >> 1;
        this.gameFight.y = GSConfig.height >> 1;

        this.gameFightTop.anchorOffsetX = this.gameFightTop.width >> 1;
        this.gameFightTop.anchorOffsetY = this.gameFightTop.height >> 1;
        this.gameFightTop.x = GSConfig.width >> 1;
        this.gameFightTop.y = GSConfig.height  >> 1;

        this.gameFight.visible = false;
        this.gameFightTop.visible = false;

        egret.Tween.get(this.startButton,{loop:true}).to({alpha:.5},600).to({alpha:1},600);

        // egret.Tween.get(this.startButton, {loop: true})
        //     .to({scaleX: 1.1, scaleY: 1.1}, 600)
        //     .to({scaleX: 1.0, scaleY: 1.0}, 600)
        //     .wait(1000);

    }

    //更新背景颜色
    updateTableBG(){

        this.bg.texture = RES.getRes(GSConfig.table_bg_res);

    }


    playFight() {

        this.gameFight.visible = true;
        this.gameFightTop.visible = true;
        this.gameFightTop.alpha = 1;
        this.gameFightTop.scaleX = this.gameFightTop.scaleY = 1;

        egret.Tween.get(this.gameFightTop).to({alpha: 0, scaleX: 2, scaleY: 2}, 300).to({}, 500).call(_=> {
            this.gameFight.visible = false;
            this.gameFightTop.visible = false;
        }, this);

        GameSound.PlaySound("sound_duijukaishi");
    }

    //刷新房间号
    updateRoomID(id: number) {
        this.roomIDText.text = '房间号:' + id;
    }

    //刷新规则
    updateRule(str: string) {
        this.ruleText.text = str;
        this.ruleText.anchorOffsetX = this.ruleText.width >> 1;
    }

    bindInterface(face: IGameTapEvent) {

        this.face = face;

        this.bg.touchEnabled = true;

        this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.face.onBGTap, this.face);

        this.weixinButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.face.onWeixinTap, this.face);
        this.jiesanButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.face.onJiesanTap, this.face);
        this.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.face.onStartGame, this.face);
        this.inviteButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.face.onInvite, this.face);
        this.readyButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.face.onRebackContinue, this.face);

    }
}