/**
 * Created by Administrator on 2016/10/28.
 */

//主控制器
class GSController extends egret.EventDispatcher {
    static _i: GSController;
    static get i() {
        return GSController._i || (GSController._i = new GSController);
    }

    scene: GSScene;

    gsView: GSView;

    gsResultView: GSResultView;

    gsTitleView: GSTotleView;

    activateCard: CardView = null;

    // bg: egret.Bitmap;

    isAllowFuncClick: boolean;

    funcSelectAction: number;

    jiesuanData: any;

    //延时出牌计时器
    delayPushInterval: number;

    constructor() {
        super();
        this.init();
    }

    initView() {
        var main = LayerManager.gameLayer().mainLayer;
        main.addChild(this.scene = new GSScene);

        this.gsView = this.scene.gsView;
        this.gsResultView = this.scene.gsResultView;

        this.gsView.bindInterface(TouchBehaviour.i);
        this.gsView.funcSelectView.bindInterface(TouchBehaviour.i);
        this.gsView.replayControllView.bindInterface(TouchBehaviour.i);
        this.scene.bindInterface(TouchBehaviour.i);
        this.gsResultView.bindInterface(TouchBehaviour.i);

    }

    init() {

        this.isAllowFuncClick = true;

        this.allowPushCard = true;

        this.sameCardViews = [];

        GSUpdate.i.start();

        GSStateMgr.i.init();

        this.initView();

    }

    //启动游戏主界面
    startView() {

        LayerManager.gameLayer().openMainLayer();

        this.scene.updateTableBG();

        this.showStateView();
        //this.gsView.visible = true;

        //测试
        /*
         GSData.i.setHandPais(1,GSConfig.testPais);
         GSData.i.setHandPais(2,new Array(13));
         GSData.i.setHandPais(3,new Array(13));
         GSData.i.setHandPais(4,new Array(13));

         GSStateMgr.i.setState(GSState.State_CardPutline);
         */
    }

    //显示状态内容
    showStateView() {

        switch (PublicVal.state) {

            case StateType.start://首次加入牌桌界面

                this.visibleTwoFuncButton(true);
                this.visibleFourFuncButton(false, false);
                this.visibleReadyIcon();
                this.visibleRoomOwn();
                this.visibleZhuang();

                this.gsView.visible = true;
                this.gsView.baoPaiView.visible = false;
                this.gsView.centerBoom.visible = false;
                this.gsResultView.visible = false;

                this.scene.waitText.visible = true;
                this.scene.waitText.text = "等待其他玩家，请稍候...";
                this.scene.startButton.visible = false;
                this.scene.inviteButton.visible = false;
                this.scene.ruleText.visible = true;

                this.gsView.readyStateHeadReset();

                this.updateGangCur();
                this.updateJiesanButtonText();
                break;
            case StateType.reconnect://继续牌桌界面

                this.gsResultView.visible = false;

                this.visibleTwoFuncButton(true);
                this.visibleFourFuncButton(false, false);
                this.visibleReadyIcon();
                this.visibleRoomOwn();
                this.visibleZhuang();

                this.gsView.visible = true;
                this.gsView.baoPaiView.visible = false;
                this.gsView.centerBoom.visible = false;
                this.gsResultView.visible = false;

                this.scene.waitText.visible = true;
                this.scene.waitText.text = "等待其他玩家，请稍候...";
                this.scene.startButton.visible = false;
                this.scene.inviteButton.visible = false;
                this.scene.ruleText.visible = true;
                this.gsView.readyStateHeadReset();

                this.updateGangCur();
                this.updateJiesanButtonText();
                break;
            case StateType.gamestart://进入牌局界面
            case StateType.ting:
                //进入牌局界面
                this.gsView.visible = true;
                this.scene.waitText.visible = false;
                this.scene.startButton.visible = false;
                this.scene.inviteButton.visible = false;
                this.scene.ruleText.visible = true;
                this.scene.readyButton.visible = false;

                this.visibleTwoFuncButton(false);
                this.visibleFourFuncButton(true, true);

                this.gsView.hideReadyIcons();
                this.visibleZhuang();

                this.gsView.centerBoom.visible = true;
                this.gsView.baoPaiView.visible = true;

                this.gsView.playStateHeadReset();

                this.updateGangCur();


                break;
            case StateType.gameover://进入每轮牌局结算界面
                GSData.i.readyFlag = 0;
                this.gsResultView.visible = true;
                this.closeGSView();
                break;
            case StateType.over://总结算界面
                this.closeGSView();
                this.gsResultView.visible = false;
                break;
            case 6://回放界面
                this.gsView.visible = true;

                this.scene.waitText.visible = false;
                this.scene.startButton.visible = false;
                this.scene.inviteButton.visible = false;
                this.scene.ruleText.visible = true;
                this.scene.readyButton.visible = false;

                this.visibleTwoFuncButton(false);
                this.visibleFourFuncButton(true, false);

                this.gsView.hideReadyIcons();
                this.visibleZhuang();

                this.gsView.centerBoom.visible = true;
                this.gsView.baoPaiView.visible = true;

                this.gsView.playStateHeadReset();

                this.updateCenterInfo();

                this.visibleRoomOwn();
                break;
        }
    }


    closeGSView() {
        this.visibleTwoFuncButton(false);
        this.hideLightSame();
        this.gsView.visible = false;
        this.hideFuncSelectMenu();
        this.gsView.clearMJView();
        this.scene.ruleText.visible = false;
        this.scene.readyButton.visible = false;
        this.scene.waitText.visible = false;

        game.manager.dispatchEvent(EffectEventType.CardThrowTips);
        game.manager.dispatchEvent(EffectEventType.CardThrow);
        game.manager.dispatchEvent(EffectEventType.CardRaise);
        this.playTimeEffect(false, false);
    }

    closeResultView() {

        this.gsResultView.clear();
        this.gsResultView.visible = false;
    }

    //刷新解散按钮的文字
    updateJiesanButtonText() {

        if (PublicVal.state == 1) {
            if (PublicVal.i.ownPos == 1) {
                this.scene.jiesanButton.getChildAt(0)["textField"].text = "解散房间";

            }
            else {
                this.scene.jiesanButton.getChildAt(0)["textField"].text = "离开房间";
            }
        }
        else {
            this.scene.jiesanButton.getChildAt(0)["textField"].text = "解散房间";
        }

    }

    //显示隐藏两个功能按钮(解散房间和返回微信)
    visibleTwoFuncButton(boo1: boolean) {

        this.scene.weixinButton.visible = boo1;
        this.scene.jiesanButton.visible = boo1;  //bool2

    }

    //显示隐藏两个功能按钮(设置/解散/语音)
    visibleFourFuncButton(boo1: boolean, boo2: boolean) {
        this.gsView.rightTopButtonCon.visible = boo1;
        this.gsView.rightButtonCon.visible = boo2;
    }

    //刷新杠的分数
    updateGangCur(showAnimation: boolean = false) {
        var scores: any = {};
        var score: number = 0;
        var head: HeadIcon;
        for (var i: number = 1; i <= 4; i++) {
            head = this.gsView.headViews[i];
            score = GSData.i.gangCurs[i];

            if (showAnimation) {
                var diff: number = score - head.getScore();
                scores[i] = diff;
            }

            head.setScore(score);
        }

        console.log(showAnimation, scores);

        if (showAnimation) {
            game.manager.dispatchEvent(EffectEventType.ScoreTips, scores);
        }
    }

    //刷新房间人员信息
    updateRoom() {
        this.scene.updateRoomID(game.roomid);
        this.scene.updateRule(PublicVal.i.rules);
        this.gsView.updateRoom();
        this.visibleReadyIcon();
        this.visibleStartButton();
    }

    //开始按钮的显示和隐藏
    visibleStartButton() {

        if (PublicVal.state == StateType.start) {

            var hasLeave: boolean = false;

            var allOnline: boolean = true;


            for (var i: number = 1; i <= 4; i++) {
                var player = GSData.i.roomPlayers[i];
                if (player == null) {
                    hasLeave = true;
                    allOnline = false;
                    continue;
                }

                if (player.status != "online") {
                    allOnline = false;
                }
            }

            if (PublicVal.i.ownPos == 1) {//房主
                if (hasLeave) { //有空位
                    this.scene.inviteButton.visible = true;
                    this.scene.waitText.visible = false;
                } else {
                    this.scene.inviteButton.visible = false;
                    this.scene.waitText.visible = true;
                    this.scene.waitText.text = "等待其他玩家，请稍候...";
                }

                if (allOnline) {//都准备好
                    this.scene.waitText.visible = false;
                    this.scene.startButton.visible = true;
                } else {
                    this.scene.startButton.visible = false;
                }
            } else {//不是房主
                if (allOnline) {//都准备好

                    this.scene.waitText.text = "等待房主开始游戏，请稍候...";

                } else {

                    this.scene.waitText.text = "等待其他玩家，请稍候...";

                }
            }
        }
    }

    exit() {
        GSData.i.clear();
        this.clear();
        this.closeGSView();
        if (this.gsTitleView) this.gsTitleView.onClose();
        this.closeResultView();
        LayerManager.gameLayer().openSceneLayer();
    }

    //返回游戏
    rebackGame() {
        this.clear();
        this.showStateView();
        this.updateBaoView();

        //this.gsView.updateBaoPai(PublicVal.i.bao);

        //this.gsResultView.updateBaoPai(PublicVal.i.bao);

        this.setBoomDir(PublicVal.i.ownPos);
        this.setArrowDir(GSData.i.turnDir);
        this.updateCenterInfo();
        this.updateRebackPais();

        //this.showFuncSelectMenu();

        //缓存的显示刷新
        while (GSData.i.rebackViewFuncs.length) {

            GSData.i.rebackViewFuncs.shift().call(this);

        }

        GSController.i.gsView.resetAllChildrenTouch();

        if (game.status == GameStatus.changeThree && !game.statusComplete) {
            game.manager.dispatchEvent(EffectEventType.ChangeThree);
        }


        if (game.status == GameStatus.missing && !game.statusComplete) {
            game.isQueBoo = true;
            game.manager.dispatchEvent(EffectEventType.Que);
        }

        if (GSData.i.backTing) {
            //听牌状态
            this.tingingView();
            PublicVal.state = -4;

            if (GSConfig.handLens[PublicVal.i.getHandPais(1).length]) {

                //自动出牌
                this.delayAutoPushPai();

            }
        }
    }

    //开始游戏
    startGame() {
        this.clear();
        this.showStateView();

        this.updateBaoView();

        this.setBoomDir(PublicVal.i.ownPos);

        //设置庄家抓牌位光标
        this.setArrowDir(GSData.i.zhuangDir);

        this.updateCenterInfo();

        if (GSData.i.isLianZhuang) {
            EffectUtils.showTips("恭喜庄家连庄！", 1);
        }

        //进入开场效果
        PublicVal.state = StateType.shuffle;

        GSStateMgr.i.setState(GSState.State_HeadToTarget);

        this.isAllowFuncClick = false;
    }


    //显示隐藏某个方位准备图标和踢人图标
    visibleReadyIcon() {

        if (PublicVal.state == StateType.start || PublicVal.state == StateType.reconnect) {
            for (var i: number = 1; i <= 4; i++) {
                var readyIcon = this.gsView.readyIcons[i];
                var killIcon = this.gsView.getHeadView(i).btn_kill;
                readyIcon.visible = (GSData.i.readyFlag >> i & 1) == 1;

                if (PublicVal.state == StateType.start && i > 1 && PublicVal.i.ownPos == 1) {

                    killIcon.visible = readyIcon.visible;
                } else {
                    killIcon.visible = false;
                }
            }
        }
    }

    //更新庄家
    visibleZhuang() {

        for (var i: number = 1; i <= GSConfig.playerCount; i++) {

            this.gsView.getHeadView(i).isZhuang = ((PublicVal.i.zhuangFlag >> i & 1) == 1);

        }
    }

    //更新房主
    visibleRoomOwn() {
        for (var i: number = 1; i <= GSConfig.playerCount; i++) {
            this.gsView.getHeadView(i).isOwner = ((PublicVal.i.roomOwnFlag >> i & 1) == 1);

        }
    }

    //播放时间特效
    playTimeEffect(boo: boolean, shake: boolean = false) {
        if (boo) {
            this.gsView.centerBoom.timeEffect.play(shake);
        } else {
            this.gsView.centerBoom.timeEffect.reset();
        }
    }

    //抓牌
    catchCard(dir: number) {
        var mjView = this.gsView.MJViews[dir];
        var pos = GSConfig.catchPos[dir];
        var catchPai = GSData.i.getCatchPai(dir);
        var cardView = CardView.create(dir, 1, catchPai);
        cardView.index = PublicVal.i.getHandPais(dir).length - 1;

        cardView.posView(pos.x, pos.y);
        mjView.addHandCard(cardView);
        this.setArrowDir(dir);

        if (dir == 1) {
            //设置按键事件 抓牌动画
            cardView.activate();
            cardView.addClick(this.onCardClick, this);
            cardView.y = pos.y - 30;
            egret.Tween.get(cardView).to({y: pos.y}, 200);
            this.clearActivateCard();

            this.playTimeEffect(true, true);

            if (PublicVal.state == StateType.ting) {//听牌状态
                this.delayAutoPushPai();
            }

            if (game.isHuBoo) {//胡牌状态
                this.delayAutoPushPai();
            }

        } else {
            this.playTimeEffect(true, false);
        }

        if (PublicVal.state == StateType.fen) {
            this.playTimeEffect(false, false);
        }
    }

    //延时自动打牌
    delayAutoPushPai() {

        this.delayPushInterval = egret.setTimeout(function () {

            var catchPai = GSData.i.getCatchPai(1);
            if (catchPai) {
                SocketManager.getInstance().getGameConn().send(4, {"args": catchPai});
            }

        }, this, 800);
    }

    clearDelayPushInterval() {
        egret.clearTimeout(this.delayPushInterval);
        this.delayPushInterval = 0;
    }

    clearActivateCard() {
        this.hideLightSame();
        this.activateCard = null;
    }

    //更新剩余牌数量 和圈数
    updateCenterInfo() {

        this.gsView.centerBoom.updateLeftCount(PublicVal.i.dui_num);

        this.gsView.centerBoom.updateRoundCount(PublicVal.i.cur_round, PublicVal.i.max_round);

    }

    //牌局开始
    roundPlay() {
        PublicVal.state = StateType.gamestart;

        GSData.i.pushStartHandPai();
        GSController.i.isAllowFuncClick = true;
        GSController.i.catchCard(GSData.i.zhuangDir);
        GSController.i.scene.playFight();
        GSController.i.showFuncSelectMenu();

        if (game.status == GameStatus.changeThree && !game.statusComplete) {
            game.manager.dispatchEvent(EffectEventType.ChangeThree);
        }
    }

    updateBaoView() {

        this.gsView.updateBaoPai(PublicVal.i.bao);
        this.gsResultView.updateBaoPai(PublicVal.i.bao);
    }

    //播放换宝
    playBao() {
        this.gsView.playBaoEffect();

        this.updateBaoView();

        this.updateCenterInfo();
    }

    //胡牌
    hupaiShow() {
        //摊牌
        //遍历index大于-1的牌
        var hupai = GSData.i.result.hupai;
        if (hupai != 0) {
            //别人点炮
            if (hupai.type == 17) {
                var dianPaoDir = GSData.i.getDir(GSData.i.result.dianPaoPos);
                this.removePoolCard(dianPaoDir);
            }
        }

        for (var i: number = 1; i <= 4; i++) {
            var mjView = this.gsView.MJViews[i];
            mjView.removeIndexPai();
            var left = GSData.i.getResultPersonLeft(i);
            var cur = GSConfig.dymnicHandPos[i];
            this.createIndexPais(mjView, cur.x, cur.y, i, 3, left, true, false);
        }

        if (GSData.i.tingEndShow) {
            this.tingingView(true);
        }

        //等待结算
        egret.setTimeout(_=> {
            this.intoResultView()
        }, this, 3000);
    }

    //创建立牌 返回抓牌区
    createIndexPais(mjView: MJView, sx: number, sy: number, dir: number, style: number, pais: any, visible: boolean = true, activate: boolean = true, lensCheck: boolean = true) {

        for (var i: number = 0; i < pais.length; i++) {
            var cardView: CardView = CardView.create(dir, style, pais[i]);
            cardView.index = i;
            var o = GSConfig.getPosByIndex(dir, style, i);
            cardView.posView(sx + o.x, sy + o.y);
            cardView.visible = visible;
            mjView.addHandCard(cardView);
            if (dir == 1 && activate && GSConfig.handCardActivate) {
                cardView.addClick(this.onCardClick, this);
                cardView.activate();
            }
        }

        var catchPos = GSConfig.catchPos[dir];
        //如果出牌长度范围
        if (lensCheck && GSConfig.handLens[pais.length]) {
            catchPos.x = cardView.pos.x + catchPos.dx;
            catchPos.y = cardView.pos.y + catchPos.dy;
            cardView.posView(catchPos.x, catchPos.y);
        } else {
            o = GSConfig.getPosByIndex(dir, style, i);
            catchPos.x = sx + o.x + catchPos.dx;
            catchPos.y = sy + o.y + catchPos.dy;
        }
    }

    //进入结算界面
    intoResultView() {
        this.showStateView();
        this.gsResultView.update();
    }

    //初次发牌
    createAllHandPai() {

        var style = 1;

        for (var dir: number = 1; dir <= 4; dir++) {

            var pais = PublicVal.i.getHandPais(dir);

            var pos = GSConfig.handPosPlus[dir];

            var mjView = this.gsView.MJViews[dir];

            this.createIndexPais(mjView, pos.x, pos.y, dir, style, pais, false);

        }
    }

    sameCardViews: CardView[];

    //移出
    moveTo(card: CardView) {
        if (!card)return;

        card.moveUp();
        this.showLightSame(card.pai);//高亮池中牌相同牌

        this.activateCard = card;
    }

    //移回
    moveBack(tween: boolean = true) {
        if (!this.activateCard) return;

        tween ? this.activateCard.moveDown() : this.activateCard.resetPos();

        this.clearActivateCard();
    }

    onCardClick(e: egret.TouchEvent) {
        var cardView: CardView = <CardView>e.currentTarget;
        if (!cardView)return;

        if (PublicVal.state == StateType.shuffle || PublicVal.state == StateType.fen || PublicVal.state == StateType.win || PublicVal.state == StateType.ting) return;

        switch (game.status) {
            case GameStatus.changeThree:
                if (game.changeThreeVo.hasCard(cardView.pai)) {
                    cardView.moveDown(true);
                    game.changeThreeVo.delCard(cardView.pai);
                }
                else if (game.changeThreeVo.addCard(cardView.pai)) {
                    cardView.moveUp(true);
                }
                break;
            case GameStatus.missing:
                break;
            case GameStatus.gamestart:
                if (this.activateCard == cardView) {
                    if (GSData.i.turnDir == 1 && GSConfig.handLens[PublicVal.i.getHandPais(1).length] && this.allowPushCard) {//进入打牌
                        //进入打牌

                        var pai = this.activateCard.pai;


                        if (GSData.i.readyTing) {

                            //发送听牌
                            SocketManager.getInstance().getGameConn().send(15, {"args": {"action": 4, "pai": [pai]}});

                            PublicVal.state = -4;

                            GSData.i.readyTing = false;

                            this.hideFuncSelectMenu();

                        } else {

                            SocketManager.getInstance().getGameConn().send(4, {"args": pai});

                            this.gsView.resetAllChildrenTouch();

                            console.log("发送自己的打牌信息", pai);
                        }

                        this.allowPushCard = false;

                        this.startPushTimeInterval();
                    } else if (!GSData.i.gang_end && GSData.i.zhuangDir == 1) {//开局轮杠中
                        EffectUtils.showTips("等待其他玩家杠牌，请稍后...", 5);
                    }
                } else {
                    this.moveBack();
                    this.moveTo(cardView);
                }
                break;
        }
    }

    //出牌计时器,判断出牌间隔时间再次出牌(防止服务器无响应)
    interval: number;
    allowPushCard: boolean;

    startPushTimeInterval() {
        this.interval = egret.setTimeout(this.stopPushTimeInterval, this, 1000);
    }

    stopPushTimeInterval() {
        egret.clearTimeout(this.interval);
        this.allowPushCard = true;
    }

    //删除池子牌
    removePoolCard(dir: number) {

        var mjview = GSController.i.gsView.MJViews[dir];

        mjview.removePoolCard();
    }

    //添加池中牌显示
    pushPoolCard(dir: number, pai: any) {

        var mjview = GSController.i.gsView.MJViews[dir];

        var cardView: CardView = CardView.create(dir, 4, pai);

        var o = GSConfig.getPoolPos(dir, pai.poolIndex);

        cardView.posView(o.x, o.y);

        cardView.x = o.sx;
        cardView.y = o.sy;
        // cardView.scaleX = cardView.scaleY = 1.5;

        egret.Tween.get(cardView).to({x: o.x, y: o.y, scaleX: 1, scaleY: 1}, 400);

        mjview.addPoolCard(cardView);


        this.updateMJView(dir);
        //听牌状态
        if (PublicVal.state == -4) {

            this.tingingView();
        }

        this.playTimeEffect(false);

        //显示新出的牌
        game.manager.dispatchEvent(EffectEventType.CardThrow, [dir, pai]);
        //显示新出的牌提示点
        game.manager.dispatchEvent(EffectEventType.CardThrowTips, [dir, cardView]);
    }

    //显示吃牌种类选择
    showChiSelectView() {

        var funcSelect = GSData.i.getFuncSelectByIndex(1);

        this.gsView.funcSelectView.updateGroupConViewByChi(funcSelect.group);

    }

    //显示杠的选择界面
    showGangSelectView() {

        var funcSelect = GSData.i.getFuncSelectByIndex(3);

        this.gsView.funcSelectView.updateGroupConViewByGang(funcSelect.group);

    }

    //显示补蛋的选择界面
    showBudanSelectView() {
        var funcSelect = GSData.i.getFuncSelectByIndex(4);

        this.gsView.funcSelectView.updateGroupConViewByBudan(funcSelect.group);

    }

    //显示吃碰杠功能菜单
    showFuncSelectMenu(tip: boolean = true) {

        if (PublicVal.state == StateType.gamestart && GSData.i.funcSelects.length > 0) {

            this.moveBack(false);

            this.gsView.funcSelectView.visible = true;

            this.gsView.funcSelectView.updateFuncView(GSData.i.funcSelects);

            //TODO 相关手牌提示
            if (tip) game.manager.dispatchEvent(EffectEventType.CardRaise, CardRaiseMode.funcmenu);
        }
    }

    /**
     * 显示总结算页面
     */
    showTitleView(data: any) {
        if (!this.gsTitleView) this.gsTitleView = new GSTotleView();

        this.gsTitleView.show(data);
    }

    hideFuncSelectMenu() {

        //GSData.i.roundStartHasFunction = false;

        this.gsView.funcSelectView.visible = false;

        this.gsView.funcSelectView.clearGroupConView();

        GSData.i.isShowFunc = false;

        //TODO 相关手牌提示
        game.manager.dispatchEvent(EffectEventType.CardRaise);
    }

    addCardClick(view: CardView) {
        view.activate();
        view.addClick(this.onCardClick, this);
    }

    //根据pos设置轮盘方向
    setBoomDir(pos: number) {

        this.gsView.centerBoom.bg.rotation = 90 * pos - 180;

    }

    setArrowDir(dir: number) {

        this.gsView.centerBoom.setArrowDir(dir);

    }

    clear() {

        /*        for(var i:number = 1;i <= 4;i++){
         GSConfig.dymnicHandPos[i].x = GSConfig.handPosPlus[i].x;
         GSConfig.dymnicHandPos[i].y = GSConfig.handPosPlus[i].y;

         }*/
        this.allowPushCard = true;

        this.isAllowFuncClick = true;

        this.clearActivateCard();

        this.clearDelayPushInterval();
    }

    playEffect(dir: number, action: number) {

        // this.gsView.playFuncEffect(dir, action);

    }


    updateRebackPais() {

        for (var i: number = 1; i <= 4; i++) {

            this.updateMJView(i, true);
        }
    }

    /*
     更新牌面
     updatePool 是否更新池牌
     lensCheck 长度检测是否提出最后一张牌
     */
    updateMJView(dir: number, updatePool: boolean = false, lensCheck: boolean = true) {

        if (dir == 1) {
            this.clearActivateCard();
        }

        var mjView = this.gsView.MJViews[dir];

        mjView.removeAllHandCard();

        var funcPais = PublicVal.i.getFuncPais(dir);
        var handPais = PublicVal.i.getHandPais(dir);

        var mjView: MJView = this.gsView.MJViews[dir];
        var handStyle: number = GSConfig.handStylesPlus[dir];

        var pos = funcPais.length > 0 ? GSConfig.funcPos[dir] : GSConfig.handPosPlus[dir];

        //var pos = GSConfig.handPosPlus[dir];

        var sPosX: number = pos.x;
        var sPosY: number = pos.y;

        //解析功能牌型
        if (funcPais.length > 0) {

            for (var i: number = 0; i < funcPais.length; i++) {

                var obj = funcPais[i];

                var action = obj.action;

                var pais = obj.pais;

                switch (action) {

                    case 1://吃
                    case 2://碰

                        for (var j: number = 0; j < pais.length; j++) {

                            var jpai = pais[j];

                            var kLen: number = jpai.pai.length;

                            for (var k: number = 0; k < kLen; k++) {

                                var cardView: CardView = CardView.create(dir, 3, jpai.pai[k]);

                                var o = GSConfig.getPosByIndex(dir, 3, k);

                                cardView.posView(sPosX + o.x, sPosY + o.y);

                                mjView.addHandCard(cardView);

                            }
                            sPosX += pos.dx;
                            sPosY += pos.dy;
                        }
                        break;
                    case 22://幺九杠
                        for (var j: number = 0; j < pais.length; j++) {

                            var jpai = pais[j];

                            for (var k: number = 0; k < 3; k++) {

                                var cardView: CardView = CardView.create(dir, 3, jpai.pai[k], jpai.ever[k]);

                                var o = GSConfig.getPosByIndex(dir, 3, k);

                                cardView.posView(sPosX + o.x, sPosY + o.y);

                                mjView.addHandCard(cardView);

                            }
                            sPosX += pos.dx;
                            sPosY += pos.dy;
                        }

                        break;
                    case 24://暗杠

                        //上杠牌的位置
                        var g = GSConfig.diePaiPos[dir];

                        var style: number;

                        var anGangStyle = GSConfig.anGangStylePlus[dir];

                        for (var j: number = 0; j < pais.length; j++) {

                            var jpai = pais[j];

                            for (var k: number = 0; k < 4; k++) {
                                var gx: number = 0;
                                var gy: number = 0;

                                if (k == 3) {
                                    style = anGangStyle;
                                    gx = g.x;
                                    gy = g.y;
                                } else {
                                    style = 2;
                                }
                                var cardView: CardView = CardView.create(dir, style, jpai.pai[k]);

                                var o = GSConfig.getPosByIndex(dir, style, k);

                                cardView.posView(sPosX + o.x + gx, sPosY + o.y + gy);

                                mjView.addHandCard(cardView);

                            }
                            sPosX += pos.dx;
                            sPosY += pos.dy;
                            if (dir == 2) {
                                cardView.parent.setChildIndex(cardView, cardView.parent.numChildren - 1);
                            }
                        }


                        break;
                    case 25://明杠

                        var g = GSConfig.diePaiPos[dir];

                        var style: number = 3;

                        for (var j: number = 0; j < pais.length; j++) {

                            var jpai = pais[j];

                            for (var k: number = 0; k < 4; k++) {
                                var gx: number = 0;
                                var gy: number = 0;
                                if (k == 3) {
                                    gx = g.x;
                                    gy = g.y;
                                }
                                var cardView: CardView = CardView.create(dir, style, jpai.pai[k]);

                                var o = GSConfig.getPosByIndex(dir, style, k);

                                cardView.posView(sPosX + o.x + gx, sPosY + o.y + gy);

                                mjView.addHandCard(cardView);

                            }
                            sPosX += pos.dx;
                            sPosY += pos.dy;
                            if (dir == 2) {

                                cardView.parent.setChildIndex(cardView, cardView.parent.numChildren - 1);
                            }
                        }
                        break;
                    case 26:

                        for (var j: number = 0; j < pais.length; j++) {

                            var jpai = pais[j];

                            for (var k: number = 0; k < 3; k++) {

                                var cardView: CardView = CardView.create(dir, 3, jpai.pai[k], jpai.ever[k]);

                                var o = GSConfig.getPosByIndex(dir, 3, k);

                                cardView.posView(sPosX + o.x, sPosY + o.y);

                                mjView.addHandCard(cardView);

                            }
                            sPosX += pos.dx;
                            sPosY += pos.dy;
                        }
                        break;
                }

            }

        }


        GSConfig.dymnicHandPos[dir].x = sPosX;
        GSConfig.dymnicHandPos[dir].y = sPosY;

        //解析手牌
        if (handPais.length > 0) {
            this.createIndexPais(mjView, sPosX, sPosY, dir, handStyle, handPais, true, true, lensCheck);

            if (updatePool) {
                //池牌
                /* mjView.removeAllPoolCard();

                 for (var i: number = 0; i < poolPais.length; i++) {
                 var cardView: CardView = CardView.create(dir, 4, poolPais[i]);
                 var o = GSConfig.getPoolPos(dir, i);
                 cardView.posView(o.x, o.y);
                 mjView.addPoolCard(cardView);
                 }*/
                this.updatePoolPaiView(dir);
            }
        }
    }

    updatePoolPaiView(dir: number) {

        var poolPais = PublicVal.i.getPoolPais(dir);
        var mjView = this.gsView.MJViews[dir];
        mjView.removeAllPoolCard();
        for (var i: number = 0; i < poolPais.length; i++) {
            var cardView: CardView = CardView.create(dir, 4, poolPais[i]);
            var o = GSConfig.getPoolPos(dir, i);
            cardView.posView(o.x, o.y);
            mjView.addPoolCard(cardView);
        }
    }

    //播放手牌特效
    playWinEffect() {


        var mjView: MJView = this.gsView.MJViews[1];

        for (var i: number = 0; i < mjView.handCon.numChildren; i++) {

            var card: CardView = <CardView>mjView.handCon.getChildAt(i);

            if (card.index > -1) {

                egret.Tween.get(card).to({}, card.index * 50).to({y: card.pos.y - 30}, 100).to({y: card.pos.y}, 150);

            }

        }
    }

    /*
     显示相同牌
     */
    showLightSame(pai: any) {

        for (var i: number = 1; i <= 4; i++) {

            var mjView: MJView = this.gsView.MJViews[i];

            var handCon = mjView.handCon;

            var poolCon = mjView.poolCon;


            for (var k: number = 0; k < handCon.numChildren; k++) {
                var cardView: CardView = <CardView>handCon.getChildAt(k);
                if (cardView.index == -1
                    && cardView.pai
                    && cardView.pai.number == pai.number
                    && cardView.pai.type == pai.type) {
                    cardView.enabled = false;
                    this.sameCardViews.push(cardView);
                }
            }

            for (var k: number = 0; k < poolCon.numChildren; k++) {
                var cardView: CardView = <CardView>poolCon.getChildAt(k);
                if (
                    cardView.pai
                    && cardView.pai.number == pai.number
                    && cardView.pai.type == pai.type) {
                    cardView.enabled = false;
                    this.sameCardViews.push(cardView);
                }
            }
        }
    }

    /*
     隐藏相同牌
     */
    hideLightSame() {

        while (this.sameCardViews.length) {

            this.sameCardViews.shift().enabled = true;
        }

    }


    //处理听牌
    doTing() {

        GSData.i.readyTing = true;

        var funcSelect = GSData.i.getFuncSelectByIndex(5);

        var group = funcSelect.group;

        var playPais = [];

        for (var i = 0; i < group.length; i++) {

            var obj = group[i];

            playPais.push(obj.play);
        }
        GSData.i.funcSelects = [{index: 0, action: 0, pai: null}];

        //GSData.i.roundStartHasFunction = true;

        this.showFuncSelectMenu(false);

        this.readyTingView(playPais);

    }

    //准备听牌的牌面
    readyTingView(pais: any[]) {

        var handCon = this.gsView.MJViews[1].handCon;

        for (var i: number = 0; i < handCon.numChildren; i++) {

            var card = <CardView>handCon.getChildAt(i);

            if (card.index > -1) {

                card.enabled = false;
                card.touchEnabled = false;

                for (var j: number = 0; j < pais.length; j++) {

                    var p = pais[j];

                    if (p.number == card.pai.number && p.type == card.pai.type) {

                        card.enabled = true;
                        card.touchEnabled = true;

                        pais.splice(j, 1);

                        break;
                    }
                }
            }
        }
    }

    //取消听牌的牌面
    cancleTingView() {

        var handCon = this.gsView.MJViews[1].handCon;

        for (var i: number = 0; i < handCon.numChildren; i++) {

            var card = <CardView>handCon.getChildAt(i);

            if (card.index > -1) {

                card.enabled = true;

                card.touchEnabled = true;
            }
        }
    }

    //听牌中的牌面设置
    tingingView(boo: boolean = false) {

        var handCon = this.gsView.MJViews[1].handCon;

        for (var i: number = 0; i < handCon.numChildren; i++) {

            var card = <CardView>handCon.getChildAt(i);

            if (card.index > -1) {

                card.touchEnabled = false;

                card.enabled = boo;
            }
        }

    }


    //刷新手牌大小
    updateHandViewSize() {

        if (PublicVal.state == StateType.gamestart) {

            var mjView = this.gsView.MJViews[1];

            var pos = GSConfig.dymnicHandPos[1];

            if (PublicVal.i.getFuncPais(1).length == 0) {//无功能牌

                pos = GSConfig.handPosPlus[1];
            }

            var scale = GSConfig.posRulePlus[1][1].scale;

            for (var i: number = 0; i < mjView.handCon.numChildren; i++) {

                var card = <CardView>mjView.handCon.getChildAt(i);

                if (card.index > -1) {

                    var o = GSConfig.getPosByIndex(1, 1, card.index);

                    card.changeScale(scale);

                    //card.posView(GSConfig.dymnicHandPos[1].x + o.x, card.y);
                    card.pos.x = pos.x + o.x;

                    card.x = card.pos.x;
                }
            }

            var pais = PublicVal.i.getHandPais(1);

            var catchPos = GSConfig.catchPos[1];
            //如果出牌长度范围
            if (GSConfig.handLens[pais.length]) {
                catchPos.x = card.pos.x + catchPos.dx;
                catchPos.y = card.pos.y + catchPos.dy;
                card.posView(catchPos.x, card.y);

            } else {
                o = GSConfig.getPosByIndex(1, 1, card.index + 1);
                catchPos.x = pos.x + o.x + catchPos.dx;
                catchPos.y = pos.y + o.y + catchPos.dy;
            }

        }
    }

    //更新游戏风格
    updateGameStyle() {


        if (PublicVal.state == StateType.gamestart || PublicVal.state == 6) {

            this.scene.updateTableBG();

            this.gsView.baoPaiView.cardView.changeBGStyle();
            this.gsResultView.baoPaiView.cardView.changeBGStyle();

            for (var i: number = 1; i <= 4; i++) {

                var mjView = this.gsView.MJViews[i];

                for (var j: number = 0; j < mjView.handCon.numChildren; j++) {

                    var cardView = <CardView>mjView.handCon.getChildAt(j);
                    cardView.changeBGStyle();
                }
                for (var j: number = 0; j < mjView.poolCon.numChildren; j++) {

                    var cardView = <CardView>mjView.poolCon.getChildAt(j);
                    cardView.changeBGStyle();
                }
            }
        }
    }


    nullAllHead() {
        for (var i: number = 1; i <= 4; i++) {
            this.gsView.headViews[i].clean();
        }
    }

    //更新replay房间信息
    updateReplayRoom(dirPersons: any) {
        for (var i: number = 1; i <= 4; i++) {
            var headView = this.gsView.headViews[i];
            var person: any = dirPersons[i];
            headView.setState(HeadIconState.ingame);
            headView.update(person);
        }
    }
}