
/**
  * 全局数据存储
  */
class GlobalData {
    private static _i: GlobalData;

    static getInstance() {
        return this._i || (this._i = new GlobalData());
    }

    //版本号
    public resourceCode: string = "";  //0.2.0
    //玩家信息
    public player: Player = new Player();
    //操作的房间ID
    public roomid: number = 0;
    //登录等待
    public sendLogin: boolean = false;
    //牌型
    public cardType: number = 1;
    //牌风格
    public cardStyle: number = 1;
    //玩家重连次数
    public connCount: number = 0;
    //圈数，仅显示使用
    public roomRound: number = 0;
    //战绩详情用户列表
    public personList: any;

    //游戏提示播放顺序
    public gamewarmIndex: number = 0;
    //喇叭列表
    public hornList: string[] = [];

    //游戏提示
    public gamewarmList: string[] = [
        "代理咨询请联系微信：lyqp01；关注微信公众号【老友棋牌】，领取房卡奖励；文明娱乐，禁止赌博。"
    ];
    //消息提示  0正常无提示
    public msgList: any = {
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
        13: "您的房卡不够",
        14: "记录已过期",
        17: "您已经投过票了"
    };
}