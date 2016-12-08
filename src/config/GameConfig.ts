/**
  * 游戏配置文件
  * by dily
  * (c) copyright 2016 - 2035
  * All Rights Reserved. 
  * 存放游戏的配置数据
  * 比如：游戏界面尺寸、分享随机百分比、获取系统数据
  */
module GameConfig {

    //是否在线
    export var isOnLine: boolean = navigator.onLine;

    //HTTP服务器地址
    export var http_address:any = {ip:"dbmj01.h5sd.com", port:9009};

    //游戏服务器地址
    export var address_game:any = {ip:"dbmj01.h5sd.com", port:10415};

    //测试游戏服务器地址
    export var address_test:any = {ip:"192.168.2.251", port:10415};

    //中心服务器地址 注意：这两个更换测试服 一定要改
    export var address_center:any = {ip:"lyqptest.h5sd.com", port:10416};   //dbmj01.h5sd.com   lyqptest.h5sd.com
    export var wei_href_address:string = "https://mj.h5sd.com/bcmj/index.html";

    export var appid:string = "wxb6349744356b5312";

    /**
     * 以下是微信授权返回的参数
     */
    export var state:string;
    export var code:string;

    /**
     * 测试用的帐号
     */
    export var users;
    export var ip;
    export var port;

    /**
     * 微信接口用的参数
     */
    export var timestamp:string;
    export var signature:string;
    export var noncestr:string;

    /**
     * 邀请带入的房间ID
     */
    export var roomid:string;

    /**
     * 通用字体
     * @type {string}
     */
    export var FontFamily:string = "Microsoft YaHei";

    //全局字体颜色表--可以扩展
    export var TextColors =
    {
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

    //全局字体大小表--可以扩展
    export var LabelFontSize =
    {
        littleSize: 18,//小型字体大小
        middleSize: 20,//中型字体大小
        normalSize: 24,//正常字体大小
        bigSize: 36//大型字体大小
    };

    /**
     * 规则
     * @type {{1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string}}
     */
    export var rules:any = {
        1:"夹五",
        2:"清一色",
        3:"扣听",
        4:"鸡胡鸡飘",
        5:"攒杠",
        6:"手把一",
        7:"背靠背",
        8:"责任制",
    };

    export function pushData(data:any)
    {
        for(var key in data)
        {
            GameConfig[key] = data[key];
        }
    }

        //如有需要推送消息接口
    export function sendData(action:string, data:any){

    }

    //是不是微信浏览
    export function isWeiXin(): boolean
    {
        var ua = window.navigator.userAgent.toLowerCase();

        var microStr = "" + ua.match(/MicroMessenger/i);

        if(microStr == "null")
        {
            return false;
        }
        else if(microStr == "micromessenger")
        {
            return true;
        }
    }

    //是不是大屏
    export function isBigScreen(): boolean
    {
        return (document.body.clientHeight / document.body.clientWidth > 1.32);
    } 

    //获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook
    export function systemType(): string
    {
        var ua = window.navigator.userAgent.toLowerCase();

        var microStr = "" + ua.match(/MicroMessenger/i);

        if(("" + ua.match(/windows nt/i)) == "windows nt")
        {
            return "windows";
        }
        else if(("" + ua.match(/iphone/i)) == "iphone")
        {
            return "ios";
        }
        else if(("" + ua.match(/android/i)) == "android")
        {
            return "android";
        }
        else if(("" + ua.match(/ipad/i)) == "ipad")
        {
            return "ipad";
        }
        else if(("" + ua.match(/linux/i)) == "linux")
        {
            return "linux";
        }
        else if(("" + ua.match(/mac/i)) == "mac")
        {
            return "mac";
        }
        else if(("" + ua.match(/ucbrower/i)) == "ucbrower")
        {
            return "ucbrower";
        }
        else
        {
            console.log("未知系统类型");
        }
    }  

    //获得平台类型 如 微信、qqzone、qq、微博、校内、facebook
    export function platformType(): string
    {
        var ua = window.navigator.userAgent.toLowerCase();

        if(("" + ua.match(/micromessenger/i)) == "micromessenger")
        {
            return "micromessenger";
        }
        else if(("" + ua.match(/qzone/i)) == "qzone")
        {
            return "qzone";
        }
        else if(("" + ua.match(/weibo/i)) == "weibo")
        {
            return "weibo";
        }
        else if(("" + ua.match(/qq/i)) == "qq")
        {
            return "qq";
        }
        else if(("" + ua.match(/renren/i)) == "renren")
        {
            return "renren";
        }
        else if(("" + ua.match(/txmicroblog/i)) == "txmicroblog")
        {
            return "txmicroblog";
        }
        else if(("" + ua.match(/douban/i)) == "douban")
        {
            return "douban";
        }
        else
        {
            return "other";
        }
    }

    //当前舞台
    export function curStage(): egret.Stage
    {
        return egret.MainContext.instance.stage;
    }

    //当前面板
    export var curPanel: egret.DisplayObjectContainer;

    //当前游戏宽度
    export function curWidth(): number
    {
        return egret.MainContext.instance.stage.stageWidth;
    }

    //当前游戏宽度
    export function curHeight(): number
    {
        return egret.MainContext.instance.stage.stageHeight;
    }
}



