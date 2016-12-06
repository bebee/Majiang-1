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

    mark: egret.Bitmap;

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


    replayControllView : ReplayControllView;

    bindInterface(face: IGameTapEvent) {

        this.face = face;

        this.settingButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.face.onSettingTap, this.face);

        this.quitButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.face.onQuitTap, this.face);

        this.talkButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.face.onTalkTap, this.face);


        this.siriButton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.face.onSiriEnd, this);
        this.siriButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.face.onSiriBegin, this);
        this.siriButton.addEventListener(egret.TouchEvent.TOUCH_END, this.face.onSiriEnd, this);

        GameDispatcher.ins.addEventListener(EventType.Trigger_Play_Point, this.onUpdatePlayPoint, this);
        GameDispatcher.ins.addEventListener(EventType.Trigger_Play_Tips, this.onUpdatePlayTips, this);
        GameDispatcher.ins.addEventListener(EventType.Trigger_Prompt, this.onUpdateTips, this);
    }

    onUpdatePlayPoint(arr: any[]) {
        if (arr && arr.length == 2) {
            this.showMark(arr[1], (arr[0] == 1 || arr[0] == 3) ? 2 : 0);
        }
        else {
            this.hideMark();
        }
    }

    onUpdatePlayTips(arr: any[]) {
        if (arr && arr.length == 2) {
            GameUtils.appear(arr[0], arr[1]);
        }
        else {
            GameUtils.isDisappear = true;
            GameUtils.disappear();
        }
    }

    /**
     * 更新提示事件响应函数
     */
    onUpdateTips(showOrHide: boolean) {

        if (!GSData.i.funcSelects) {
            return;
        }

        this.clearTips();

        if (showOrHide == false) {
            return;
        }

        var view: MJView = this.MJViews[1];
        var card: CardView;
        for (var j: number = 0; j < view.handCon.numChildren; j++) {
            card = <CardView>view.getHandCard(j);
            if (!card || card.index < 0) {
                continue;
            }
            card.touchEnabled = false;
        }

        var paiSingle: any[] = [];
        var paiAll: any[] = [];

        /**
         *
         * @param index (1提示单张 2提示全张)
         * @param pai
         * @param jin
         */
        function pushPai(index: number, pai: any, jin: number = -1) {
            switch (index) {
                case 1:
                    if (paiSingle.indexOf(pai) == -1 && pai.number != jin) {
                        paiSingle.push(pai);
                    }
                    break;
                case 2:
                    if (paiAll.indexOf(pai) == -1) {
                        paiAll.push(pai);
                    }
                    break;
            }
        }

        for (var i: number = 0; i < GSData.i.funcSelects.length; i++) {
            var obj: any = GSData.i.funcSelects[i];

            if (obj.index == 0 || obj.index == 5 || obj.index == 6) {
                continue;
            }

            switch (obj.index) {
                case 1://吃
                    for (var j: number = 0; j < obj.group.length; j++) {
                        for (var k: number = 0; k < obj.group[j].pai.length; k++) {
                            pushPai(1, obj.group[j].pai[k], obj.group[j].pai[1].number);
                        }
                    }
                    break;
                case 2://碰
                    for (var j: number = 0; j < obj.pai.length; j++) {
                        pushPai(2, obj.pai[j]);
                    }
                    break;
                case 3://杠
                case 4://补
                    for (var j: number = 0; j < obj.group.length; j++) {
                        switch (obj.group[j].action) {
                            case 27:
                            case 28:
                                pushPai(1, obj.group[j].pai);
                                break;
                            default:
                                for (var k: number = 0; k < obj.group[j].pai.length; k++) {
                                    var pai: any = obj.group[j].pai[k];
                                    switch (obj.group[j].action) {
                                        case 22:
                                        case 26:
                                            pushPai(1, pai);
                                            break;
                                        default:
                                            pushPai(2, pai);
                                            break;
                                    }
                                }
                                break;
                        }
                    }
                    break;
            }
        }

        this.updateTips(1, paiSingle);
        this.updateTips(2, paiAll);
    }

    /**
     * 更新提示
     * @param index (1提示单张 2提示全张)
     * @param arr
     */
    updateTips(index: number, arr: any[]) {

        var _this = this;

        function checkPai(pai: any) {
            var view: MJView = _this.MJViews[1];
            var card: CardView;

            for (var j: number = 0; j < view.handCon.numChildren; j++) {
                card = <CardView>view.getHandCard(j);
                if (!card || card.index < 0) {
                    continue;
                }

                if (card.pai.type == pai.type && card.pai.number == pai.number) {
                    card.y = card.pos.y - GSConfig.moveUpDis;

                    if (index == 1) {
                        break;
                    }
                }
            }
        }

        var pai: any;
        for (var i: number = 0; i < arr.length; i++) {
            pai = arr[i];
            checkPai(pai);
        }
    }

    /**
     * 清除提示
     */
    clearTips() {
        var view: MJView = this.MJViews[1];
        var card: CardView;
        for (var i: number = 0; i < view.handCon.numChildren; i++) {
            card = <CardView>view.getHandCard(i);
            if (!card || card.index < 0) {
                continue;
            }

            card.y = card.pos.y;
            card.touchEnabled = true;
        }
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

        this.mark = new egret.Bitmap(RES.getRes("game_mark"));
        this.mark.anchorOffsetX = this.mark.width >> 1;
        this.mark.anchorOffsetY = this.mark.height;
        this.addChild(this.mark);

        this.hideMark();


        this.rightTopButtonCon = new egret.DisplayObjectContainer;
        this.rightButtonCon = new egret.DisplayObjectContainer;

        this.rightTopButtonCon.x = GSConfig.width - 184;
        this.rightTopButtonCon.y = 18;

        this.rightButtonCon.x = GSConfig.width - 85;
        this.rightButtonCon.y = 412;


        this.addChild(this.rightTopButtonCon);
        this.addChild(this.rightButtonCon);

        var rightTopBG: egret.Bitmap = new egret.Bitmap(GameRes.getUI("game_buttons_bg"));

        this.settingButton = new mui.EButton("game_button_setting_png");
        this.quitButton = new mui.EButton("game_button_quit_png");
        this.settingButton.x = 10;
        this.quitButton.x = 82;
        this.rightTopButtonCon.addChild(rightTopBG);
        this.rightTopButtonCon.addChild(this.settingButton);
        this.rightTopButtonCon.addChild(this.quitButton);


        this.talkButton = new mui.EButton("game_talk_png");


        //this.siriButton = new mui.EButton("game_siri_png");
        this.siriButton = new mui.EButton("game_siri_png");
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


        this.replayControllView = new ReplayControllView;
        this.replayControllView.x = (GSConfig.width - this.replayControllView.width) >> 1;
        this.replayControllView.y = 365;
        this.addChild(this.replayControllView);
        this.replayControllView.visible = false;
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




    drawLine() {

        //测试线
        this.draw = new egret.Shape;
        this.draw.graphics.lineStyle(2, 0xFFFF00);

        for (var i: number = 1; i <= 4; i++) {

            var pos = GSConfig.handPosPlus[i];

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

        var texture = GameRes.getUI(GSConfig.funcSelectRes[GSConfig.actionPVP[action]]);
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

    showMark(cardView: CardView, offx: number = 0, offy: number = 0) {
        if (this.mark) {
            egret.Tween.removeTweens(this.mark);

            // this.mark.x = cardView.x - this.mark.width / 2 + offx;
            // this.mark.y = cardView.y - this.mark.height + offy;

            this.mark.x = cardView.pos.x + offx;
            this.mark.y = cardView.pos.y + offy;

            egret.Tween.get(this.mark, {loop: true})
                .to({y: this.mark.y - 20, scaleX: 1, scaleY: 1}, 300, egret.Ease.sineOut)
                .to({y: this.mark.y, scaleX: 1.2, scaleY: .8}, 300, egret.Ease.sineIn);

            this.mark.visible = true;
        }
    }

    hideMark() {
        if (this.mark) {
            this.mark.visible = false;
        }
    }
}