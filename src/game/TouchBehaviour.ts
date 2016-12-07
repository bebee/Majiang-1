/**
 * Created by Administrator on 2016/11/18.
 */
class TouchBehaviour implements IGameTapEvent{



    static _i  : TouchBehaviour;

    static get i(){
        return TouchBehaviour._i || (TouchBehaviour._i = new TouchBehaviour);
    }

    onBGTap(){
        GSController.i.moveBack();
    }

    onFuncSelect(funcIndex:number):void{

        var obj = GSData.i.funcSelects[funcIndex];

        switch(obj.index){

            case 0://过

                SocketManager.getInstance().getGameConn().send(15, {"args":{"action":obj.action, "pai":[]}});

                GSController.i.hideFuncSelectMenu();

                if(GSData.i.readyTing){

                    GSData.i.readyTing = false;

                    GSController.i.cancleTingView();

                    GSController.i.activateCard = null;
                }

                /*GSData.i.isTing = false;

                GSController.i.enablesHandPais();*/

                break;

            case 1://吃

                GSData.i.chiObj = obj;

                GSController.i.funcSelectAction = 1;

                //显示吃的提示框
                GSController.i.showChiSelectView();

                break;

            case 2://碰

                SocketManager.getInstance().getGameConn().send(15, {"args":{"action":obj.action, "pai":obj.pai}});

                GSController.i.hideFuncSelectMenu();

                break;

            case 3://杠

                GSController.i.funcSelectAction = 3;

                //显示杠的选择
                GSController.i.showGangSelectView();

                //SocketManager.getInstance().getGameConn().send(15, {"args":{"action":obj.action, "pai":obj.pai}});

                //this.hideFuncSelectMenu();

                break;
            case 4://补蛋

                GSController.i.funcSelectAction = 4;

                GSController.i.showBudanSelectView();

                break;
            case 5://听

                console.log("听牌处理");

                GSController.i.hideFuncSelectMenu();

                //GSData.i.isShowFunc = true;

                GSController.i.doTing();

                break;

            case 6://胡牌

                SocketManager.getInstance().getGameConn().send(15, {"args":{"action":obj.action, "pai":[]}});

                GSController.i.hideFuncSelectMenu();

                break;

        }

    }
    //牌型选择
    onGroupSelect(index: number): void {

        if(GSController.i.funcSelectAction == 1){//吃

            var funcSelect = GSData.i.getFuncSelectByIndex(1);

            var pais = [funcSelect.group[index].pai[0],funcSelect.group[index].pai[2]];

            SocketManager.getInstance().getGameConn().send(15, {"args":{"action":1, "pai":pais}});

        }
        if(GSController.i.funcSelectAction == 3) {//杠

            var funcSelect = GSData.i.getFuncSelectByIndex(3);
            var pai = funcSelect.group[index].pai;
            var action = funcSelect.group[index].action;
            //发送消息
            SocketManager.getInstance().getGameConn().send(15, {"args": {"action": action, "pai": pai}});
        }

        if(GSController.i.funcSelectAction == 4) {//补蛋

            var funcSelect = GSData.i.getFuncSelectByIndex(4);

            var pai = funcSelect.group[index].pai;
            var action = funcSelect.group[index].action;
            //发送消息
            SocketManager.getInstance().getGameConn().send(15, {"args": {"action": action, "pai":[pai]}});

        }
        GSController.i.hideFuncSelectMenu();

    }

    onShareGame(): void
    {
        Weixin.onClickShare(GSData.i.result.person);
    }

    //继续游戏
    onContinue(): void {
        //清理结算界面内容
        GSController.i.closeResultView();

        if(GSController.i.jiesuanData) {

            //清理回合数据
            PublicVal.state = 5;

            GSController.i.showStateView();

            GSController.i.showTitleView(GSController.i.jiesuanData);

        }else{

            //清理回合数据
            GSData.i.roundReset();

            SocketManager.getInstance().getGameConn().send(17, {});

        }
    }

    onSettingTap() {

        StackManager.open(SettingDialog, "SettingDialog");

    }

    onQuitTap()
    {
        this.onJiesanTap();
    }

    /**
     * 打开聊天
     */
    onTalkTap()
    {
        StackManager.open(ChatDialog, "ChatDialog");
    }

    onSiriBegin(): void
    {
        Weixin.startRecord();
        Global.showVoice();
    }

    onSiriEnd(): void
    {
        Weixin.stopRecord();
        Global.hideVoice();
    }

    //重连继续按钮
    onRebackContinue(e:egret.TouchEvent):void{

        e.currentTarget.visible = false;

        SocketManager.getInstance().getGameConn().send(17, {});

    }
    //踢人请求
    onKillTouch(pos:number){

        SocketManager.getInstance().getGameConn().send(22, {"args":{"pos":pos}});

    }
    //解散房间
    onJiesanTap(): void
    {

        if(PublicVal.state == 2 || PublicVal.state == 3 || PublicVal.state == -4)
        {
            GameLayerManager.gameLayer().messagBox.showMsg(function (r)
            {
                if(r)
                {
                    SocketManager.getInstance().getGameConn().send(14, {"args":{"answer":1}});//发起解散房子
                    var dialog:DissolutionDialog = StackManager.findDialog(DissolutionDialog, "DissolutionDialog");
                    dialog.isClick = true;
                }
            }, "您确定发起解散房间吗？\n（当所有在线玩家同意解散之后房间将解散）");
        }else if(PublicVal.state == 6){

            GameLayerManager.gameLayer().messagBox.showMsg(function (r)
            {
                if(r)
                {
                    Replayer.i.exit();
                }
            }, "您确定要退出回放吗？");

        }
        else
        {
            var info : string;

            if(GSData.i.roomOwnDir == 1) {
                info = "您未开始一局游戏，解散房间不扣房卡，\n是否解散？";

            }else{
                info = "您确定要离开房间吗？";
            }

            GameLayerManager.gameLayer().messagBox.showMsg(function (r)
            {
                if(r)
                {
                    SocketManager.getInstance().getGameConn().send(12, {});   //离开房子
                }
            }, info);
        }

    }
    //回到微信
    onWeixinTap(): void {

        Weixin.closeWindow();
    }
    //游戏开始
    onStartGame():void
    {
        SocketManager.getInstance().getGameConn().send(10, {});  //发送开始游戏
    }
    //邀请好友
    onInvite(): void {

        Global.showShare(true);

        Weixin.onMenuShareAppMessage(GSData.i.roomID + "");

        Weixin.onMenuShareTimeline(GSData.i.roomID + "");
    }

    onHeadTouch(dir: number): void{

        var player = null;

        if(PublicVal.state == 6){

            return;

        }else {

            player = GSData.i.getRoomPlayerByDir(dir);

        }
        if(!player) return;

        var d:RoleInfoDialog = StackManager.findDialog(RoleInfoDialog, "RoleInfoDialog");
        if(d)
        {
            d.show();
            d.refreshRole(player);
        }

    }


    onReplayPlayTap(): void {

        Replayer.i.stop = false;

        GSController.i.gsView.replayControllView.play();

    }

    onReplayPauseTap(): void {

        Replayer.i.stop = true;

        GSController.i.gsView.replayControllView.pause();

    }

    onReplayFFTap(): void {

        Replayer.i.FF();

        Replayer.i.stop = false;

        GSController.i.gsView.replayControllView.play();
    }

    onReplayFBTap(): void {

        Replayer.i.FB();

        Replayer.i.stop = false;

        GSController.i.gsView.replayControllView.play();
    }

}