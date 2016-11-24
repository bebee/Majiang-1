/**
 * Created by Administrator on 2016/10/29.
 */
class GSData{

    //旋风杠、幺九杠、碰牌（万、条、饼）、吃牌（万、条、饼）

    static _i : GSData;

    static get i(){

        return GSData._i || (GSData._i = new GSData);
    }
    /*
     1:首轮进入牌桌状态
     2:继续进入牌桌状态
     -1:游戏洗牌状态 (需要缓存一些数据)
     3:游戏牌局状态
     4:每轮牌局结算状态
     5:总结算界面
     */
    game_state : number = 1;

    roomPlayers:RoomPlayer[];

    //根据uid存储
    roomPlayerMap = {};

    roomID:number;

    roomPass:number = 0;

    //玩家自己的pos
    ownPos:number;

    leftCount:number;

    dir2Pos:any = {};

    pos2Dir:any = {};

    //庄的pos
    zhuangPos:number;
    //庄的dir
    zhuangDir:number;

    //轮到哪个方位抓牌
    turnDir:number;

    funcSelects : any;

    chiObj:any;//属于funcSelects里的

    //四方向牌
    allPais = {};

    //当前池牌
    currPoolPai:any;

    //结算对象 存个data
    result  ;

    baoPai:any;

    zhuangFlag:number = 0;

    roomOwnFlag:number = 0;

    readyFlag:number = 0;

    roomOwnDir:number = 0;

    //牌局开始过
    roundStarted:boolean;

    turnPos:number;

    //当前局数
    cur_round:number;
    //总局数
    max_round:number;

    //重连后上来的四方牌局

    rebackData:any;

    //重连上来的状态
    rebackStatus:number = 0;

    //庄家是否出过牌
    isZhuangPush:boolean;

    //结算类型 1-3 :胜利 失败 流局
    resultType:number;

    //更新轮到别人抓牌(庄家出完牌算开始抓牌!)
    gang_end:boolean;

    //首次进入某房间
    firstInRoom:boolean;

    //开局是否有功能菜单
    roundStartHasFunction:boolean;

    //杠的分数
    gangCurs:number[];

    rules:string;

    start_invite_Flag:number;

    constructor(){

        this.clear();

    }

    //所有数据清理
    clear(){

        this.roundReset();

        this.game_state = 1;

        this.firstInRoom = false;

        this.cur_round = 1;

        this.roomPlayerMap = {};

        this.roundStarted = false;

        this.readyFlag = 0;

        this.gangCurs = [0,0,0,0,0];

        this.rules = "";

        this.start_invite_Flag = 0;

    }

    //继续回合的部分数据重置
    roundReset(){

        this.roundStartHasFunction = false;

        this.game_state = 2;

        this.gang_end = false;
        this.isZhuangPush = false;

        this.turnDir = 0;
        this.isShowFunc = false;
        this.zhuangFlag = 0;


        this.allPais[1] = {handPais:null,catchPai:null,funcPais:[],poolPais:[]};
        this.allPais[2] = {handPais:null,catchPai:null,funcPais:[],poolPais:[]};
        this.allPais[3] = {handPais:null,catchPai:null,funcPais:[],poolPais:[]};
        this.allPais[4] = {handPais:null,catchPai:null,funcPais:[],poolPais:[]};

        this.funcSelects = [];



    }
    //排序手牌
    sortHandPai(pais:any = null){

        if(pais == null) pais = this.allPais[1].handPais;

        pais.sort((a,b)=>{
            var _a = a.type * 10 + a.number;
            var _b = b.type * 10 + b.number;
            if(_a > _b) return 1;
            if(_a == _b) return 0;
            if(_a<_b) return -1;
        });
    }

    setHandPais(dir,pais){
        this.allPais[dir].handPais = pais;
    }


    //获取手牌牌
    getHandPais(dir:number){

        return this.allPais[dir].handPais;
    }

    //添加功能牌
    pushFuncPais(dir,obj){

        var funcPais = this.getFuncPais(dir);

        funcPais.push(obj);

    }
    //获取功能牌
    getFuncPais(dir:number){

        return this.allPais[dir].funcPais;
    }
    //设置池牌
    setPoolPais(dir,pais){

        this.allPais[dir].poolPais = pais;
    }

    //获取池牌
    getPoolPais(dir:number){

        return this.allPais[dir].poolPais;
    }
    //获取抓牌
    getCatchPai(dir:number){
        return this.allPais[dir].catchPai;
    }
    //赋值抓牌
    setCatchPai(dir,pai){
        this.allPais[dir].catchPai = pai;
    }

    //删除其他人的手牌
    removeOtherHandPai(dir:number,count:number){
        var handPais = this.getHandPais(dir);
        handPais.length -= count;
    }
    //手牌移除
    removeHandPai(dir:number,pai:any = null){

        var handPais = this.getHandPais(dir);

        if(dir == 1) {

            console.log("删除自己手牌:",pai.type,pai.number);

            for (var i: number = 0; i < handPais.length; i++) {

                var handPai = handPais[i];
                if (handPai.type == pai.type && handPai.number == pai.number) {

                    handPais.splice(i, 1);
                    //重新排序
                    this.sortHandPai();
                    break;
                }
            }
        }else{
            handPais.length --;
        }
        GSController.i.gsView.updateAllCount(this);

    }


    //删除自己多张手牌
    removeOwnHandPais(pais:any[]){

        for(var i:number = 0 ;i < pais.length;i++){

            console.log("删除自己多张手牌:",pais[i].type,pais[i].number);
        }

        var handPais = this.getHandPais(1);

        while(pais.length){

            var pai = pais.shift();

            for(var i = 0;i<handPais.length;i++) {

                var handPai = handPais[i];

                if(pai.type == handPai.type && pai.number == handPai.number){

                    handPais.splice(i,1);

                    break;
                }
            }

        }
        this.sortHandPai();
        GSController.i.gsView.updateAllCount(this);
    }

    //添加开局手牌(假象)
    pushStartHandPai(){

        var dir = this.zhuangDir;

        var catchPai = this.getCatchPai(dir);

        this.pushHandPai(dir,catchPai);

        GSController.i.gsView.updateAllCount(this);

    }

    //手牌添加
    pushHandPai(dir:number,pai:any){
        var handPais = this.getHandPais(dir);
        handPais.push(pai);
        GSController.i.gsView.updateAllCount(this);
    }

    //池牌添加
    pushPoolPai(pai:any){

        var dir = pai.dir;

        if(dir == this.zhuangDir) this.isZhuangPush = true;

        var poolPais = this.getPoolPais(dir);

        pai.poolIndex = poolPais.length;

        poolPais.push(pai);

    }
    //池牌取出
    popPoolPai(dir){

        var poolPais = this.getPoolPais(dir);

        poolPais.length --;
    }


    getSexByPos(pos:number){

        return this.getRoomPlayerByPos(pos).sex == "1"? 1:0;

    }


    //删除已经碰的功能牌
    removePengFunc(dir:number,pai:any):boolean{

        var funcPais = this.getFuncPais(dir);

        for(var i:number = 0; i < funcPais.length;i++){

            var obj = funcPais[i];

            if(obj.action == 2){

                var pengObjs = obj.pais;

                for(var k:number = 0 ;k < pengObjs.length;k++){

                    var kObj = pengObjs[k];

                    if(kObj.pai[0].type == pai.type && kObj.pai[0].number == pai.number)
                    {
                        pengObjs.splice(k,1);

                        return true;
                    }
                }

            }

        }
        return false;

    }


    //往功能牌型里添加牌 排序 方位 功能 牌
    addFuncPai(sort:number,dir:number,action:number,pai:any[],number:number = 0,ever : any = null ) {

        var funcPais = this.getFuncPais(dir);

        if (ever != null) ever = [1, 1, 1];

        if (action == 1) {
            pai[0].number > pai[2].number && pai.reverse();
        }

        var addPaiObj: any = {pai: pai, number: number, ever: ever};

        for (var i: number = 0; i < funcPais.length; i++) {

            var obj = funcPais[i];

            if (obj.action == action) {

                obj.pais.push(addPaiObj);

                return;
            }
        }
        funcPais.push({sort: sort, action: action, pais: [addPaiObj]});
    }

    //获取含有ever的对象
    getPai(dir:number,action:number,number:number = 0){

        var funcPais = this.getFuncPais(dir);

        for(var i:number = 0 ; i<funcPais.length;i++) {

            var funcPai = funcPais[i];

            if(funcPai.action == action){

                for(var j:number = 0 ; j <funcPai.pais.length;j++){

                    var obj = funcPai.pais[j];
                    //幺九杠
                    if(number > 0){

                        if(number == obj.number){

                            return obj;
                        }
                    }else{

                        return obj;
                    }

                }

            }
        }
        return null;
    }



    //获取功能选项存储
    getFuncSelectByIndex(index:number){

        for(var i:number = 0 ; i < this.funcSelects.length;i++){

            if(index == this.funcSelects[i].index){

                return this.funcSelects[i];
            }
        }
    }

    isShowFunc:boolean;

    //获取
    getResultPersonLeft(dir:number){

        var pos = this.getPos(dir);

        for(var i:number = 0 ; i < this.result.person.length;i++){

            var person = this.result.person[i];

            if(person.pos == pos) return person.left;

        }

    }


    //通过pos取得方位
    getDir(pos:number){

        return this.pos2Dir[pos];

    }

    //通过方位获取pos
    getPos(dir:number){

        return this.dir2Pos[dir];
    }

    //根据pos获取玩家信息
    getRoomPlayerByPos(pos:number):RoomPlayer{

        return this.roomPlayers[pos];

    }
    //根据dir获取玩家信息
    getRoomPlayerByDir(dir:number){

        return this.getRoomPlayerByPos(this.getPos(dir));

    }


}
