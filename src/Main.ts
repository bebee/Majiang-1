class Main extends eui.UILayer {

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

        HttpHandler.sendMsgCallBack("http://" + GameConfig.address_center.ip + ":" + GameConfig.address_center.port + "/", "action=serverlist", function (obj) {
            var addrr = obj.addrr;
            var auth_port = obj.auth_port;
            var port = obj.port;

            GameConfig.http_address.ip = addrr;
            GameConfig.http_address.port = auth_port;

            GameConfig.address_game.ip = addrr;
            GameConfig.address_game.port = port;
        }, egret.URLRequestMethod.POST, this);
    }

    protected createChildren(): void {
        super.createChildren();

        GameParse.Initialization();
        this.addChild(GameLayerManager.gameLayer());

        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    private onThemeLoadComplete(): void {
        NativeApi.setLocalData("codes", GameConfig.code);

        GlobalData.getInstance().player = new Player();

        SceneManager.open(LoginScene, "LoginScene");

        if (!NativeApi.getLocalData("music_volume")) NativeApi.setLocalData("music_volume", 1);
        else GameMusic._volume = +NativeApi.getLocalData("music_volume");

        if (!NativeApi.getLocalData("sound_volume")) NativeApi.setLocalData("sound_volume", 1);
        else GameSound._volume = +NativeApi.getLocalData("sound_volume");

        if (!NativeApi.getLocalData("switch")) NativeApi.setLocalData("switch", 1);
    }
}