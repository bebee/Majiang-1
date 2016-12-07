class Main extends eui.UILayer {

    /**
     * 构造函数解析URL
     */
    public constructor()
    {
        super();

        var user;

        var roomid;

        var code;

        if(window.hasOwnProperty("location"))
        {
            var search = location.search;

            if(search != "")
            {
                var rulv = new egret.URLVariables(search);

                GameConfig.pushData(rulv.variables);

                user = rulv.variables["users"];

                roomid = rulv.variables["roomid"];

                code = rulv.variables["code"];
            }
        }

        if(code)
        {
            var codes = NativeApi.getLocalData("codes");
            if(codes && codes == code)  code = null;
        }

        if(!user && !code)
        {
            var addres:string = GameConfig.wei_href_address;
            if(roomid) addres += "?roomid=" + roomid;
            Weixin.getAccessCode(GameConfig.appid, addres);
        }


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
    /**
     * 加载进度界面
     * loading process interface
     */
    protected createChildren(): void
    {
        super.createChildren();

        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //Config loading process interface

        //游戏自定义容器添加到舞台上
        this.addChild(GameLayerManager.gameLayer());

        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource"+GlobalData.getInstance().resourceCode+"/default.res.json", "resource"+GlobalData.getInstance().resourceCode+"/");

        GameParse.Initialization();
    }

    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource"+GlobalData.getInstance().resourceCode+"/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void
    {
        game.init(this.stage);
        
        NativeApi.setLocalData("codes", GameConfig.code);

        GlobalData.getInstance().player = new Player();

        SceneManager.open(LoadingScene, "LoadingScene");

        if(!NativeApi.getLocalData("music_volume"))
        {
            NativeApi.setLocalData("music_volume", 0.2);

            GameMusic._volume = 0.3;
        }
        else GameMusic._volume = +NativeApi.getLocalData("music_volume");

        if(!NativeApi.getLocalData("sound_volume"))
        {
            NativeApi.setLocalData("sound_volume", 0.5);

            GameSound._volume = 0.5;
        }
        else GameSound._volume = +NativeApi.getLocalData("sound_volume");

        if(!NativeApi.getLocalData("pai"))
        {
            NativeApi.setLocalData("pai", 1);
        }
        else
        {
            GlobalData.getInstance().cardType = +NativeApi.getLocalData("pai");
        }

        if(!NativeApi.getLocalData("style"))
        {
            NativeApi.setLocalData("style", 1);
        }
        else
        {
            GlobalData.getInstance().cardStyle = +NativeApi.getLocalData("style");
        }

        if(!NativeApi.getLocalData("switch")) NativeApi.setLocalData("switch", 1);

        if(!NativeApi.getLocalData("music")) NativeApi.setLocalData("music", 1);
    }
}