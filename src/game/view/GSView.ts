/**
 * Created by Administrator on 2016/10/28.
 */
//游戏场景窗口
class GSView extends egret.Sprite {

    constructor() {
        super();
        this.initView();
    }

    //底部UI层
    backUIContainer: egret.DisplayObjectContainer;

    MJViews: MJView[];

    //功能选择层
    funcSelectView: FuncSelectView;

    //上级UI层
    frontUIContainer: egret.DisplayObjectContainer;

    //上层特效层
    frontEffectContainer: egret.DisplayObjectContainer;

    draw: egret.Shape;

    headViews: GSHeadView[];

    //中心炸弹
    centerBoom: CenterBoom;

    readyIcons: egret.Bitmap[];

    baoPaiView: BaoPaiView;

    funcEffect: FuncEffectView;



    baoEffect: egret.Bitmap;

    baoText: egret.TextField;

    face: IGameTapEvent;


    //右上按钮组
    rightTopButtonCon: egret.DisplayObjectContainer;
    //右边按钮组
    rightButtonCon: egret.DisplayObjectContainer;
    //设置按钮
    settingButton: mui.EButton;
    //退出按钮
    quitButton: mui.EButton;

    //对话按钮
    talkButton: mui.EButton;
    //麦克按钮
    siriButton: mui.EButton;

    bindInterface(face: IGameTapEvent) {

        this.face = face;

        this.settingButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.face.onSettingTap, this.face);

        this.quitButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.face.onQuitTap, this.face);

        this.talkButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.face.onTalkTap, this.face);


        this.siriButton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.face.onSiriEnd, this);
        this.siriButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.face.onSiriBegin, this);
        this.siriButton.addEventListener(egret.TouchEvent.TOUCH_END, this.face.onSiriEnd, this);
    }

    initView() {

        this.readyIcons = [];

        this.headViews = [];

        this.backUIContainer = new egret.DisplayObjectContainer;

        this.funcSelectView = new FuncSelectView;

        this.frontUIContainer = new egret.DisplayObjectContainer;

        this.frontEffectContainer = new egret.DisplayObjectContainer;

        this.addChild(this.backUIContainer);

        this.MJViews = [];
        for(var i:number = 1; i <= 4; i++){
            var mjView = new MJView(i);
            this.addChild(mjView);
            this.MJViews[i] = mjView;
        }

        this.rightTopButtonCon = new egret.DisplayObjectContainer;
        this.rightButtonCon = new egret.DisplayObjectContainer;

        this.rightTopButtonCon.x = GSConfig.width - 184;
        this.rightTopButtonCon.y = 18;

        this.rightButtonCon.x = GSConfig.width - 85;
        this.rightButtonCon.y = 412;


        this.addChild(this.rightTopButtonCon);
        this.addChild(this.rightButtonCon);

        var rightTopBG: egret.Bitmap = new egret.Bitmap(GameRes.getUI("game_buttons_bg"));

        this.settingButton = new mui.EButton("game_button_setting");
        this.quitButton = new mui.EButton("game_button_quit");
        this.settingButton.x = 10;
        this.quitButton.x = 82;
        this.rightTopButtonCon.addChild(rightTopBG);
        this.rightTopButtonCon.addChild(this.settingButton);
        this.rightTopButtonCon.addChild(this.quitButton);


        this.talkButton = new mui.EButton("game_talk");


        //this.siriButton = new mui.EButton("game_siri_png");
        this.siriButton = new mui.EButton("game_siri");
        this.siriButton.y = 72;
        this.rightButtonCon.addChild(this.talkButton);



        this.addChild(this.funcSelectView);

        this.addChild(this.frontUIContainer);

        this.addChild(this.frontEffectContainer);


        for (var i: number = 1; i <= GSConfig.playerCount; i++) {

            var headView = new GSHeadView(i);

            this.backUIContainer.addChild(headView);

            this.headViews[i] = headView;

            headView.headIcon.killIcon.touchEnabled = true;
            headView.headIcon.killIcon.name = "" + i;
            headView.headIcon.killIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onKillTouch, this);

            headView.headIcon.headIcon.touchEnabled = true;
            headView.headIcon.headIcon.name = "" + i;
            headView.headIcon.headIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadTouch, this);

        }


        this.centerBoom = new CenterBoom;

        this.centerBoom.x = GSConfig.width >> 1;
        this.centerBoom.y = GSConfig.height >> 1;

        this.backUIContainer.addChild(this.centerBoom);

        //this.drawLine();

        for (var i: number = 1; i <= 4; i++) {

            var readyIcon = new egret.Bitmap(GameRes.getUI("game_ready"));
            readyIcon.anchorOffsetX = readyIcon.width >> 1;
            readyIcon.anchorOffsetY = readyIcon.height >> 1;
            readyIcon.x = GSConfig.readyIconPos[i].x;
            readyIcon.y = GSConfig.readyIconPos[i].y;
            this.addChild(readyIcon);
            this.readyIcons[i] = readyIcon;
        }

        this.baoPaiView = new BaoPaiView;
        this.baoPaiView.x = 56;
        this.baoPaiView.y = 95;
        this.addChild(this.baoPaiView);

        //////////////////////////////////////////////
        this.funcEffect = new FuncEffectView;
        this.frontEffectContainer.addChild(this.funcEffect);

        this.baoEffect = new egret.Bitmap(GameRes.getUI("game_hanbao_BG"));
        this.baoEffect.anchorOffsetX = this.baoEffect.width >> 1;
        this.baoEffect.anchorOffsetY = this.baoEffect.height >> 1;
        this.baoEffect.x = GSConfig.width >> 1;
        this.baoEffect.y = 410;
        this.baoText = new egret.TextField();
        this.baoText.size = 30;
        this.baoText.bold = true;
        this.baoText.text = "换宝牌了!";
        this.baoText.anchorOffsetX = this.baoText.textWidth >> 1;
        this.baoText.anchorOffsetY = this.baoText.textHeight >> 1;
        this.baoText.x = this.baoEffect.x;
        this.baoText.y = this.baoEffect.y;
        this.baoEffect.visible = this.baoText.visible = false;
        GameLayerManager.gameLayer().effectLayer.addChild(this.baoEffect);
        GameLayerManager.gameLayer().effectLayer.addChild(this.baoText);





        //牌长度
/*        this.countTexts = [];

        for (var i = 0; i < 4; i++) {

            var t = new egret.TextField();
            t.size = 18;
            t.x = GSConfig.funcPlayPos[i + 1].x;
            t.y = GSConfig.funcPlayPos[i + 1].y;
            this.countTexts.push(t);
            this.addChild(t);
        }*/

    }

    countTexts: egret.TextField[];
    //更新牌长度显示
    updateAllCount(obj: any) {
        /*for(var i = 0 ; i < 4; i ++){
         var t =  this.countTexts[i];
         t.textColor = 0xFF0000;
         t.size = 30;
         t.text = ""+obj.getHandPais(i+1).length;
         }*/
    }


    drawLine() {

        //测试线
        this.draw = new egret.Shape;
        this.draw.graphics.lineStyle(2, 0xFFFF00);

        for (var i: number = 1; i <= 4; i++) {

            var pos = GSConfig.handPos[i];

            this.draw.graphics.moveTo(pos.x, 0);

            this.draw.graphics.lineTo(pos.x, GSConfig.height);

            this.draw.graphics.moveTo(0, pos.y);

            this.draw.graphics.lineTo(GSConfig.width, pos.y);


        }

        this.frontUIContainer.addChild(this.draw);

    }

    //更新房间信息
    updateRoom() {

        for (var i: number = 1; i <= 4; i++) {

            var headView = this.headViews[i];

            var player: RoomPlayer = GSData.i.getRoomPlayerByDir(i);

            headView.player = player;

            if(player == null){

                headView.nullPlayer();

                //this.visibleReadyIcon(this.readyIcons[i],false);

                //this.visibleKillIcon(headView.headIcon.killIcon,false);

                continue;
            }

            if(player.status == "offline"){

                headView.headIcon.offlineImg.visible = true;

                //this.visibleReadyIcon(this.readyIcons[i],false);

            }else{

                headView.headIcon.offlineImg.visible = false;

                //this.visibleReadyIcon(this.readyIcons[i],true);

            }

            if(i > 1) {
                //this.visibleKillIcon(headView.headIcon.killIcon, true);
            }

            headView.nameText.text = player.nick;

            headView.idText.text = player.uid;

            headView.headIcon.setHeadPic(player.pic);

        }

    }

/*    visibleReadyIcon(icon,boo){

        if(GSData.i.game_state == 1 || GSData.i.game_state == 2) {
            icon.visible = boo;
        }
    }
    visibleKillIcon(icon,boo){

        if(GSData.i.game_state == 1 && GSData.i.ownPos == 1){

            icon.visible = boo;
        }
    }*/

    //获取头像
    getHeadView(dir: number): GSHeadView {
        return this.headViews[dir];
    }


    //隐藏所有准备图标
    hideReadyIcons() {

        for (var i: number = 1; i <= 4; i++) {

            this.readyIcons[i].visible = false;

            this.headViews[i].headIcon.killIcon.visible = false;
        }
    }


    updateBaoPai(pai: any) {

        this.baoPaiView.updatePai(pai);
    }

    //清理牌局麻将
    clearMJView() {

        for (var i: number = 1; i <= 4; i++) {

            var mjView: MJView = this.MJViews[i];

            mjView.clear();

        }

        this.centerBoom.reset();

    }


    //牌桌状态的头像重置
    readyStateHeadReset() {

        for (var i: number = 1; i <= 4; i++) {

            var headView: GSHeadView = this.headViews[i];

            headView.scaleX = headView.scaleY = 1;

            headView.x = GSConfig.headinitPos[i].x;

            headView.y = GSConfig.headinitPos[i].y;

            headView.nameText.visible = true;

            headView.idText.visible = true;

            headView.numText.visible = false;
        }
    }

    //牌局状态的头像重置
    playStateHeadReset() {

        for (var i: number = 1; i <= 4; i++) {

            var headView: GSHeadView = this.headViews[i];

            headView.scaleX = headView.scaleY = .8;
            headView.x = GSConfig.headTargetPos[i].x;

            headView.y = GSConfig.headTargetPos[i].y;

            headView.nameText.visible = false;

            headView.idText.visible = false;

            headView.numText.visible = true;

        }

    }


    //头像的游戏位置
    headPlayPos() {
        for (var i: number = 1; i <= GSConfig.playerCount; i++) {

            var headView = this.headViews[i];

            headView.x = GSConfig.headTargetPos[i].x;

            headView.y = GSConfig.headTargetPos[i].y;
        }
    }

    //播放功能特效
    playFuncEffect(dir: number, action: number) {
/*        this.funcEffect.texture = GameRes.getUI(GSConfig.funcSelects[GSConfig.actionPVP[action]].res);
        this.funcEffect.x = GSConfig.funcPlayPos[dir].x;
        this.funcEffect.y = GSConfig.funcPlayPos[dir].y;
        this.funcEffect.scaleX = 2;
        this.funcEffect.scaleY = 2;
        egret.Tween.get(this.funcEffect).to({scaleX: 1, scaleY: 1}, 200).to({}, 500).call(_=> {
            this.funcEffect.texture = null
        }, this);*/

        var texture = GameRes.getUI(GSConfig.funcSelects[GSConfig.actionPVP[action]].res);
        this.funcEffect.x = GSConfig.funcPlayPos[dir].x;
        this.funcEffect.y = GSConfig.funcPlayPos[dir].y;

        this.funcEffect.play(texture);

        
    }

    //播放换宝特效
    playBaoEffect() {

        this.baoEffect.visible = this.baoText.visible = true;
        this.baoText.scaleX = this.baoText.scaleX = 3;
        egret.Tween.get(this.baoText).to({scaleX: 1, scaleY: 1}, 500).to({}, 1500).call(_=> {
            this.baoEffect.visible = this.baoText.visible = false;
        }, this);

        GameSound.PlaySound("sound_ready");
    }

    onKillTouch(e) {

        var icon = e.currentTarget;

        this.face.onKillTouch(GSData.i.getPos(+icon.name));

    }

    onHeadTouch(e) {
        var icon = e.currentTarget;

        this.face.onHeadTouch(+icon.name);
    }
}