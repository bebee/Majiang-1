/**
 * Created by Administrator on 2016/10/28.
 */

//主控制器
class GSController extends egret.EventDispatcher{

    static _i:GSController;

    static get i(){

        return GSController._i || (GSController._i = new GSController);
    }

    scene:GSScene;

    gsView:GSView;

    gsResultView:GSResultView;

    gsTitleView:GSTotleView;

    activateCard:CardView = null;

    bg:egret.Bitmap;

    isAllowFuncClick:boolean;

    funcSelectAction:number;

    jiesuanData:any;

    constructor(){
        super();
        this.init();
    }

    initView(){
        var main = GameLayerManager.gameLayer().mainLayer;
        main.addChild(this.scene = new GSScene);

        this.gsView = this.scene.gsView;
        this.gsResultView = this.scene.gsResultView;

        this.gsView.bindInterface(TouchBehaviour.i);
        this.gsView.funcSelectView.bindInterface(TouchBehaviour.i);
        this.scene.bindInterface(TouchBehaviour.i);
        this.gsResultView.bindInterface(TouchBehaviour.i);

    }
    init(){

        this.isAllowFuncClick = true;

        this.allowPushCard  = true;

        this.sameCardViews = [];

        GSUpdate.i.start();

        GSStateMgr.i.init();

        this.initView();

    }

    //启动游戏主界面
    startView(){

        GameLayerManager.gameLayer().openMainLayer();

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
    showStateView(){

        switch(GSData.i.game_state){

            case 1://首次加入牌桌界面

                this.visibleTwoFuncButton(true,true);
                this.visibleFourFuncButton(false);
                this.visibleReadyIcon();
                this.visibleRoomOwn();
                this.visibleZhuang();

                this.gsView.visible = true;
                this.gsView.baoPaiView.visible = false;
                this.gsView.centerBoom.visible = false;
                this.gsResultView.visible = false;

                this.scene.waitText.visible = true;
                this.scene.waitText.text = "等待其他玩家，请稍后...";
                this.scene.startButton.visible = false;
                this.scene.inviteButton.visible = false;
                this.scene.ruleText.visible = true;


                this.gsView.readyStateHeadReset();


                this.updateGangCur();

                break;
            case 2://继续牌桌界面

                this.gsResultView.visible = false;

                this.visibleTwoFuncButton(true,false);
                this.visibleFourFuncButton(false);
                this.visibleReadyIcon();
                this.visibleRoomOwn();
                this.visibleZhuang();

                this.gsView.visible = true;
                this.gsView.baoPaiView.visible = false;
                this.gsView.centerBoom.visible = false;
                this.gsResultView.visible = false;


                this.scene.waitText.visible = true;
                this.scene.waitText.text = "等待其他玩家，请稍后...";
                this.scene.startButton.visible = false;
                this.scene.inviteButton.visible = false;
                this.scene.ruleText.visible = true;
                this.gsView.readyStateHeadReset();


                this.updateGangCur();

                break;
            case 3://进入牌局界面

                this.gsView.visible = true;

                this.scene.waitText.visible = false;
                this.scene.startButton.visible = false;
                this.scene.inviteButton.visible = false;
                this.scene.ruleText.visible = true;

                this.visibleTwoFuncButton(false,false);
                this.visibleFourFuncButton(true);

                this.gsView.hideReadyIcons();
                this.visibleZhuang();

                this.gsView.centerBoom.visible = true;
                this.gsView.baoPaiView.visible = true;

                this.gsView.playStateHeadReset();

                this.updateGangCur();

                this.scene.readyButton.visible = false;

                break;
            case 4://进入每轮牌局结算界面
                GSData.i.readyFlag = 0;
                this.gsResultView.visible = true;
                this.closeGSView();

                break;
            case 5://总结算界面
                this.closeGSView();
                this.gsResultView.visible = false;

                break;
        }
    }

    closeGSView(){
        this.visibleTwoFuncButton(false,false);
        this.hideLightSame();
        this.gsView.visible = false;
        this.hideFuncSelectMenu();
        this.gsView.clearTips();
        this.gsView.clearMJView();
        this.scene.ruleText.visible = false;
        this.scene.readyButton.visible = false;
        this.scene.waitText.visible = false;
        this.playTimeEffect(false,false);
        GameDispatcher.ins.dispatchEvent(EventType.Trigger_Play_Point);
        GameDispatcher.ins.dispatchEvent(EventType.Trigger_Play_Tips);
    }


    closeResultView(){

        this.gsResultView.clear();

        this.gsResultView.visible = false;

    }

    //显示隐藏两个功能按钮(解散房间和返回微信)
    visibleTwoFuncButton(boo1:boolean,boo2:boolean){

        this.scene.weixinButton .visible = boo1;
        this.scene.jiesanButton .visible = boo1;  //bool2

    }
    //显示隐藏两个功能按钮(设置/解散/语音)
    visibleFourFuncButton(boo:boolean) {
        this.gsView.rightButtonCon.visible = this.gsView.rightTopButtonCon.visible = boo;
    }

    //刷新杠的分数
    updateGangCur(){

        for(var i:number = 1; i <= 4 ;i++){

            this.gsView.headViews[i].numText.text = "" + GSData.i.gangCurs[i];

        }
    }


    //刷新房间人员信息
    updateRoom() {

        this.scene.updateRoomID(GSData.i.roomID);
        this.scene.updateRule(GSData.i.rules);
        this.gsView.updateRoom();
        this.visibleReadyIcon();

        this.visibleStartButton();


    }

    //开始按钮的显示和隐藏
    visibleStartButton(){

        if(GSData.i.game_state == 1) {

            var hasLeave:boolean = false;

            var allOnline:boolean = true;




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

            if(GSData.i.ownPos == 1) {//房主

                if (hasLeave) { //有空位

                    this.scene.inviteButton.visible = true;
                    this.scene.waitText.visible = false;
                } else {
                    this.scene.inviteButton.visible = false;
                    this.scene.waitText.visible = true;
                    this.scene.waitText.text = "等待其他玩家，请稍后...";

                }

                if (allOnline) {//都准备好

                    this.scene.waitText.visible = false;

                    this.scene.startButton.visible = true;

                } else {

                    this.scene.startButton.visible = false;
                }
            }else{//不是房主

                if (allOnline) {//都准备好

                    this.scene.waitText.text = "等待房主开始游戏，请稍后...";

                }else{

                    this.scene.waitText.text = "等待其他玩家，请稍后...";

                }
            }
        }
    }
    exit(){

        GSData.i.clear();

        this.clear();

        this.closeGSView();

        if(this.gsTitleView) this.gsTitleView.onClose();

        this.closeResultView();

        GameLayerManager.gameLayer().openSceneLayer();

    }

    //返回游戏
    rebackGame(){

        this.clear();

        this.showStateView();

        this.gsView.updateBaoPai(GSData.i.baoPai);

        this.gsResultView.updateBaoPai(GSData.i.baoPai);

        this.setBoomDir(GSData.i.ownPos);

        this.setArrowDir(GSData.i.turnDir);

        this.updateCenterInfo();

        this.updateRebackPais();

        this.showFuncSelectMenu();
    }

    //开始游戏
    startGame(){

        this.clear();

        this.showStateView();

        this.gsView.updateBaoPai(GSData.i.baoPai);
        this.gsResultView.updateBaoPai(GSData.i.baoPai);

        this.setBoomDir(GSData.i.ownPos);

        //设置庄家抓牌位光标
        this.setArrowDir(GSData.i.zhuangDir);

        this.updateCenterInfo();

        //进入开场效果

        GSData.i.game_state = -1;

        GSStateMgr.i.setState(GSState.State_HeadToTarget);

        this.isAllowFuncClick = false;

    }


    //显示隐藏某个方位准备图标和踢人图标
    visibleReadyIcon() {

        if(GSData.i.game_state == 1 || GSData.i.game_state == 2) {

            for (var i: number = 1; i <= 4; i++) {

                var readyIcon = this.gsView.readyIcons[i];

                var killIcon = this.gsView.getHeadView(i).headIcon.killIcon;

                readyIcon.visible = (GSData.i.readyFlag >> i & 1) == 1;

                if (GSData.i.game_state == 1 && i > 1 && GSData.i.ownPos == 1) {

                    killIcon.visible = readyIcon.visible;
                }else{

                    killIcon.visible = false;
                }

            }
        }
    }

    //更新庄家
    visibleZhuang(){

        for(var i:number = 1;i<= GSConfig.playerCount;i++){

            this.gsView.getHeadView(i).visibleZhuang((GSData.i.zhuangFlag >> i & 1) == 1);

        }
    }
    //更新房主
    visibleRoomOwn(){

        for(var i:number = 1;i<= GSConfig.playerCount;i++){

            this.gsView.getHeadView(i).visibleRoomOwn((GSData.i.roomOwnFlag >> i & 1) == 1);

        }
    }

    //播放时间特效
    playTimeEffect(boo:boolean,shake:boolean = false){

        if(boo) {
            this.gsView.centerBoom.timeEffect.play(shake);
        }else{
            this.gsView.centerBoom.timeEffect.reset();
        }
    }


    //抓牌
    catchCard(dir:number) {

        var mjView = this.gsView.MJViews[dir];

        var pos = GSConfig.catchPos[dir];

        var catchPai = GSData.i.getCatchPai(dir);

        var cardView = CardView.create(dir, 1, catchPai);

        cardView.index = GSData.i.getHandPais(dir).length - 1;

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

            this.playTimeEffect(true,true);

        }else{

            this.playTimeEffect(true,false);
        }

        if(GSData.i.game_state == -2){

            this.playTimeEffect(false,false);
        }

    }

    clearActivateCard(){

        this.hideLightSame();

        this.activateCard = null;

    }

    //更新剩余牌数量 和圈数
    updateCenterInfo(){

        this.gsView.centerBoom.updateLeftCount(GSData.i.leftCount);

        this.gsView.centerBoom.updateRoundCount(GSData.i.cur_round,GSData.i.max_round);

    }

    roundPlay(){//牌局开始

        GSData.i.game_state = 3;

        GSData.i.pushStartHandPai();

        GSController.i.isAllowFuncClick = true;

        GSController.i.catchCard(GSData.i.zhuangDir);

        GSController.i.scene.playFight();

        GSController.i.showFuncSelectMenu();

    }



    //播放换宝
    playBao(){

        this.gsView.playBaoEffect();
        this.gsView.updateBaoPai(GSData.i.baoPai);
        this.gsResultView.updateBaoPai(GSData.i.baoPai);

        this.updateCenterInfo();

    }

    //胡牌
    hupaiShow(){


        //摊牌
        //遍历index大于-1的牌
        var hupai = GSData.i.result.hupai;

        if(hupai != 0) {

            //别人点炮
            if (hupai.type == 17) {


                var dianPaoDir = GSData.i.getDir(GSData.i.result.dianPaoPos);

                this.removePoolCard(dianPaoDir);

            }
        }

        for(var i:number = 1 ;i <= 4;i++){

            var mjView = this.gsView.MJViews[i];

            mjView.removeIndexPai();

            var left = GSData.i.getResultPersonLeft(i);

            var cur = GSConfig.dymnicHandPos[i];

            this.createIndexPais(mjView,cur.x,cur.y,i,3,left,true,false);

        }

        //等待结算
        egret.setTimeout(_=>{this.intoResultView()},this,3000);
    }
    //创建立牌 返回抓牌区
    createIndexPais(mjView:MJView,sx:number,sy:number,dir:number,style:number,pais:any,visible:boolean = true,activate:boolean = true,lensCheck:boolean = true){

        for(var i:number = 0 ; i < pais.length;i++){

            var cardView: CardView = CardView.create(dir,style,pais[i]);
            cardView.index = i;
            var o = GSConfig.getPosByIndex(dir,style,i);

            cardView.posView(sx + o.x,sy + o.y);

            cardView.visible = visible;

            mjView.addHandCard(cardView);

            if (dir == 1 && activate) {
                cardView.addClick(this.onCardClick, this);
                cardView.activate();
            }

        }
        var catchPos = GSConfig.catchPos[dir];
        //如果出牌长度范围
        if(lensCheck && GSConfig.handLens[pais.length]){
            catchPos.x = cardView.pos.x + catchPos.dx;
            catchPos.y = cardView.pos.y + catchPos.dy;
            cardView.posView(catchPos.x,catchPos.y);

        }else{
            o = GSConfig.getPosByIndex(dir,style,i);
            catchPos.x = sx + o.x + catchPos.dx;
            catchPos.y = sy + o.y + catchPos.dy;
        }
    }

    //进入结算界面
    intoResultView(){

        this.showStateView();

        this.gsResultView.update();

    }



    //初次发牌
    createAllHandPai(){

        var style = 1;

        for(var dir:number = 1; dir <= 4 ;dir++){

            var pais = GSData.i.getHandPais(dir);

            var pos = GSConfig.handPos[dir];

            var mjView = this.gsView.MJViews[dir];

            this.createIndexPais(mjView,pos.x,pos.y,dir,style,pais,false);

        }
    }

    sameCardViews:CardView[];



    //移出
    moveTo(card:CardView){

        this.activateCard = card;

        egret.Tween.get(this.activateCard).to({y:this.activateCard.pos.y-25},50);

        //高亮池中牌相同牌

        this.showLightSame(card.pai);

    }







    moveBack(tween:boolean = true){

        if(this.activateCard) {

            if(tween) egret.Tween.get(this.activateCard).to({y:this.activateCard.pos.y},50);

            this.activateCard.y = this.activateCard.pos.y;

            this.clearActivateCard();
        }
    }

    onCardClick(e:egret.TouchEvent){

        if(GSData.i.game_state == -1 || GSData.i.game_state == -2 || GSData.i.game_state == -3) return;

        var cardView:CardView = <CardView>e.currentTarget;

        if(this.activateCard != cardView){

            this.moveBack();

            this.moveTo(cardView);

        }else{

            if(GSData.i.turnDir == 1 && GSConfig.handLens[GSData.i.getHandPais(1).length] && this.allowPushCard){

                //进入打牌

                var pai = this.activateCard.pai;

                SocketManager.getInstance().getGameConn().send(4, {"args":pai});

                this.allowPushCard = false;

                this.startPushTimeInterval();

                console.log("发送自己的打牌信息",pai);

            }else if(!GSData.i.gang_end && GSData.i.zhuangDir == 1) {//开局轮杠中

                EffectUtils.showTips("等待其他玩家杠牌，请稍后...", 5);

            }
            /*else{
                this.moveBack();
            }*/

        }

    }
    //出牌计时器,判断出牌间隔时间再次出牌(防止服务器无响应)
    interval:number;
    allowPushCard:boolean;

    startPushTimeInterval(){
        this.interval = egret.setTimeout(this.stopPushTimeInterval,this,1000);
    }
    stopPushTimeInterval(){
        egret.clearTimeout(this.interval);
        this.allowPushCard = true;
    }

    //删除池子牌
    removePoolCard(dir:number){

        var mjview = GSController.i.gsView.MJViews[dir];

        mjview.removePoolCard();
    }

    //添加池中牌显示
    pushPoolCard(dir:number,pai:any) {



        var mjview = GSController.i.gsView.MJViews[dir];

        var cardView: CardView = CardView.create(dir, 4, pai);

        var o = GSConfig.getPoolPos(dir, pai.poolIndex);

        cardView.posView(o.x, o.y);

        cardView.x = o.sx;
        cardView.y = o.sy;
        cardView.scaleX = cardView.scaleY = 1.5;

        egret.Tween.get(cardView).to({x:o.x,y:o.y,scaleX:1,scaleY:1},400,egret.Ease.backIn);

        mjview.addPoolCard(cardView);

        //刷新手牌显示
        this.updateMJView(dir);


        this.playTimeEffect(false);

        //显示新出的牌
        GameDispatcher.ins.dispatchEvent(EventType.Trigger_Play_Tips, [dir, pai]);
        //显示新出的牌提示点
        GameDispatcher.ins.dispatchEvent(EventType.Trigger_Play_Point, [dir, cardView]);
    }

    //显示吃牌种类选择
    showChiSelectView(){

        var funcSelect = GSData.i.getFuncSelectByIndex(1);

        this.gsView.funcSelectView.updateGroupConViewByChi(funcSelect.group);

    }
    //显示杠的选择界面
    showGangSelectView(){

        var funcSelect = GSData.i.getFuncSelectByIndex(3);

        this.gsView.funcSelectView.updateGroupConViewByGang(funcSelect.group);

    }
    //显示补蛋的选择界面
    showBudanSelectView(){
        var funcSelect = GSData.i.getFuncSelectByIndex(4);

        this.gsView.funcSelectView.updateGroupConViewByBudan(funcSelect.group);

    }
    //显示吃碰杠功能菜单
    showFuncSelectMenu() {

        if(GSData.i.roundStartHasFunction && GSData.i.game_state == 3) {

            this.moveBack(false);

            this.gsView.funcSelectView.visible = true;

            this.gsView.funcSelectView.updateFuncView(GSData.i.funcSelects);

            //TODO 相关手牌提示
            GameDispatcher.ins.dispatchEvent(EventType.Trigger_Prompt, true);
        }
    }

    /**
     * 显示总结算页面
     */
    showTitleView(data:any)
    {
        if(!this.gsTitleView) this.gsTitleView = new GSTotleView();

        this.gsTitleView.show(data);
    }

    hideFuncSelectMenu(){

        GSData.i.roundStartHasFunction = false;

        this.gsView.funcSelectView.visible = false;

        this.gsView.funcSelectView.clearGroupConView();

        GSData.i.isShowFunc = false;

        //TODO 相关手牌提示
        GameDispatcher.ins.dispatchEvent(EventType.Trigger_Prompt, false);
    }

    addCardClick(view:CardView){
        view.activate();
        view.addClick(this.onCardClick,this);
    }

    //根据pos设置轮盘方向
    setBoomDir(pos:number){

        this.gsView.centerBoom.bg.rotation = 90 * pos - 180;

    }
    setArrowDir(dir:number){

        this.gsView.centerBoom.setArrowDir(dir);

    }

    clear(){

        for(var i:number = 1;i <= 4;i++){

            GSConfig.dymnicHandPos[i].x = GSConfig.handPos[i].x;
            GSConfig.dymnicHandPos[i].y = GSConfig.handPos[i].y;

        }
        this.allowPushCard = true;

        this.isAllowFuncClick = true;

        this.clearActivateCard();

    }

    playEffect(dir:number,action:number){

        this.gsView.playFuncEffect(dir,action);

    }


    updateRebackPais() {

        for(var i:number = 1; i <=4 ;i++) {

            this.updateMJView(i,true);
        }
    }
    /*
        更新牌面
        updatePool 是否更新池牌
     */
    updateMJView(dir:number,updatePool:boolean = false,lensCheck:boolean = true) {

        if (dir == 1) {
            this.clearActivateCard();
        }

        var mjView = this.gsView.MJViews[dir];

        mjView.removeAllHandCard();

        var funcPais = GSData.i.getFuncPais(dir);

        var pos = funcPais.length > 0 ? GSConfig.funcPos[dir]:GSConfig.handPos[dir];

        var sPosX: number = pos.x;
        var sPosY: number = pos.y;
        var mjView: MJView = this.gsView.MJViews[dir];

        var handPais = GSData.i.getHandPais(dir);
        var poolPais = GSData.i.getPoolPais(dir);


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

                        for (var j: number = 0; j < pais.length; j++) {

                            var jpai = pais[j];

                            for (var k: number = 0; k < 4; k++) {
                                var gx: number = 0;
                                var gy: number = 0;

                                if (k == 3) {
                                    (dir == 1) && (style = 3) || (style = 2);
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

            this.createIndexPais(mjView, sPosX, sPosY, dir, 1, handPais,true,true,lensCheck);

            if (updatePool) {
                //池牌
                for (var i: number = 0; i < poolPais.length; i++) {
                    var cardView: CardView = CardView.create(dir, 4, poolPais[i]);
                    var o = GSConfig.getPoolPos(dir, i);
                    cardView.posView(o.x, o.y);
                    mjView.addPoolCard(cardView);
                }
            }
        }
        //TODO 相关手牌提示
        //GameDispatcher.ins.dispatchEvent(EventType.Pai_Tips, true);
    }

    //播放手牌特效
    playWinEffect(){


        var mjView:MJView = this.gsView.MJViews[1];

        for(var i:number = 0 ; i < mjView.handCon.numChildren;i++){

            var card:CardView = <CardView>mjView.handCon.getChildAt(i);

            if(card.index > -1){

                egret.Tween.get(card).to({},card.index * 50).to({y:card.pos.y - 30},100).to({y:card.pos.y},150);

            }

        }
    }
    /*
     显示相同牌
     */
    showLightSame(pai:any){

        for(var i:number = 1;i<=4;i++){

            var mjView:MJView = this.gsView.MJViews[i];

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

            for(var k:number = 0;k < poolCon.numChildren;k++){
                var cardView:CardView = <CardView>poolCon.getChildAt(k);
                if(
                    cardView.pai
                    && cardView.pai.number == pai.number
                    && cardView.pai.type == pai.type){
                    cardView.enabled = false;
                    this.sameCardViews.push(cardView);
                }
            }
        }
    }
    /*
     隐藏相同牌
     */
    hideLightSame(){

        while(this.sameCardViews.length){

            this.sameCardViews.shift().enabled = true;
        }

    }

    //处理听牌
    doTing() {

        var pai =[{type:1,number:4},{type:4,number:1}];

        var index = 0;

        var handCon= this.gsView.MJViews[1].handCon;

        for(var i:number = 0 ; i < handCon.numChildren;i++){

            var card = <CardView>handCon.getChildAt(i);

            if(card.index > -1){

                for(var j:number = 0 ; j <pai.length;j++){

                    var p = pai[j] ;

                    if(p.number == card.pai.number && p.type == card.pai.type){



                        index ++ ;
                    }

                }

            }
        }
    }
}

