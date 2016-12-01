/**
 *  S号打头的是收到消息的消息号
 *  _号打头的是发出去的消息号
 */
module MessageID
{
    export var _1:number = 1; //登录
    export var S1:number = 1; //登录放回

    export var _2:number = 2;  //创建房间
    export var S2:number = 2;  //创建房间返回

    export var _3:number = 3;  //加入房间
    export var S3:number = 3;  //加入房间返回

    export var _4:number = 4;  //打牌
    export var S4:number = 4;  //打牌返回

    export var _5:number = 5;  //TODO 待定
    export var S5:number = 5;  //TODO 待定

    export var _6:number = 6;  //解散房间
    export var S6:number = 6;  //解散房间返回

    export var _7:number = 7;  //绑定玩家
    export var S7:number = 7;  //绑定返回

    export var _8:number = 8;  //
    export var S8:number = 8;  //房间信息同步
    
    export var _9:number = 9;  //人满通知
    export var S9:number = 9;   //通知
    
    export var _10:number = 10;  //开始游戏
    export var S10:number = 10;  //开始游戏
    
    export var _11:number = 11;  //同步牌的信息
    export var S11:number = 11;  //同步牌

    export var _12:number = 12;  //离开房间
    export var S12:number = 12;  //离开房间返回

    export var _13:number = 13;  //游戏结束
    export var S13:number = 13;  //游戏结束

    export var _14:number = 14;  //解散房间投票
    export var S14:number = 14;  //解散房间投票

    export var _15:number = 15;  //中断处理
    export var S15:number = 15;  //中断处理

    export var _16:number = 16;  //局结算
    export var S16:number = 16;  //局结算

    export var _17:number = 17;  //再来一局
    export var S17:number = 17;  //再来一局

    export var _18:number = 18;  //心跳
    export var S18:number = 18;  //心跳

    export var _19:number = 19;  //战绩列表
    export var S19:number = 19;  //战绩
    
    export var _20:number = 20;  //获取详情
    export var S20:number = 20;  //获取详情
    
    export var _21:number = 21;  //获取回放
    export var S21:number = 21;  //获取回放

    export var _22:number = 22;  //踢人
    export var S22:number = 22;  //踢人

    export var _23:number = 23;  //被踢
    export var S23:number = 23;  //被踢

    export var _24:number = 24;  //房卡变化
    export var S24:number = 24;  //房卡变化

    export var _25:number = 25;  //广播消息
    export var S25:number = 25;  //广播消息

    export var _26:number = 26;  //版本号比对
    export var S26:number = 26;  //版本号比对
}