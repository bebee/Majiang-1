/**
 * Created by Administrator on 2016/12/1.
 */
//回放播放器
class Replayer implements IUpdate{

    static _i:Replayer;

    constructor(){

        this.clear();

        GSUpdate.i.addUpdate(this);

    }

    static get i(){

        return Replayer._i || (Replayer._i = new Replayer);

    }

    static replaySpeed:number = 800;
    static startDelay:number = 1000;

    actions:any ;

    interval:number;

    passTime:number;


    dirMap:any;

    //ownPos:number;

    data:any;

    //缓存牌
    cachePaiArr:any;


    //当前步骤
    lastIndex:number;

    //步骤
    index:number;

    //是否暂停
    //isPause:boolean;

    //是否回退
    isFB:boolean;


    exitInterval:number;

    clear(){

        //this.isPause = false;
        this.isFB = false;

        this.index = 0;

        this.lastIndex = 0;

        this.passTime = 0;

        this.stop = true;

        this.actions = [];

        egret.clearTimeout(this.interval);

        egret.clearTimeout(this.exitInterval);

        //关闭控制菜单
        GSController.i.gsView.replayControllView.visible = false;

        GSController.i.gsView.replayControllView.play();
    }
    exit(){

        GSController.i.exit();

        this.clear();

        GameLayerManager.gameLayer().messagBox.hide();

        StackManager.open(RecordDialog, "RecordDialog");

    }

    /*
        回放
     */
    /*Replay(){
        this.clear();
        PublicVal.i.clear();
        this.parseData(this.data);
    }*/
    /*
        暂停
     */
    Pause(){

        //this.isPause = true;
        this.stop = true;
    }
    /*
        播放
     */
    Play() {

        this.stop = false;
    }
    /*
        快进
     */
    FF(){

        this.passTime = Replayer.replaySpeed;
    }
    /*
        回退
     */
    FB(){

        this.clearExitInterval();

        PublicVal.i.clear();
        this.isFB = true;
        this.actions = [];
        this.parseData(this.data);

        this.lastIndex -- ;
        this.prevIndex(this.lastIndex);
        this.index = this.lastIndex + 1;
        if(this.lastIndex == -1) {
            this.lastIndex = 0;
        }
        this.isFB = false;
        this.passTime = 0;

    }

    /*
     退到某步
     */
    prevIndex(index:number){

        if(index < 0 ) return;

        //console.log("--------回退开始");

        var i:number = 0;

        while( i <= index){
            this.goIndex(i);
            i++;
        }

        //console.log("--------回退结束");
        this.passTime = 0;
    }

    /*
     [?Record_Action_Static,Static],
     [?Record_Action_Init,Shou1],
     [?Record_Action_Draw,Tp1,Nu1,Turn]，
     [?Record_Action_Play,Type,Number,Turn],
     [?Record_Action_Notice,Turn,Pos,Interrupts],
     [?Record_Action_Deal,POS,Action,RtnPai]

     -1).初始化手牌
     -2).%打牌
     -3).%抓牌
     -4).%通知功能菜单
     -5).%处理功能菜单点击
     -6).%当局静态数据
     -7).%换宝
     Static6 =
     [
     data([rules]),
     data([dui_num]),
     data([cur_round]),
     data([max_round])
     ]
     Shou1 =
     [
     get_shou_origin(1),
     get_shou_origin(2),
     get_shou_origin(3),
     get_shou_origin(4)
     ]
     */
    parseData(data:any){

        if(data == null) return;

        this.data = data;

        this.parsePersons(GlobalData.getInstance().personList);

        PublicVal.i.roomid = GlobalData.getInstance().roomid;

        PublicVal.i.roomOwnFlag = 1 << this.returnDir(1);

        for(var i:number = 0 ; i <data.length;i++) {
            var arr = data[i];
            var action: number = arr[0];
            this["__action_" + action](arr,i);
        }
        this.show();
    }

    __action_7(arr:any,index:number){

        this.actions.push({index:index,action: 7, pai:arr[1]});

    }


    __action_1(arr:any,index:number){
        this.cachePaiArr = arr;
        var all = arr[1];
        for(var k:number= 0;k < all.length;k++){
            var obj = all[k];
            //1万 2条 3桶 4中发白 5东南西北
            var pais = FashionTools.formatPai(1,obj[1]).
                        concat(FashionTools.formatPai(2,obj[2])).
                        concat(FashionTools.formatPai(3,obj[3])).
                        concat(FashionTools.formatPai(4,obj[4])).
                        concat(FashionTools.formatPai(5,obj[5]));
            //console.log(pais);

            PublicVal.i.allPais[this.returnDir(k + 1)].handPais = pais;
        }
    }
    __action_2(arr:any,index:number){
        this.actions.push({action:2,pai:{type:arr[1],number:arr[2]},pos:arr[3]});
    }
    __action_3(arr:any,index:number) {
        this.actions.push({action:3,pai:{type:arr[1],number:arr[2]},pos:arr[3]});
    }
    __action_4(arr:any,index:number){

    }
    __action_5(arr:any,index:number){

        var pos:number = arr[1];

        var funcID:number = arr[2];
        switch(funcID){
            case 1://吃
            case 2://碰
            case 22://幺九杠
            case 24://暗杠
            case 26://中发白杠
            case 27://幺九杠的补蛋
            case 28://中发白杠的补蛋
                this.actions.push({index:index,action: 5, funcID:funcID, pais:arr[3], pos:pos,from: arr[3][1].pos});
                break;
            case 25://明杠
                this.actions.push({index:index,action: 5, funcID:funcID, pais:arr[3], pos:pos ,from: arr[3][0].pos});
                break;
            case 4://听牌
                this.actions.push({index:index,action: 5, funcID:funcID,pos:pos});
            case 1001://潇洒
                this.actions.push({index:index,action: 5, funcID:funcID,pos:pos});
                break;
            case 99://胡牌
                this.actions.push({index:index,action: 5, funcID:funcID, pai:arr[3], pos:pos ,from: arr[3].pos});
                break;
        }
    }
    __action_6(arr,index:number){
        PublicVal.i.rules = FashionTools.formatRules(arr[1][0]);
        PublicVal.i.dui_num = arr[1][1];
        PublicVal.i.cur_round = arr[1][2];
        PublicVal.i.max_round = arr[1][3];
        PublicVal.i.bao = arr[1][4];
        PublicVal.i.zhuang = arr[1][5];
        PublicVal.i.zhuangFlag = 1 << this.returnDir(PublicVal.i.zhuang);
        //console.log(PublicVal.i.rules,PublicVal.i.dui_num,PublicVal.i.cur_round,PublicVal.i.max_round);
    }
    //展示
    show(){
        FashionTools.setGameStyle(GlobalData.getInstance().cardStyle);

        PublicVal.state = 6;
        GSController.i.startView();
        GSConfig.replayConfigInit();


        GSController.i.gsView.replayControllView.visible = true;

        GSController.i.nullAllHead();
        GSController.i.setArrowDir(0);
        GSController.i.setBoomDir(PublicVal.i.ownPos);
        GSController.i.scene.updateRoomID(PublicVal.i.roomid);
        GSController.i.scene.updateRule(PublicVal.i.rules);
        GSController.i.visibleRoomOwn();
        GSController.i.visibleZhuang();
        GSController.i.updateBaoView();
        GSController.i.updateReplayRoom(PublicVal.i.dirPerson);

        this.__play();

    }

    __play(){

        this.initMJViews();

        if(!this.isFB) {

            this.interval = egret.setTimeout(_=> {
                    this.Play();
                    this.passTime = 0;
                },
                this, 1000);
        }
    }

    /*
     初始化麻将
     */
    initMJViews(){

        for(var i:number = 1; i <=4 ; i ++){
            FashionTools.sortPai(PublicVal.i.getHandPais(i));
            GSController.i.updateMJView(i);
            GSController.i.updatePoolPaiView(i);
        }
    }



    //解析玩家
    parsePersons(list:any){

        var posPerson = [];

        var a,b,c,d;

        for(var i:number = 0 ; i < list.length;i++){

            var person = list[i];

            posPerson[person.pos] = person;

            if(GlobalData.getInstance().player.uid == person.uid){

                //确定方位
                a = person.pos;
                b = 1 + (person.pos) % 4;
                c = 1 + (person.pos + 1) % 4;
                d = 1 + (person.pos + 2) % 4;

                this.dirMap = {};

                this.dirMap[a] = 1;
                this.dirMap[b] = 2;
                this.dirMap[c] = 3;
                this.dirMap[d] = 4;

                PublicVal.i.ownPos = a;

            }

        }

        PublicVal.i.dirPerson = [];
        PublicVal.i.dirPerson[1] = posPerson[a];
        PublicVal.i.dirPerson[2] = posPerson[b];
        PublicVal.i.dirPerson[3] = posPerson[c];
        PublicVal.i.dirPerson[4] = posPerson[d];
    }
    //返回dir
    returnDir(pos:number){

        return this.dirMap[pos];

    }

    play_action_2(action:any){

        //console.log("打牌",action);

        var pos = action.pos;
        var pai = action.pai;
        var dir = this.returnDir(pos);


        PublicVal.i.removeHandPai(dir,pai);

        PublicVal.i.pushPoolPai(dir,pai);


        GSController.i.updateMJView(dir);

        GSController.i.updatePoolPaiView(dir);

    }
    play_action_3(action:any){

        //console.log("抓牌",action);

        var pos = action.pos;
        var pai = action.pai;
        var dir = this.returnDir(pos);

        PublicVal.i.addHandPai(dir,pai,false);

        GSController.i.updateMJView(dir);

        PublicVal.i.dui_num --;

        GSController.i.updateCenterInfo();

    }
    //换宝
    play_action_7(action:any){

        PublicVal.i.bao = action.pai;

        PublicVal.i.dui_num --;

        GSController.i.updateBaoView();

        GSController.i.updateCenterInfo();

        if(!this.isFB){

            GSController.i.gsView.playBaoEffect();
        }
    }




    play_action_5(action:any){

        //console.log("功能牌",action);

        var funcID = action.funcID;
        var pos = action.pos;
        var from = action.from;
        var pais = action.pais;
        var pai = action.pai;


        var dir = this.returnDir(pos);
        var fromDir = this.returnDir(from);


        switch(funcID){

            case 1:

                PublicVal.i.removeHandPai(dir,pais[0],false);
                PublicVal.i.removeHandPai(dir,pais[2]);
                PublicVal.i.popPoolPai(fromDir);

                PublicVal.i.addFuncPai(5, dir, funcID, pais);


                GSController.i.updateMJView(dir);

                GSController.i.updatePoolPaiView(fromDir);

                this.playFuncEffect(dir,funcID);
                break;

            case 2:
                PublicVal.i.removeHandPai(dir,pais[0],false);
                PublicVal.i.removeHandPai(dir,pais[2]);
                PublicVal.i.popPoolPai(fromDir);

                PublicVal.i.addFuncPai(4, dir, funcID, pais);

                GSController.i.updateMJView(dir);
                GSController.i.updatePoolPaiView(fromDir);

                this.playFuncEffect(dir,funcID);


                break;
            case 22:
                PublicVal.i.removeHandPai(dir,pais[0],false);
                PublicVal.i.removeHandPai(dir,pais[1],false);
                PublicVal.i.removeHandPai(dir,pais[2]);
                PublicVal.i.addFuncPai(3, dir, funcID, pais, pais[0].number, true);

                GSController.i.updateMJView(dir);

                this.playFuncEffect(dir,funcID);

                break;
            case 24://暗杠
                PublicVal.i.removeHandPai(dir,pais[0],false);
                PublicVal.i.removeHandPai(dir,pais[1],false);
                PublicVal.i.removeHandPai(dir,pais[2],false);
                PublicVal.i.removeHandPai(dir,pais[3]);
                PublicVal.i.addFuncPai(1, dir, funcID, pais);

                GSController.i.updateMJView(dir);

                this.playFuncEffect(dir,funcID);
                break;
            case 25://明杠

                var pai0 = pais[0];
                var hasPeng:boolean = PublicVal.i.removePengFunc(dir, pai0);
                if(hasPeng){//有碰的明杠

                    PublicVal.i.removeHandPai(dir,pai0);

                }else{

                    PublicVal.i.popPoolPai(fromDir);
                    PublicVal.i.removeHandPai(dir,pai0,false);
                    PublicVal.i.removeHandPai(dir,pai0,false);
                    PublicVal.i.removeHandPai(dir,pai0);

                }
                PublicVal.i.addFuncPai(2, dir, funcID, pais);

                GSController.i.updateMJView(dir);
                GSController.i.updatePoolPaiView(fromDir);

                this.playFuncEffect(dir,funcID);

                break;
            case 26://中发白杠

                PublicVal.i.removeHandPai(dir,pais[0],false);
                PublicVal.i.removeHandPai(dir,pais[1],false);
                PublicVal.i.removeHandPai(dir,pais[2]);
                PublicVal.i.addFuncPai(0, dir, funcID, pais, 0, true);

                GSController.i.updateMJView(dir);

                this.playFuncEffect(dir,funcID);

                break;

            case 27://幺九杠 补蛋

                //pais.length -= 3;

                var sPais = pais.slice(0,-3);

                var everPai = PublicVal.i.getPai(dir, 22, sPais[0].number);

                var everSrc = [1, 1, 1];

                for (var i: number = 0; i < sPais.length; i++) {

                    everSrc[sPais[i].type - 1]++;

                }
                everPai.ever = everSrc;

                PublicVal.i.removeHandPai(dir,sPais[0]);

                GSController.i.updateMJView(dir);

                this.playFuncEffect(dir,funcID);

                break;
            case 28://中发白 补蛋

                //pais.length -= 3;

                var sPais = pais.slice(0,-3);

                var everPai = PublicVal.i.getPai(dir, 26);

                var everSrc = [1, 1, 1];

                for (var i: number = 0; i < sPais.length; i++) {
                    everSrc[sPais[i].number - 1]++;
                }
                everPai.ever = everSrc;

                PublicVal.i.removeHandPai(dir,sPais[0]);

                GSController.i.updateMJView(dir);

                this.playFuncEffect(dir,funcID);

                break;
            case 4://听

                this.playFuncEffect(dir,funcID);

                break;

            case 99:
                if(from){//点炮
                    PublicVal.i.addHandPai(dir,pai,false);

                    PublicVal.i.popPoolPai(fromDir);

                    GSController.i.updateMJView(dir);
                    GSController.i.updatePoolPaiView(fromDir);
                }else{
                    //console.log("自摸胡牌!");
                }
                this.playFuncEffect(dir,funcID);

                break;
        }


    }

    playFuncEffect(dir:number,funcID:number){

        if(! this.isFB) {
            GSController.i.playEffect(dir, funcID);
        }

    }

    update(advanceTime:number,timeStamp ?:number):void{

        this.passTime += advanceTime;

        if(this.passTime >= Replayer.replaySpeed){

            if(this.index < this.actions.length)
            {

                this.goIndex(this.index);

                this.passTime = 0;

                this.index ++;

            }else{

                console.log("-----回放结束!-----");

                this.stop = true;
                //同步下控制按钮
                GSController.i.gsView.replayControllView.pause();

                this.clearExitInterval();

                this.exitInterval = egret.setTimeout(this.exit,this,3000);
            }

        }
    }

    clearExitInterval(){

        if(this.exitInterval){
            egret.clearTimeout(this.exitInterval);
        }
    }


    goIndex(index:number){

        var action = this.actions[index];

        this["play_action_"+action.action](action);

        this.lastIndex = index;

    }





    completed:boolean;
    //自动移除
    autoRemove :boolean;
    //停止刷新
    stop :boolean;
}