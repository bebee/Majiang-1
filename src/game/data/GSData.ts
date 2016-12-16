/**
 * Created by Administrator on 2016/10/29.
 */
class GSData{

    private static _i : GSData;
    static get i(){
        return GSData._i || (GSData._i = new GSData);
    }

    roomPlayers:PlayerVo[];

    //庄家是否出过牌
    //isZhuangPush:boolean;

    //更新轮到别人抓牌(庄家出完牌算开始抓牌!)
    //gang_end:boolean;
    //---------------------------------------
    roomPass:number = 0;
    dir2Pos:any = {};
    pos2Dir:any = {};
    //庄的pos
    zhuangPos:number = -1;
    //庄的dir
    zhuangDir:number;
    fen:boolean;
    funcSelects : any;
    chiObj:any;//属于funcSelects里的
    //当前池牌
    currPoolPai:any;

    readyFlag:number = 0;

    roomOwnDir:number = 0;
    //牌局开始过
    roundStarted:boolean;
    //更新轮到别人抓牌(庄家出完牌算开始抓牌!)
    // gang_end:boolean;
    //杠的分数
    gangCurs:number[];

    //当前抓牌位置
    turnPos:number;
    //当前抓牌方向(位置转换)
    turnDir:number;

    //结算对象 存个data
    result:any;
    //结算类型 1-3 :胜利 失败 流局
    resultType:number;

    //重连后上来的四方牌局
    rebackData:any;
    //重连上来的状态
    rebackStatus:number = 0;
    //重连的开始功能缓存执行显示
    rebackViewFuncs:any[] = [];

    //首次进入某房间
    firstInRoom:boolean;
    //准备听牌
    readyTing:boolean;
    //牌局准备好
    roundReady:number;

    //是否显示功能菜单
    isShowFunc:boolean;
    //庄家是否出过牌
    // isZhuangPush:boolean;
    //前一次庄家位置
    lastZhuangPos:number;
    //是否连庄
    isLianZhuang:boolean;
    //断线重连后是否听牌
    backTing:number;
    //听牌结束后摊牌亮牌
    tingEndShow:boolean;
    //是否听牌局
    hasTingRule:boolean;

    constructor(){
        this.clear();
    }

    //所有数据清理
    clear(){
        this.roundReset();

        PublicVal.state = StateType.ready;
        PublicVal.i.cur_round = 1;
        this.firstInRoom = false;
        this.roundStarted = false;
        this.readyFlag = 0;
        this.gangCurs = [0,0,0,0,0];
        this.lastZhuangPos = 0;
        this.hasTingRule = false;
        this.isLianZhuang = false;
    }

    //继续回合的部分数据重置
    roundReset(){
        PublicVal.i.clear();
        PublicVal.state = StateType.continue;

        this.roundReady = 0;
        // this.gang_end = false;
        // this.isZhuangPush = false;
        this.turnDir = 0;
        this.isShowFunc = false;
        this.fen = false;
        this.funcSelects = [];
        this.readyTing = false;
        this.backTing = 0;
        this.tingEndShow = false;
    }

    setHandPais(dir,pais){
        PublicVal.i.allPais[dir].handPais = pais;
    }

    //添加功能牌
    pushFuncPais(dir,obj){
        var funcPais = PublicVal.i.getFuncPais(dir);
        funcPais.push(obj);
    }

    //设置池牌
    setPoolPais(dir,pais){
        PublicVal.i.allPais[dir].poolPais = pais;
    }

    //获取抓牌
    getCatchPai(dir:number){
        return PublicVal.i.allPais[dir].catchPai;
    }
    //赋值抓牌
    setCatchPai(dir,pai){
        PublicVal.i.allPais[dir].catchPai = pai;
    }

    //删除其他人的手牌
    removeOtherHandPai(dir:number,count:number) {
        var handPais = PublicVal.i.getHandPais(dir);
        if (handPais && handPais.length) {
            handPais.length -= count;
        }
    }

    //删除自己多张手牌
    removeOwnHandPais(pais:any[]){
        for(var i:number = 0 ;i < pais.length;i++){
            console.log("删除自己多张手牌:",pais[i].type,pais[i].number);
        }

        var handPais = PublicVal.i.getHandPais(1);
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
        FashionTools.sortPai(handPais);
    }

    //添加开局手牌(假象)
    pushStartHandPai(){
        var dir = this.zhuangDir;
        var catchPai = this.getCatchPai(dir);
        this.pushHandPai(dir,catchPai);
    }

    //手牌添加
    pushHandPai(dir:number,pai:any){
        var handPais = PublicVal.i.getHandPais(dir);
        handPais.push(pai);
    }

    getSexByPos(pos:number){
        return this.getRoomPlayerByPos(pos).sex;
    }

    //往功能牌型里添加牌 排序 方位 功能 牌
    addFuncPai(sort:number,dir:number,action:number,pai:any[],number:number = 0,ever : any = null ) {
        var funcPais = PublicVal.i.getFuncPais(dir);
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

    //获取功能选项存储
    getFuncSelectByIndex(index:number){
        for(var i:number = 0 ; i < this.funcSelects.length;i++){
            if(index == this.funcSelects[i].index){
                return this.funcSelects[i];
            }
        }
    }

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
    getRoomPlayerByPos(pos:number):PlayerVo{
        return this.roomPlayers[pos];
    }
    //根据dir获取玩家信息
    getRoomPlayerByDir(dir:number){
        return this.getRoomPlayerByPos(this.getPos(dir));
    }
}
