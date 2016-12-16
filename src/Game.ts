/**
 * GameCore
 * @Author Ace.c
 * @Create 2016-12-05 16:08
 */
class game {

    //游戏类型
    static gameType: GameType = GameType.sichuan;

    //服务器地址
    static ip: any;
    //服务器端口
    static port: any;

    //登录等待
    static loginWaiting: boolean = false;

    //舞台
    static stage: egret.Stage;
    //管理
    static manager: GameManager = GameManager.i;
    //询问提示面板
    static askPanel: TipsAskPanel;
    //最顶层显示面板
    static topPanel: BasePanel;

    //版本号
    static version: string = "";  //0.2.0
    //用户
    static user: string;
    //牌风格
    static paiStyle: number = 1;
    //牌颜色
    static paiColor: number = 1;
    //玩家连接次数
    static connectCount: number = 0;
    //牌局进度（圈数或者局数）
    static matchSchedule: number = 0;

    //玩家信息
    static player: PlayerVo;
    //当前房间ID
    static roomid: number = 0;
    //当前房间规则
    static roomRules: any[] = [];
    //当前房间玩家
    static roomPlayers: any = {};
    //当前房间玩家最大数量
    static roomPlayerMax: number = 4;
    //当前房间玩家数量
    static roomPlayerCount: number = 1;
    //是否是房主
    static roomOwner:boolean = false;

    //规则
    static ruleVo: GameRuleVo;
    //换三张
    static changeThreeVo: ChangeThreeVo;

    //是否正在换牌中
    static isChangeThreeBoo: boolean = false;
    //是否正在订缺中
    static isQueBoo: boolean = false;
    //是否正在胡牌中
    static isHuBoo: boolean = false;

    //当前状态
    static status: GameStatus = GameStatus.gamestart;
    //当前状态是否完成
    static statusComplete: boolean = false;

    //全部玩家的缺门记录
    static allQue: any = {};
    //解散房间
    static dissolution: DissolutionVo;
    //战绩详情用户列表
    static recordInfos: any;
    //游戏提示播放顺序
    static gamewarmIndex: number = 0;
    //喇叭列表
    static hornList: string[] = [];

    static init(stage) {
        this.stage = stage;

        acekit.init(stage);
        gameLocal.init();
        this.manager.init();

        stage.addChild(LayerManager.gameLayer());
        this.askPanel = new TipsAskPanel();

        game.player = new PlayerVo();

        game.ruleVo = new GameRuleVo();
        game.changeThreeVo = new ChangeThreeVo();

        GameMusic._volume = +gameLocal.getData(gameLocal.musicVolume);
        GameSound._volume = +gameLocal.getData(gameLocal.soundVolume);

        game.paiStyle = +gameLocal.getData(gameLocal.style);
        game.paiColor = +gameLocal.getData(gameLocal.color);

        GameParse.Initialization();
    }

    //初始化游戏方向
    static initGameDir() {
        PublicVal.i.ownPos = game.userPos;

        var gData = GSDataProxy.i.gData;
        var a = PublicVal.i.ownPos;
        var b = 1 + (PublicVal.i.ownPos) % 4;
        var c = 1 + (PublicVal.i.ownPos + 1) % 4;
        var d = 1 + (PublicVal.i.ownPos + 2) % 4;

        gData.dir2Pos[1] = a;
        gData.dir2Pos[2] = b;
        gData.dir2Pos[3] = c;
        gData.dir2Pos[4] = d;

        gData.pos2Dir[a] = 1;
        gData.pos2Dir[b] = 2;
        gData.pos2Dir[c] = 3;
        gData.pos2Dir[d] = 4;
    }

    //游戏开始前状态
    static prestart() {
        this.status = GameStatus.unknow;
        this.statusComplete = false;
        this.allQue = {};
        this.isHuBoo = false;
        game.manager.dispatchEvent(EffectEventType.CleanAll);
    }

    //清空房间信息
    static cleanRoom() {
        game.roomid = 0;
        game.roomRules = [];
        game.roomPlayers = {};
    }

    //用户所在的牌桌位置
    static get userPos() {
        return this.roomPlayers[this.player.uid].pos;
    }

    //舞台宽度
    static get stageWidth() {
        return this.stage.stageWidth;
    }

    //舞台高度
    static get stageHeight() {
        return this.stage.stageHeight;
    }
}