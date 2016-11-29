
/**
  * 全局数据存储
  */
class GlobalData {

    //玩家信息
    public player: Player;

    //正在加入的房间号
    public roomid: number = 100023;

    //登录等待
    public sendLogin: boolean = false;

    /**
     * 玩家重连次数
     */
    public connCount: number = 0;

    /**
     * 版本号
     */
    public resourceCode: string = "";//2016112501

    /**
     * type 1 条子（number  1 - 9 条）     2  筒子 （number  1 - 9 筒）     3  万字（number  1 - 9 万）    4  箭牌  ｛number   1 红中   2  发财   3白班｝
     */

    /**
     * 游戏提示
     * @type {string|string|string[]}
     */
    public gamewarmList: Array<string> =
        [
            "游戏问题请咨询个人微信：lyqp01 ，请文明娱乐，禁止赌博。",
            "每当您邀请一个新人进入房间并完成两圈以上牌局，您都将获得4张房卡，邀请的新人越多，获得的房卡也会越多！",
            "当您第一次完成至少两圈牌局后，系统会赠送您2张房卡。"
        ];

    /**
     * 喇叭列表
     * @type {Array}
     */
    public hornList: Array<string> = [];

    //消息提示  0正常无提示
    public msgList: any =
    {
        1: "人已经满了！",
        2: "牌局已经开始了！",
        3: "房间不存在或已过期！",
        4: "参数不合法",
        5: "状态不合法",
        6: "已经在房间里了",
        7: "查无此人",
        8: "不能绑定你自己",
        9: "你已经有代理了",
        10: "不支持此房间类型",
        11: "未定义的code",
        12: "未定义的code",
        13: "您的房卡不够"
    };

    static instance: GlobalData;

    static getInstance() {
        if (!this.instance) {
            this.instance = new GlobalData();
        }

        return this.instance;
    }
}