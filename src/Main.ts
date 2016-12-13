class Main extends eui.UILayer {

    /**
     * 构造函数解析URL
     */
    public constructor() {
        super();

        var user;
        var code;
        var roomid;

        if (window.hasOwnProperty("location")) {
            var search = location.search;

            if (search != "") {
                var rulv = new egret.URLVariables(search);

                gameConfig.update(rulv.variables);

                user = rulv.variables["users"];
                code = rulv.variables["code"];
                roomid = rulv.variables["roomid"];
            }
        }

        if (gameLocal.getData(gameLocal.loginCode) == code)  code = null;

        if (!user && !code) {
            var addres: string = gameConfig.GameUrl;
            if (roomid) addres += "?roomid=" + roomid;
            Weixin.getAccessCode(gameConfig.appid, addres);
        }

        gameLocal.setData(gameLocal.loginCode, code);

        // HttpHandler.sendMsgCallBack("http://"+gameConfig.address_center.ip+":"+gameConfig.address_center.port+"/", "action=serverlist", function (obj)
        // {
        //     var addrr = obj.addrr;
        //     var auth_port = obj.auth_port;
        //     var port = obj.port;
        //
        //     gameConfig.address_http.ip = addrr;
        //     gameConfig.address_http.port = auth_port;
        //
        //     gameConfig.address_game.ip = addrr;
        //     gameConfig.address_game.port = port;
        // }, egret.URLRequestMethod.POST, this);
        // gameConfig.address_http.ip = addrr;
        // gameConfig.address_http.port = auth_port;

        gameConfig.address_game.ip = gameConfig.address_test.ip;
        gameConfig.address_game.port = gameConfig.address_test.port;
    }

    protected createChildren(): void {
        super.createChildren();

        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource" + gameData.version + "/default.res.json", "resource" + gameData.version + "/");
    }

    private onConfigComplete(): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        var theme = new eui.Theme("resource" + gameData.version + "/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    private onThemeLoadComplete(): void {
        game.init(this.stage);

        SceneManager.open(LoadingScene, "LoadingScene");
    }
}