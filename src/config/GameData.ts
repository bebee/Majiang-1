
/**
  * 全局数据存储
  */
class gameData {
    //版本号
    static version: string = "";  //0.2.0
    //玩家信息
    static player: PlayerVo;
    //操作的房间ID
    static roomid: number = 0;
    //牌型
    static cardStyle: number = 1;
    //牌风格
    static cardColor: number = 1;
    //玩家重连次数
    static connCount: number = 0;
    //圈数，仅显示使用
    static roomRound: number = 0;
    //战绩详情用户列表
    static personList: any;
    //登录等待
    static sendLogin: boolean = false;

    //游戏提示播放顺序
    static gamewarmIndex: number = 0;
    //喇叭列表
    static hornList: string[] = [];
}