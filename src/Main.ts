class Main extends eui.UILayer {

    /**
     * 构造函数解析URL
     */
    public constructor() {
        super();

        var variables: egret.URLVariables = new egret.URLVariables(location.search);
        var accessType = variables.variables["accessType"];
        var roomid = variables.variables["roomid"];
        var user = variables.variables["users"];
        var code = variables.variables["code"];

        user = user == "" ? null : user;
        code = code == "" ? null : code;

        console.log(roomid, user, code, accessType);

        game.roomid = roomid;
        game.user = user;

        gameConfig.code = code;

        if (user) {
            gameConfig.address_game.ip = gameConfig.address_test.ip;
            gameConfig.address_game.port = gameConfig.address_test.port;
            return;
        }

        //TODO 动态修改游戏地址访问地址
        if (accessType == "test") {//测试
            gameConfig.clientUrl = gameConfig.protocolType + gameConfig.domainName + "chuanma/test.html";
        }
        else {//正式
            gameConfig.clientUrl = gameConfig.protocolType + gameConfig.domainName + "chuanma/game.html";
        }

        //本地存储code比对, 如果相同则视为无效登录
        if (gameLocal.getData(gameLocal.loginCode) == code) {
            code = null;
        }

        if (!user && !code) {
            Weixin.getAccessCode(gameConfig.appid, gameConfig.clientUrl, roomid);
            return;
        }

        gameLocal.setData(gameLocal.loginCode, code);

        var _this = this;
        HttpHandler.sendMsgCallBack(gameConfig.protocolType + gameConfig.address_center.ip + ":" + gameConfig.address_center.port + "/", function (obj) {
            gameConfig.address_http.ip = obj.addrr;
            gameConfig.address_http.port = obj.auth_port;
            gameConfig.address_game.ip = obj.addrr;
            gameConfig.address_game.port = obj.port;

            _this.wxConfig();
        }, this, "action=serverlist");
    }

    private wxConfig() {
        var sss: any = {"role": "user", "mod": "mod_auths", "fun": "auth_signature", "args": {}};

        var arr: Array<string> = ["closeWindow", "hideMenuItems", "onMenuShareAppMessage", "onMenuShareTimeline", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice"];

        HttpHandler.sendMsgCallBack(gameConfig.protocolType + gameConfig.address_http.ip + ":" + gameConfig.address_http.port, function (obj) {
            if (obj.message != "error") {
                var data:any = JSON.parse(obj.message);
                Weixin.config(
                    gameConfig.appid,
                    data.timestamp,
                    data.noncestr,
                    data.signature,
                    arr
                );
            }
        }, this, "action=" + JSON.stringify(sss));
    }

    protected createChildren(): void {
        super.createChildren();

        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    private onConfigComplete(): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    private onThemeLoadComplete(): void {
        // this.startGame();

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);

        RES.loadGroup("loading");
    }

    /**
     * 资源加载完成
     * @param e
     */
    private onResourceLoadComplete(e: RES.ResourceEvent): void {
        if (e.groupName == "loading") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);

            this.startGame();
        }
    }

    private startGame() {
        game.init(this.stage);
        SceneManager.open("LoadingScene");
    }
}