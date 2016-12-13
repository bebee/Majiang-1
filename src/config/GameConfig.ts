/**
  * 游戏配置文件
  * by dily
  * (c) copyright 2016 - 2035
  * All Rights Reserved. 
  * 存放游戏的配置数据
  * 比如：游戏界面尺寸、分享随机百分比、获取系统数据
  */
class gameConfig {

    //游戏地址
    static GameUrl: string = "https://mj.h5sd.com/bcmj/index.html";
    //邀请带入的房间ID
    static roomid: string;
    //当前面板
    static curPanel: egret.DisplayObjectContainer;

    //TODO 微信
    //Appid
    static appid: string = "wxb6349744356b5312";
    //回调状态
    static state: string;
    //回调code
    static code: string;
    //时间戳
    static timestamp: string;
    //签名
    static signature: string;
    //
    static noncestr: string;

    //TODO 测试
    //用户
    static users;
    //ip
    static ip;
    //端口
    static port;

    //是否在线
    static isOnLine: boolean = navigator.onLine;

    //HTTP服务器地址
    static address_http: any = {ip: "dbmj01.h5sd.com", port: 9009};
    //游戏服务器地址
    static address_game: any = {ip: "dbmj01.h5sd.com", port: 10415};
    //测试游戏服务器地址
    static address_test: any = {ip: "192.168.2.22", port: 10415};

    //中心服务器地址 注意：这两个更换测试服 一定要改
    static address_center: any = {ip: "lyqptest.h5sd.com", port: 10416};   //dbmj01.h5sd.com   lyqptest.h5sd.com

    //TODO 常规设置
    //通用字体
    static FontFamily: string = "Microsoft YaHei";

    //全局字体颜色表--可以扩展
    static TextColors = {
        white: 0xFFFFFF,//白色
        milkWhite: 0xfbf1af,//乳白色
        grayWhite: 0xceb6a2,//灰白色
        yellow: 0xffff00,//金黄色
        lightYellow: 0xffd375,//淡黄色
        orangeYellow: 0xff9900,//橘黄色
        red: 0xf11300,//红色
        green: 0x00e500,//绿色
        blue: 0x1a94d7,//蓝色
        grayBlue: 0x2f5177,//墨蓝色
        purple: 0xe938f2,//紫色
        pink: 0xFF3030,//粉色
        black: 0x2e2d2d,//黑色
        golden: 0xFFD700 //金色
    };

    //规则
    static rules: any = {
        1: "夹五",
        2: "清一色",
        3: "扣听",
        4: "鸡胡鸡飘",
        5: "攒杠",
        6: "手把一",
        7: "背靠背",
        8: "责任制",
        9: "自摸加底",
        10: "自摸加番",
        11: "点杠花（点炮）",
        12: "点杠花（自摸）",
        13: "换三张",
        14: "幺九将对",
        15: "门清中张",
        16: "天地胡",
        17: "血战到底",
        18: "血流成河",
        19: "封顶",
        20: "三人两房",
        21: "三人三房",
        22: "四人两房",
    };

    //游戏提示
    static gamewarmList: string[] = [
        "代理咨询请联系微信：lyqp01；关注微信公众号【老友棋牌】，领取房卡奖励；文明娱乐，禁止赌博。"
    ];

    //消息提示  0正常无提示
    static msgList: any = {
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

    static update(data: any) {
        if (data) {
            for (var key in data) {
                gameConfig[key] = data[key];
            }
        }
    }

    //获得平台类型 如 微信、qqzone、qq、微博、校内、facebook
    static platformType(): string {
        var ua = window.navigator.userAgent.toLowerCase();

        if (("" + ua.match(/micromessenger/i)) == "micromessenger") {
            return "micromessenger";
        }
        else if (("" + ua.match(/qzone/i)) == "qzone") {
            return "qzone";
        }
        else if (("" + ua.match(/weibo/i)) == "weibo") {
            return "weibo";
        }
        else if (("" + ua.match(/qq/i)) == "qq") {
            return "qq";
        }
        else if (("" + ua.match(/renren/i)) == "renren") {
            return "renren";
        }
        else if (("" + ua.match(/txmicroblog/i)) == "txmicroblog") {
            return "txmicroblog";
        }
        else if (("" + ua.match(/douban/i)) == "douban") {
            return "douban";
        }
        else {
            return "other";
        }
    }
}