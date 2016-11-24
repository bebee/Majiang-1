class JoinDialog extends BaseDialog
{

    private m_UI:JoinUI;

    private clickNum:Array<any> = [];

    private textList:Array<any> = [];

    public constructor()
    {
        super("joingame_txt", 730, 484);
    }

    createChildren()
    {
        super.createChildren();

        this.m_UI = new JoinUI();

        this.addChild(this.m_UI);

        this.m_UI.horizontalCenter = 0;

        this.m_UI.verticalCenter = 0;

        for(var i = 0; i < 12; i++)
        {
            var t:eui.Label = this.m_UI["_t" + i];

            t.name = "" + i;

            t.addEventListener(egret.TouchEvent.TOUCH_END,this.onClick, this);
            t.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClick, this);
            t.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
            t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    }

    private onJoin():void
    {
        if(this.clickNum.length < 4)
        {
            EffectUtils.showTips("请输入4-6位的房间号", 5, false);
            return;
        }

        var str:string = "";

        for(var i = 0; i< this.clickNum.length; i++)
        {
            str += ""+this.clickNum[i];
        }

        GSData.i.roomID = +str;

        SocketManager.getInstance().getGameConn().send(3, {"args":{"roomid":+str, "pass":"0"}});
    }

    private onClick(e:egret.TouchEvent):void
    {
        var i = +e.currentTarget.name;

        var t:eui.Label = e.currentTarget;

        var img:eui.Image = this.m_UI["_img" + i];

        switch (e.type)
        {
            case "touchBegin":
                this.addStage();
                img.source = "clickeff_btn";
                t.textColor = 0xffea00;
                break;
            case "touchEnd":
                this.removeStage();
                img.source = "clickeff_of_btn";
                this.clearText();
                break;
            case "touchMove":
                break;
            case "touchTap":
                if(i == 11)
                {
                    this.onJoin();
                }
                else if(i == 10)
                {
                    this.clickNum.pop();
                }
                else
                {
                    if(this.clickNum.length < 6) this.clickNum.push(i);
                }

                this.refreshText();
                break;
        }
    }

    private addStage():void
    {
        GameConfig.curStage().addEventListener(egret.TouchEvent.TOUCH_END, this.onMove, this);
        GameConfig.curStage().addEventListener(egret.Event.LEAVE_STAGE, this.onMove, this);
    }

    private removeStage():void
    {
        GameConfig.curStage().removeEventListener(egret.TouchEvent.TOUCH_END, this.onMove, this);
        GameConfig.curStage().removeEventListener(egret.Event.LEAVE_STAGE, this.onMove, this);
    }

    private onMove(e:egret.Event = null):void
    {
        this.clearText();
    }

    private clearText():void
    {
        for(var i = 0; i < 12; i++)
        {
            var t:eui.Label = this.m_UI["_t" + i];
            t.textColor = 0xffffff;

            var img:eui.Image = this.m_UI["_img" + i];
            img.source = "clickeff_of_btn";
        }
    }

    private refreshText():void
    {
        this.m_UI._group.removeChildren();

        for(var i = 0; i < this.clickNum.length; i++)
        {
            var nt:eui.Label;

            if(this.textList[i])
            {
                nt = this.textList[i];
            }
            else
            {
                nt = new eui.Label();
                nt.size = 30;
                nt.textColor = 0x0B941D;
                nt.bold = true;
                this.textList[i] = nt;
            }

            nt.text = "" + this.clickNum[i];

            this.m_UI._group.addChild(nt);
        }
    }

    /**
     * 添加面板方法
     * dark        		背景是否变黑
     * popUpWidth      	指定弹窗宽度，定位使用
     * popUpHeight      指定弹窗高度，定位使用
     * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public show(): void
    {
        super.show(true, this.width, this.height, 1, false);
    }

    /**
     * 面板弹出之前处理
     */
    public beforShow(): void {
        super.beforShow();
    }

    /**
     * 初始化面板ui
     */
    public initUI(): void {
        super.initUI();
    }


    /**
     * 初始化面板数据
     */
    public initData(): void {
        super.initData();
    }


    /**
     * 移除面板方法
     * panel       		面板
     * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public hide(): void
    {
        super.hide(1);

        this.clickNum = [];

        this.refreshText();
    }


    /**
     * 面板关闭后需要销毁的对象
     */
    public destroy(): void {
        super.destroy();
    }
}