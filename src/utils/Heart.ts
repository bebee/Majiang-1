class Heart
{
    public timer:egret.Timer;

    private second: number = 0;

    public nettime:number = 0;

    private testHorn:number = 0;

    private loginTime:number = 0;

    public dissolutionTime:number = 0;

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

        this.loginTime ++;

        if(this.loginTime >= 50)
        {
            this.loginTime = 0;

            if(GlobalData.getInstance().sendLogin) Global.reLogin();
        }

        if(this.second >= 10)
        {
            this.second = 0;

            this.testHorn ++;

            if(this.testHorn >= 120)
            {
                this.testHorn = 0;

                var num:number = Math.floor(Math.random() * GlobalData.getInstance().gamewarmList.length);
                GlobalData.getInstance().hornList.push(GlobalData.getInstance().gamewarmList[num]);
            }

            if(GlobalData.getInstance().hornList.length > 0) Global.showHorn(20, 0x40f8ff);


            if(this.dissolutionTime > 0)
            {
                this.dissolutionTime --;

                var diss:DissolutionDialog = StackManager.findDialog(DissolutionDialog, "DissolutionDialog");

                if(diss && GameLayerManager.gameLayer().panelLayer.contains(diss))
                {
                    diss.onTimes(this.dissolutionTime);
                }
            }
        }
    }
}
