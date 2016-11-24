class Heart
{
    public timer:egret.Timer;

    private second: number = 0;

    public nettime:number = 0;

    private testHorn:number = 0;

    private loginTime:number = 0;

    private static instance:Heart = null;

    public constructor()
    {
        this.timer = new egret.Timer(100);

        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);

        this.timer.start();
    }

    public static getInstance() :Heart
    {
        if(this.instance == null)
        {
            this.instance = new Heart();
        }
        return this.instance;
    }

    private onTimer(e:egret.TimerEvent):void
    {
        this.second++;

        if(this.second >= 10)
        {
            this.second = 0;

            this.testHorn ++;

            if(GlobalData.getInstance().sendLogin)
            {
                this.loginTime ++;

                if(this.loginTime > 5)
                {
                    if(!GameLayerManager.gameLayer().messagBox) GameLayerManager.gameLayer().messagBox = new MessageDialog();

                    GameLayerManager.gameLayer().messagBox.showMsg(function (r)
                    {
                        GlobalData.getInstance().sendLogin = false;

                        if(r)
                        {
                            location.reload();
                        }
                        else
                        {
                            location.reload();
                        }

                    },"当前网络状况不佳，请刷新重试！");
                }
            }

            if(this.testHorn >= 120)
            {
                this.testHorn = 0;

                var num:number = Math.floor(Math.random() * GlobalData.getInstance().gamewarmList.length);
                GlobalData.getInstance().hornList.push(GlobalData.getInstance().gamewarmList[num]);
            }

            if(GlobalData.getInstance().hornList.length > 0) Global.showHorn(20, 0x40f8ff);
        }
    }
}
