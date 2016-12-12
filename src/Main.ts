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

                GameConfig.pushData(rulv.variables);

                user = rulv.variables["users"];
                code = rulv.variables["code"];
                roomid = rulv.variables["roomid"];
            }
        }

        if (code) {
            var codes = NativeApi.getLocalData("codes");
            if (codes && codes == code)  code = null;
        }

        if (!user && !code) {
            var addres: string = GameConfig.wei_href_address;
            if (roomid) addres += "?roomid=" + roomid;
            Weixin.getAccessCode(GameConfig.appid, addres);
        }

        NativeApi.setLocalData("codes", GameConfig.code);

        // HttpHandler.sendMsgCallBack("http://"+GameConfig.address_center.ip+":"+GameConfig.address_center.port+"/", "action=serverlist", function (obj)
        // {
        //     var addrr = obj.addrr;
        //     var auth_port = obj.auth_port;
        //     var port = obj.port;
        //
        //     GameConfig.http_address.ip = addrr;
        //     GameConfig.http_address.port = auth_port;
        //
        //     GameConfig.address_game.ip = addrr;
        //     GameConfig.address_game.port = port;
        // }, egret.URLRequestMethod.POST, this);
        // GameConfig.http_address.ip = addrr;
        // GameConfig.http_address.port = auth_port;

        GameConfig.address_game.ip = GameConfig.address_test.ip;
        GameConfig.address_game.port = GameConfig.address_test.port;
    }

    protected createChildren(): void {
        super.createChildren();

        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource" + GlobalData.getInstance().resourceCode + "/default.res.json", "resource" + GlobalData.getInstance().resourceCode + "/");
    }

    private onConfigComplete(): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        var theme = new eui.Theme("resource" + GlobalData.getInstance().resourceCode + "/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    private onThemeLoadComplete(): void {
        game.init(this.stage);

        SceneManager.open(LoadingScene, "LoadingScene");
    }
}