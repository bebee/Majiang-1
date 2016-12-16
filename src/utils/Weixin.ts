/**
 * WxApi
 * @Author Ace.c
 * @Create 2016-11-03 16:21
 */
class Weixin {

    /**
     * 获取授权code
     */
    static getAccessCode(appid: string, clientUrl: string, roomid: any) {

        var gameUrl = clientUrl + "?v=" + Math.random() + "&roomid=" + roomid;

        console.log(gameUrl);

        var url: string = "" +
            "https://open.weixin.qq.com/connect/oauth2/authorize?" +
            "appid=" + appid +
            "&redirect_uri=" + encodeURIComponent(gameUrl) +
            "&response_type=code" +
            "&scope=snsapi_userinfo" +
            "&state=1" +
            "#wechat_redirect";

        location.href = url;
    }

    /**
     * 微信权限验证
     * @param appid
     * @param timestamp
     * @param nonceStr
     * @param signature
     * @param jsApiList [chooseWXPay, startRecord, stopRecord, onVoiceRecordEnd, playVoice, pauseVoice, stopVoice, onVoicePlayEnd, uploadVoice, downloadVoice]
     */
    static config(appid: string, timestamp: number, nonceStr: string, signature: string, jsApiList: string[] = []) {
        var bodyConfig: BodyConfig = new BodyConfig();
        bodyConfig.appId = appid;
        bodyConfig.debug = false;
        bodyConfig.timestamp = timestamp;
        bodyConfig.nonceStr = nonceStr;
        bodyConfig.signature = signature;
        bodyConfig.jsApiList = jsApiList;

        if (wx) {
            wx.config(bodyConfig);

            function initJs() {
                Weixin.onMenuShareAppMessage(game.roomid + "");

                Weixin.onMenuShareTimeline(game.roomid + "");
            }

            var my = this;

            wx.ready(function () {
                if (game.roomid) {
                    initJs();
                }
                else {
                    egret.setTimeout(initJs, my, 500);
                }
            });
        }
    }

    /**
     * 支付
     * @param timestamp
     * @param nonceStr
     * @param prepay_id
     * @param paySign
     * @param success
     */
    static pay(timestamp: number, nonceStr: string, prepay_id: string, paySign: string, success?: Function) {
        wx.checkJsApi({
            jsApiList: ['chooseWXPay'],
            success: function () {
                wx.chooseWXPay({
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    package: prepay_id,
                    paySign: paySign,
                    signType: "MD5",
                    success: success
                });
            }
        });
    }

    /**
     * 关闭游戏窗口返回微信
     */
    static closeWindow() {
        var body: BodyConfig = new BodyConfig();
        wx.closeWindow(body);
    }

    /**
     * 点击分享
     */
    static onClickShare(arr: Array<any>, showBg: boolean = true) {
        var str: string = "";

        var title: string = "大赢家-";
        if (arr && arr.length > 0) {
            arr.sort(function (a, b) {
                if (Number(a.cur) < Number(b.cur)) {
                    return 1;
                }
                else {
                    return -1;
                }
            });

            for (var i = 0; i < arr.length; i++) {
                var p = arr[i];
                if (i == 0) {
                    title += p.nick + ":" + p.cur + "分";
                }
                else {
                    str += p.nick + ":" + p.cur + "分\n";
                }
            }
        }

        Global.showShare(showBg);

        function success() {
            Global.showShare();
        }

        function cancel() {
            Global.showShare();
        }

        var body: BodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        body.title = "" + title;
        body.desc = "" + str;
        body.link = "" + gameConfig.clientUrl;
        body.imgUrl = "http://mj.h5sd.com/wdmj/weishare.png";
        body.type = "link";
        body.dataUrl = "";
        body.success = success;
        body.cancel = cancel;
        wx.onMenuShareAppMessage(body);
    }

    /**
     * 分享到朋友
     * @param roomid  房间号
     */
    static onMenuShareAppMessage(roomid: string = null) {
        function success() {
            Global.showShare();
        }

        function cancel() {
            Global.showShare();
        }

        var body: BodyMenuShareAppMessage = new BodyMenuShareAppMessage();

        if (roomid) {
            var str: string = roomid + "";
            var strroomid: string = "";
            for (var i = 0; i < str.length; i++) {
                strroomid += str.charAt(i) + " ";
            }

            if (GSData.i.roomPlayers && GSData.i.roomPlayers[1]) {
                var name;
                var p = GSData.i.roomPlayers[1];
                name = p.nick;

                body.desc = "房　主：" + name + " 房间号：" + strroomid;

                if (game.matchSchedule > 0) {
                    body.desc += "【" + game.matchSchedule + "圈】" + PublicVal.i.rules;
                }
                else {
                    body.desc += " " + PublicVal.i.rules;
                }

                body.title = "跟我一起开房的点此链接！";

                body.link = gameConfig.clientUrl + "?roomid=" + roomid;
            }
            else {
                body.title = "这麻将！三天不打，上房揭瓦！";
                body.desc = "私房麻将馆，好友组局，微信登录，玩牌交友两不误！";
                body.link = "" + gameConfig.clientUrl;
            }
        }
        else {
            body.title = "这麻将！三天不打，上房揭瓦！";
            body.desc = "私房麻将馆，好友组局，微信登录，玩牌交友两不误！";
            body.link = "" + gameConfig.clientUrl;
        }

        body.imgUrl = "https://mj.h5sd.com/wdmj/weishare.png";
        body.type = "link";
        body.dataUrl = "";
        body.success = success;
        body.cancel = cancel;
        wx.onMenuShareAppMessage(body);
    }


    /**
     * 分享到朋友圈
     * @param roomid 房间号
     */
    static onMenuShareTimeline(roomid: string = null) {
        function success() {
            Global.showShare();
        }

        function cancel() {
            Global.showShare();
        }

        var body: BodyMenuShareTimeline = new BodyMenuShareTimeline();
        body.title = "这麻将！三天不打，上房揭瓦！";
        if (roomid) {
            body.link = gameConfig.clientUrl + "?roomid=" + roomid;
        }
        else {
            body.link = "" + gameConfig.clientUrl;
        }

        body.imgUrl = "https://mj.h5sd.com/wdmj/weishare.png";
        body.success = success;
        body.cancel = cancel;
        wx.onMenuShareTimeline(body);
    }

    /**
     * 隐藏保护类传播类按钮
     */
    static hideMenuItems() {
        wx.hideMenuItems({"menuList": ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"]});
    }

    /**
     * 开始录音接口
     */
    static startRecord() {
        var body: BodyConfig = new BodyConfig();
        wx.startRecord(body);
    }

    /**
     * 停止录音接口
     */
    static stopRecord() {
        wx.stopRecord({
            success: function (res) {
                var localId = res.localId;

                Weixin.uploadVoice(localId);
            }
        });
    }

    /**
     * 监听录音自动停止接口
     */
    static onVoiceRecordEnd() {
        wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function (res) {
                var localId = res.localId;
                Weixin.uploadVoice(localId);
                Global.hideVoice();
            }
        });
    }

    /**
     * 播放语音接口
     */
    static playVoice(localId: string) {
        wx.playVoice({
            localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
        });
    }

    /**
     * 暂停播放接口
     */
    static pauseVoice(localId: string) {
        wx.pauseVoice({
            localId: localId // 需要暂停的音频的本地ID，由stopRecord接口获得
        });
    }

    /**
     * 停止播放接口
     */
    static stopVoice(localId: string) {
        wx.stopVoice({
            localId: localId // 需要停止的音频的本地ID，由stopRecord接口获得
        });
    }

    /**
     * 监听语音播放完毕接口
     */
    static onVoicePlayEnd() {
        wx.onVoicePlayEnd({
            success: function (res) {
                var localId = res.localId; // 返回音频的本地ID
            }
        });
    }

    /**
     * 上传语音接口
     */
    static uploadVoice(localId: string) {
        wx.uploadVoice({
            localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 0, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回音频的服务器端ID

                SocketManager.getInstance().getGameConn().send(25, {"args": {"type": 2, "voice": {"id": serverId}}});
            }
        });
    }

    /**
     * 下载语音接口
     */
    static downloadVoice(localId: string) {
        wx.downloadVoice(
            {
                serverId: localId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
                isShowProgressTips: 0, // 默认为1，显示进度提示
                success: function (res) {
                    var localId = res.localId; // 返回音频的本地ID

                    Weixin.playVoice(localId);
                }
            });
    }
}