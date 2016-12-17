/**
 * Created by Administrator on 2016/10/28.
 */
class Rule{

    bgosX:number;
    bgosY:number;

    bgScaleX:number = 1;
    bgScaleY:number = 1;

    toposX:number;
    toposY:number;
    //表相旋转角度
    topRot:number = 0;
    topScaleX:number = 1;
    topScaleY:number = 1;

    spacH:number;
    spacV:number;

    showTop:boolean;

    scale:number = 1;

    constructor(obj:any){

        for(var prop in obj) this[prop] = obj[prop];

    }

}

//游戏配置
class GSConfig {

    static auto: boolean = false;

    static width: number = 960;

    static height: number = 640;

    static playerCount: number = 4;

    static moveUpDis: number = 25;

    static poolReturnCount: number = 10;

    //头像初始位置
    static headinitPos = {
        1: {x: 440, y: 440},
        2: {x: 790, y: 280},
        3: {x: 440, y: 70},
        4: {x: 110, y: 280}
    };
    //头像目标位置
    static headTargetPos = {
        1: {x: 10, y: 420},
        2: {x: 870, y: 280},
        3: {x: 695, y: 10},
        4: {x: 10, y: 280}
    };
    static readyIconPos = {
        1: {x: 480, y: 400},
        2: {x: 750, y: 320},
        3: {x: 480, y: 230},
        4: {x: 228, y: 320}
    };


    //54，590
    //手中牌起始位置 dx,dy 明牌的间隔
    static gameHandPos = {
        1: {x: 60, y: 580, dx: 178, dy: 0, px: 60, py: 0},
        2: {x: 850, y: 495, dx: 0, dy: -88, px: 0, py: -45},
        3: {x: 625, y: 47, dx: -96, dy: 0, px: -35, py: 0},
        4: {x: 110, y: 124, dx: 0, dy: 90, px: 0, py: 45},
        5: {x: 140, y: 580, dx: 178, dy: 0, px: 60, py: 0}
    };
    /*
     重放手牌的起点位置
     */
    static replayHandPos = {
        1: {x: 60, y: 580, dx: 178, dy: 0, px: 60, py: 0},
        2: {x: 850, y: 495, dx: 0, dy: -88, px: 0, py: -45},
        3: {x: 625, y: 47, dx: -96, dy: 0, px: -35, py: 0},
        4: {x: 110, y: 124, dx: 0, dy: 90, px: 0, py: 45}

    };

    /*
     游戏状态手牌的样式
     */
    static gameHandStyles = {1: 1, 2: 1, 3: 1, 4: 1};
    /*
     回放的手牌样式
     */
    static replayHandStyles = {1: 3, 2: 3, 3: 3, 4: 3};

    //手牌样式加强
    static handStylesPlus: any;

    //手牌起始位置加强
    static handPosPlus: any = {1: null, 2: null, 3: null, 4: null};
    //= {1:GSConfig.handPos[1],2:GSConfig.handPos[2],3:GSConfig.handPos[3],4:GSConfig.handPos[4]};

    //功能牌起点位置
    static funcPos = {
        1: {x: 60, y: 580, dx: 178, dy: 0, px: 60, py: 0},
        2: {x: 840, y: 500, dx: 0, dy: -88, px: 0, py: -45},
        3: {x: 625, y: 47, dx: -96, dy: 0, px: -35, py: 0},
        4: {x: 120, y: 124, dx: 0, dy: 90, px: 0, py: 45}
    };

    //动态手牌位
    static dymnicHandPos = {
        1: {x: 0, y: 0},
        2: {x: 0, y: 0},
        3: {x: 0, y: 0},
        4: {x: 0, y: 0}
    };

    //池牌位置
    static poolPos = {
        1: {x: 280, y: 480},
        2: {x: 790, y: 480},
        3: {x: 680, y: 140},
        4: {x: 170, y: 140}
    };
    //
    static catchPos = {
        1: {x: 0, y: 0, dx: 10, dy: 0},
        2: {x: 0, y: 0, dx: 0, dy: -15},
        3: {x: 0, y: 0, dx: -5, dy: 0},
        4: {x: 0, y: 0, dx: 0, dy: 15}
    };
    static diePaiPos = {
        1: {x: -113, y: -18},
        2: {x: 0, y: 38},
        3: {x: 30 * 2, y: -10},
        4: {x: 0, y: -30 * 2}
    };

    //功能播放位置
    static funcPlayPos = {
        1: {x: 480, y: 480},
        2: {x: 770, y: 320},
        3: {x: 480, y: 150},
        4: {x: 190, y: 320}
    };

    //位置规则 1-4 逆时针 5:精致版 {1:立面,2:背面,3:躺 4:池}
    static posRule = {
        1:{ 1:new Rule({bgosX:32,bgosY:40,toposX:24,toposY:22,spacH:64,spacV:79,showTop:false}),
            2:new Rule({bgosX:32,bgosY:40,toposX:24,toposY:23,spacH:56,spacV:79,showTop:true}),
            3:new Rule({bgosX:34,bgosY:44,toposX:26,toposY:40,topScaleX:0.9,topScaleY:0.9,spacH:56,spacV:70,showTop:true}),
            4:new Rule({bgosX:18,bgosY:23,toposX:13,toposY:19,spacH:30,spacV:40,showTop:true}),
            5:new Rule({bgosX:32,bgosY:40,bgScaleX:1.1,bgScaleY:1.1,toposX:24,toposY:23,spacH:56,spacV:79,showTop:true})
        },
        2:{ 1:new Rule({bgosX:19,bgosY:44,bgScaleX:-1,topRot:-90,spacH:23,spacV:24,showTop:false}),
            2:new Rule({bgosX:23,bgosY:18,bgScaleX:-1,topRot:-90,spacH:23,spacV:24,showTop:false}),
            3:new Rule({bgosX:23,bgosY:18,bgScaleX:-1,toposX:9,toposY:18,topRot:-90,topScaleX:0.75,spacH:25,spacV:24,showTop:true}),
            4:new Rule({bgosX:23,bgosY:18,bgScaleX:-1,toposX:9,toposY:18,topRot:-90,topScaleX:0.75,spacH:25,spacV:40,showTop:true})
        },
        3:{ 1:new Rule({bgosX:18,bgosY:29,topRot:-180,topScaleX:0.5,topScaleY:0.5,spacH:30,spacV:36,showTop:false}),
            2:new Rule({bgosX:18,bgosY:29,topRot:-180,topScaleX:0.5,topScaleY:0.5,spacH:30,spacV:36,showTop:false}),
            3:new Rule({bgosX:18,bgosY:23,toposX:13,toposY:19,spacH:30,spacV:34,showTop:true}),
            4:new Rule({bgosX:18,bgosY:23,toposX:13,toposY:19,spacH:30,spacV:40,showTop:true})

        },
        4:{ 1:new Rule({bgosX:19,bgosY:44,topRot:90,spacH:23,spacV:24,showTop:false}),
            2:new Rule({bgosX:23,bgosY:18,topRot:90,spacH:23,spacV:24,showTop:false}),
            3:new Rule({bgosX:23,bgosY:18,toposX:18,toposY:18,topRot:90,topScaleX:0.75,spacH:25,spacV:24,showTop:true}),
            4:new Rule({bgosX:23,bgosY:18,toposX:18,toposY:18,topRot:90,topScaleX:0.75,spacH:25,spacV:40,showTop:true})
        },
        5:{ 1:new Rule({bgosX:32,bgosY:40,toposX:24,toposY:22,spacH:64*0.92,spacV:79,scale:0.92,showTop:false}),
            2:new Rule({bgosX:32,bgosY:40,toposX:24,toposY:23,spacH:56,spacV:79,showTop:true}),
            3:new Rule({bgosX:34,bgosY:44,toposX:26,toposY:40,topScaleX:0.9,topScaleY:0.9,spacH:56,spacV:70,showTop:true}),
            4:new Rule({bgosX:18,bgosY:23,toposX:13,toposY:19,spacH:30,spacV:40,showTop:true}),
            5:new Rule({bgosX:32,bgosY:40,bgScaleX:1.1,bgScaleY:1.1,toposX:24,toposY:23,spacH:56,spacV:79,showTop:true})
        }
    };

    //规则加强
    static posRulePlus: any = {
        1: GSConfig.posRule[1],
        2: GSConfig.posRule[2],
        3: GSConfig.posRule[3],
        4: GSConfig.posRule[4]
    };

    static testPais: any[] = [{type: 3, number: 1},
        {type: 3, number: 2},
        {type: 3, number: 9},
        {type: 3, number: 9},

        {type: 1, number: 1},
        {type: 1, number: 1},
        {type: 1, number: 9},
        {type: 1, number: 2},

        {type: 2, number: 1},
        {type: 2, number: 1},
        {type: 2, number: 9},
        {type: 2, number: 9},

        {type: 4, number: 2},
        {type: 4, number: 2}
    ];


    static funcSelectRes = ["F_guo", "F_chi", "F_peng", "F_gang", "F_budan", "F_ting", "F_hu"];

    static actionPVP = {
        1: 1,
        2: 2,
        4: 5,
        22: 3,
        24: 3,
        25: 3,
        26: 3,
        27: 4,
        28: 4,
        99: 6
    };
    //获取方位位置
    static getPosByIndex(dir: number, style: number, index: number) {

        var o: any = {};

        //var pos = GSConfig.handPos[dir];

        var rule = GSConfig.posRulePlus[dir][style];

        switch (dir) {

            case 1:

                o.x = index * rule.spacH;
                o.y = 0;


                break;
            case 2:

                o.x = 0;
                o.y = 0 - index * rule.spacH;

                break;
            case 3:
                o.x = 0 - index * rule.spacH;
                o.y = 0;

                break;
            case 4:

                o.x = 0;
                o.y = index * rule.spacH;

                break;

        }

        return o;

    }


    static getPoolPos(dir: number, index: number) {

        var pos = GSConfig.poolPos[dir];

        var rule = GSConfig.posRulePlus[dir][4];

        var ox = (index % GSConfig.poolReturnCount) * rule.spacH;
        var oy = (index / GSConfig.poolReturnCount ^ 0) * rule.spacV;
        // var os = (index / GSConfig.poolReturnCount ^ 0) * 15;
        var os = 0;

        var o: any = {};

        switch (dir) {
            case 1:
                o.x = pos.x + ox + os;
                o.y = pos.y - oy;
                o.sx = o.x + 20;
                o.sy = o.y;
                break;
            case 2:
                o.x = pos.x - oy;
                o.y = pos.y - ox - os;
                o.sx = o.x;
                o.sy = o.y - 20;
                break;
            case 3:
                o.x = pos.x - ox - os;
                o.y = pos.y + oy;
                o.sx = o.x - 20;
                o.sy = o.y;
                break;
            case 4:
                o.x = pos.x + oy;
                o.y = pos.y + ox + os;
                o.sx = o.x;
                o.sy = o.y + 20;
                break;
        }
        return o;
    }

    static handLens = {2: true, 5: true, 8: true, 11: true, 14: true};

    static huTypeMap = {
        6: "庄家",
        7: "自摸",
        8: "站立",
        9: "带鸡",
        10: "夹胡",
        11: "双飘",
        12: "对对胡",
        13: "摸宝",
        14: "宝中宝",
        15: "通宝",
        16: "门清",
        17: "点炮",
        18: "清一色",
        19: "杠上开花",
        20: "暗叫",
        21: "海底捞月",
        24: "暗杠",
        25: "明杠",
        29: "天胡",
        30: "夹五",
        31: "七对",
        32: "龙七对",
        33: "258将",
        34: "中张",
        35: "换三张",
        36: "金钩吊",
        37: "地胡",
        38: "全幺九",
        39: "过手杠",
        40: "一炮多响",
        41: "呼叫转移",
        42: "将七对",
        43: "龙七对",
        44: "抢杠胡",
        45: "接炮",
        46: "根儿",
        47: "查大叫",
        48: "卡二条",
        49: "点杠",
        99: "平胡"
    };
    //暗杠牌的顶牌类型
    static gameAnGangStyle = {1: 3, 2: 2, 3: 2, 4: 2};
    static replayAnGangStyle = {1: 3, 2: 3, 3: 3, 4: 3};

    static anGangStylePlus: any;

    static allowLens(len: number) {

        return GSConfig.handLens[len];
    }

    //手牌激活
    static handCardActivate: boolean;

    //桌布素材
    static normal_table_bg_res: string = "game_bg";
    static soft_table_bg_res: string = "game_bg";

    static normal_card_bg_style: string = "N_";
    static soft_card_bg_style: string = "M_";

    static table_bg_res: string = GSConfig.normal_table_bg_res;

    static card_bg_style: string = GSConfig.normal_card_bg_style;

    //正常游戏状态的配置初始化
    static gameConfigInit() {

        GSConfig.handStylesPlus = GSConfig.gameHandStyles;
        GSConfig.anGangStylePlus = GSConfig.gameAnGangStyle;

        for (var i: number = 1; i <= 4; i++) {

            GSConfig.handPosPlus[i] = GSConfig.gameHandPos[i];
            GSConfig.dymnicHandPos[i].x = GSConfig.handPosPlus[i].x;
            GSConfig.dymnicHandPos[i].y = GSConfig.handPosPlus[i].y;
        }

        GSConfig.handCardActivate = true;
    }

    //回放状态的配置初始化
    static replayConfigInit() {
        GSConfig.handStylesPlus = GSConfig.replayHandStyles;
        GSConfig.anGangStylePlus = GSConfig.replayAnGangStyle;
        for (var i: number = 1; i <= 4; i++) {

            GSConfig.handPosPlus[i] = GSConfig.replayHandPos[i];

        }
        GSConfig.handCardActivate = false;
    }
}