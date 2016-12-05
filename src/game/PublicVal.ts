/**
 * Created by Administrator on 2016/12/2.
 */
class PublicVal{

    /*
     1:首轮进入牌桌状态
     2:继续进入牌桌状态
     -1:游戏洗牌状态 (需要缓存一些数据)
     -2:牌局最后分张阶段
     -3:自己胡牌阶段
     -4:听牌阶段
     3:游戏牌局状态
     4:每轮牌局结算状态
     5:总结算界面
     6:回放
     */
    static state:number;



    static i:PublicVal = new PublicVal;
    ////////////////////////////////////
    //庄家
    zhuangFlag:number;
    //房主
    roomOwnFlag:number;
    //规则
    rules:string;
    //剩余牌数
    dui_num:number;
    //当前局数
    cur_round:number;
    //总局数
    max_round:number;
    //宝牌
    bao:any;
    //庄家pos
    zhuang:number;

    dir2Pos:any = {};
    pos2Dir:any = {};

    allPais : any  = [];

    roomid:number;

    dirPerson:any;

    constructor(){

        this.clear();
    }

    clear(){

        this.bao = null;
        this.zhuangFlag = 0;
        this.rules = "";
        this.allPais[1] = {handPais:null,catchPai:null,funcPais:[],poolPais:[]};
        this.allPais[2] = {handPais:null,catchPai:null,funcPais:[],poolPais:[]};
        this.allPais[3] = {handPais:null,catchPai:null,funcPais:[],poolPais:[]};
        this.allPais[4] = {handPais:null,catchPai:null,funcPais:[],poolPais:[]};
    }

    //获取手牌牌
    getHandPais(dir:number){
        return this.allPais[dir].handPais;
    }
    //获取功能牌
    getFuncPais(dir:number){
        return this.allPais[dir].funcPais;
    }
    //获取池牌
    getPoolPais(dir:number){

        return this.allPais[dir].poolPais;
    }

    addHandPai(dir:number,pai:any){

        var pais = this.getHandPais(dir);

        pais.push(pai);

    }


    removeHandPai(dir:number,pai:any){

        var pais = this.getHandPais(dir);

        for(var i:number = 0 ; i<pais.length;i++){

            var p = pais[i];

            if(p.type == pai.type && p.number == pai.number){

                pais.splice(i,1);

                break;
            }
        }
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
    //池牌添加
    pushPoolPai(dir:number,pai:any){

        var poolPais = PublicVal.i.getPoolPais(dir);

        pai.poolIndex = poolPais.length;

        poolPais.push(pai);

    }

    //池牌取出
    popPoolPai(dir:number){

        var poolPais = PublicVal.i.getPoolPais(dir);

        poolPais.length --;
    }




    //删除已经碰的功能牌
    removePengFunc(dir:number,pai:any):boolean{

        var funcPais = PublicVal.i.getFuncPais(dir);

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

    //获取含有ever的对象
    getPai(dir:number,action:number,number:number = 0){

        var funcPais = PublicVal.i.getFuncPais(dir);

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

}