/**
 * Created by Administrator on 2016/12/1.
 */
//回放播放器
class Replayer implements IUpdate{

    static _i:Replayer;

    constructor(){

        GSUpdate.i.addUpdate(this);

        this.stop = true;

    }

    static get i(){
        return Replayer._i || (Replayer._i = new Replayer);
    }

    static replaySpeed:number = 800;

    actions:any ;

    interval:number;

    passTime:number;


    dirMap:any;

    ownPos:number;

    data:any;

    clear(){

        this.passTime = 0;

        this.stop = true;

        this.actions = [];

        egret.clearTimeout(this.interval);
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
    replay(){

        this.parseData(this.data);

    }

    pause(){

        this.stop = true;

    }
    play() {

        this.stop = false;
    }


    parseData(data:any){

        if(data == null) return;

        this.data = data;

        this.clear();

        this.parsePersons(GlobalData.getInstance().personList);

        PublicVal.i.roomid = GlobalData.getInstance().roomid;

        PublicVal.i.roomOwnFlag = 1 << this.returnDir(1);


        for(var i:number = 0 ; i <data.length;i++) {
            var arr = data[i];
            var action: number = arr[0];
            this["__action_" + action](arr,i);
        }
    }
    __action_1(arr:any,index:number){
        var fourObj = arr[1];
        for(var k:number= 0;k < fourObj.length;k++){
            var obj = fourObj[k];
            //1万 2条 3桶 4中发白
            var pais = FashionTools.formatPai(1,obj[1]).
            concat(FashionTools.formatPai(2,obj[2])).
            concat(FashionTools.formatPai(3,obj[3])).
            concat(FashionTools.formatPai(4,obj[4]));
            //console.log(pais);

            PublicVal.i.allPais[this.returnDir(k + 1)].handPais = pais;
        }

        this.show();

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


        GSController.i.nullAllHead();
        GSController.i.setArrowDir(0);
        GSController.i.setBoomDir(this.ownPos);
        GSController.i.scene.updateRoomID(PublicVal.i.roomid);
        GSController.i.scene.updateRule(PublicVal.i.rules);
        GSController.i.visibleRoomOwn();
        GSController.i.visibleZhuang();
        GSController.i.updateBaoView();
        GSController.i.updateReplayRoom(PublicVal.i.dirPerson);
        this.updateMJViews();

        this.interval = egret.setTimeout(_=>{this.play();
                                            this.passTime = 0;},
                                        this,1000);
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

                this.ownPos = a;

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



    //播放
/*    next(){

        this.stop = false;

    }*/

    play_action_2(action:any){

        console.log("打牌",action);

        var pos = action.pos;
        var pai = action.pai;
        var dir = this.returnDir(pos);


        PublicVal.i.removeHandPai(dir,pai);

        PublicVal.i.pushPoolPai(dir,pai);

        FashionTools.sortPai(PublicVal.i.getHandPais(dir));

        GSController.i.updateMJView(dir);

        GSController.i.updatePoolPaiView(dir);

    }
    play_action_3(action:any){

        console.log("抓牌",action);

        var pos = action.pos;
        var pai = action.pai;
        var dir = this.returnDir(pos);

        PublicVal.i.addHandPai(dir,pai);

        GSController.i.updateMJView(dir);

        PublicVal.i.dui_num --;

        GSController.i.updateCenterInfo();


    }
    play_action_5(action:any){

        console.log("功能牌",action);

        var funcID = action.funcID;
        var pos = action.pos;
        var from = action.from;
        var pais = action.pais;
        var pai = action.pai;


        var dir = this.returnDir(pos);
        var fromDir = this.returnDir(from);


        switch(funcID){

            case 1:

                PublicVal.i.removeHandPai(dir,pais[0]);
                PublicVal.i.removeHandPai(dir,pais[2]);
                PublicVal.i.popPoolPai(fromDir);

                PublicVal.i.addFuncPai(5, dir, funcID, pais);

                FashionTools.sortPai(PublicVal.i.getHandPais(dir));

                GSController.i.updateMJView(dir);

                GSController.i.updatePoolPaiView(fromDir);

                GSController.i.playEffect(dir,funcID);
                break;

            case 2:
                PublicVal.i.removeHandPai(dir,pais[0]);
                PublicVal.i.removeHandPai(dir,pais[2]);
                PublicVal.i.popPoolPai(fromDir);

                PublicVal.i.addFuncPai(4, dir, funcID, pais);

                FashionTools.sortPai(PublicVal.i.getHandPais(dir));

                GSController.i.updateMJView(dir);
                GSController.i.updatePoolPaiView(fromDir);

                GSController.i.playEffect(dir,funcID);


                break;
            case 22:
                PublicVal.i.removeHandPai(dir,pais[0]);
                PublicVal.i.removeHandPai(dir,pais[1]);
                PublicVal.i.removeHandPai(dir,pais[2]);
                PublicVal.i.addFuncPai(3, dir, funcID, pais, pais[0].number, true);

                FashionTools.sortPai(PublicVal.i.getHandPais(dir));
                GSController.i.updateMJView(dir);

                GSController.i.playEffect(dir,funcID);

                break;
            case 24://暗杠
                PublicVal.i.removeHandPai(dir,pais[0]);
                PublicVal.i.removeHandPai(dir,pais[1]);
                PublicVal.i.removeHandPai(dir,pais[2]);
                PublicVal.i.removeHandPai(dir,pais[3]);
                PublicVal.i.addFuncPai(1, dir, funcID, pais);


                FashionTools.sortPai(PublicVal.i.getHandPais(dir));
                GSController.i.updateMJView(dir);

                GSController.i.playEffect(dir,funcID);
                break;
            case 25://明杠

                var pai0 = pais[0];
                var hasPeng:boolean = PublicVal.i.removePengFunc(dir, pai0);
                if(hasPeng){//有碰的明杠

                    PublicVal.i.removeHandPai(dir,pai0);

                }else{

                    PublicVal.i.popPoolPai(fromDir);
                    PublicVal.i.removeHandPai(dir,pai0);
                    PublicVal.i.removeHandPai(dir,pai0);
                    PublicVal.i.removeHandPai(dir,pai0);

                }
                PublicVal.i.addFuncPai(2, dir, funcID, pais);

                FashionTools.sortPai(PublicVal.i.getHandPais(dir));
                GSController.i.updateMJView(dir);
                GSController.i.updatePoolPaiView(fromDir);

                GSController.i.playEffect(dir,funcID);

                break;
            case 26://中发白杠

                PublicVal.i.removeHandPai(dir,pais[0]);
                PublicVal.i.removeHandPai(dir,pais[1]);
                PublicVal.i.removeHandPai(dir,pais[2]);
                PublicVal.i.addFuncPai(0, dir, funcID, pais, 0, true);

                FashionTools.sortPai(PublicVal.i.getHandPais(dir));
                GSController.i.updateMJView(dir);

                GSController.i.playEffect(dir,funcID);

                break;

            case 27://幺九杠 补蛋

                pais.length -= 3;

                var everPai = PublicVal.i.getPai(dir, 22, pais[0].number);

                var everSrc = [1, 1, 1];

                for (var i: number = 0; i < pais.length; i++) {

                    everSrc[pais[i].type - 1]++;

                }
                everPai.ever = everSrc;

                PublicVal.i.removeHandPai(dir,pais[0]);


                FashionTools.sortPai(PublicVal.i.getHandPais(dir));
                GSController.i.updateMJView(dir);

                GSController.i.playEffect(dir,funcID);

                break;
            case 28://中发白 补蛋

                pais.length -= 3;

                var everPai = PublicVal.i.getPai(dir, 26);

                var everSrc = [1, 1, 1];

                for (var i: number = 0; i < pais.length; i++) {
                    everSrc[pais[i].number - 1]++;
                }
                everPai.ever = everSrc;

                PublicVal.i.removeHandPai(dir,pais[0]);

                FashionTools.sortPai(PublicVal.i.getHandPais(dir));
                GSController.i.updateMJView(dir);

                GSController.i.playEffect(dir,funcID);

                break;

            case 99:
                if(from){//点炮
                    PublicVal.i.addHandPai(dir,pai);

                    PublicVal.i.popPoolPai(fromDir);

                    GSController.i.updateMJView(dir);
                    GSController.i.updatePoolPaiView(fromDir);
                }else{
                    console.log("自摸胡牌!");
                }
                GSController.i.playEffect(dir,funcID);

                break;
        }


    }

    update(advanceTime:number,timeStamp ?:number):void{

        this.passTime += advanceTime;

        if(this.passTime >= Replayer.replaySpeed){

            if(this.actions.length){

                var action = this.actions.shift();

                this["play_action_"+action.action](action);

                this.passTime = 0;

            }else{

                console.log("-----回放结束!-----");

                this.stop = true;
            }

        }
    }

    updateMJViews(){

        for(var i:number = 1; i <=4 ; i ++){
            FashionTools.sortPai(PublicVal.i.getHandPais(i));
            GSController.i.updateMJView(i);
        }
    }

    completed:boolean;
    //自动移除
    autoRemove :boolean;
    //停止刷新
    stop :boolean;
}