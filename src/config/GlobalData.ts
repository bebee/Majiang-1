
/**
  * 全局数据存储
  */
class GlobalData {

    /**
     * 版本号
     */
    public resourceCode:string = "";

    /**
     * 玩家信息
     */
    public player:Player;

    /**
     * 操作的房间ID
     */
    public roomid:number = 0;

    /**
     * 登录等待
     */
    public sendLogin:boolean = false;

    /**
     * 牌型
     */
    public cardType:number = 1;

    /**
     * 牌风格
     */
    public cardStyle:number = 1;

    /**
     * 玩家重连次数
     */
    public connCount: number = 0;

    /**
     * 圈数，仅显示使用
     */
    public roomRound:number = 0;

    /**
     * 战绩详情用户列表
     */
    public personList:any;
    
    /**
     * type 1 条子（number  1 - 9 条）     2  筒子 （number  1 - 9 筒）     3  万字（number  1 - 9 万）    4  箭牌  ｛number   1 红中   2  发财   3白班｝
     */

    /**
     * 游戏提示
     * @type {string|string|string[]}
     */
    public gamewarmList:Array<string> =
    [
        "代理咨询请联系微信：lyqp01 文明娱乐，禁止赌博。",
        "亲爱的麻友们，【新手福利】【邀请福利】将于12月5日（周一）进行更新，新手奖励减少为4张，邀请奖励减少为2张！同时也期待这几天能让更多的麻友融入到这个大家庭！"
    ];

    /**
     * 游戏提示播放顺序
     */
    public gamewarmIndex:number = 0;

    /**
     * 喇叭列表
     * @type {Array}
     */
    public hornList: Array<string> = [];

    //消息提示  0正常无提示
    public msgList: any =
    {
        1:"人已经满了！",
        2:"牌局已经开始了！",
        3:"房间不存在或已过期！",
        4:"参数不合法",
        5:"状态不合法",
        6:"已经在房间里了",
        7:"查无此人",
        8:"不能绑定你自己",
        9:"你已经有代理了",
        10:"不支持此房间类型",
        11:"未定义的code",
        12:"未定义的code",
        13:"您的房卡不够",
        14:"记录已过期"
    };

    static instance: GlobalData;

    static getInstance() {
        if (!this.instance) {
            this.instance = new GlobalData();
        }

        return this.instance;
    }
}