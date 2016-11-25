class LoginScene extends eui.Component
{
    public constructor()
    {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "LoginSkin";

        this.touchChildren = true;
    }

    _loading_group:eui.Group;
    load_jindu:eui.Label;
    _label_info:eui.Label;

    onComplete()
    {

    }

    createChildren()
    {
        super.createChildren();


        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");

        this._label_info.text = "正在加载游戏资源···";
    }

    /**
     * 资源加载完成
     * @param event
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {

        if(event.groupName=="preload")
        {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

            this._label_info.text = "正在拉取用户信息···";
            GlobalData.getInstance().sendLogin = true;
            SocketManager.getInstance().getGameConn().send(1);
            Heart.getInstance();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void
    {
        if(event.groupName=="preload")
        {
            var loaded:string = Math.floor(event.itemsLoaded / event.itemsTotal * 100) + "%";

            this.load_jindu.text = "" + loaded;
        }
    }


    public onIn():void
    {
        SceneManager.open(GameMainScene, "GameMainScene");

        SceneManager.close("LoginScene", true);

        GameLayerManager.gameLayer().messagBox = new MessageDialog();
    }

    public update():void
    {

    }
}
