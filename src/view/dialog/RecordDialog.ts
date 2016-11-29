class RecordDialog extends BaseDialog
{

    private m_UI:RecordUI;

    public obj:Array<any> = [];
    public xobj:Array<any> = [];

    private itemList:any = {};
    private XitemList:any = {};

    public pcList:Array<any> = [];


    private isXiang:boolean = false;

    public constructor()
    {
        super("record_txt", 870, 580);
    }

    createChildren()
    {
        super.createChildren();

        this.m_UI = new RecordUI();

        this.addChild(this.m_UI);

        this.m_UI.horizontalCenter = 0;

        this.m_UI.verticalCenter = 0;
    }

    public refreshXList():void
    {
        this.isXiang = true;

        this.m_UI._group.scrollV = 0;

        this.m_UI._group.removeChildren();

        for(var i = 0; i < this.xobj.length; i++)
        {
            var some:Array<any> = this.xobj[i];

            some.push(i+1);

            var list:RecordXItem;
            if(this.XitemList[i])
            {
                list = this.XitemList[i];
                list.obj = some;
            }
            else
            {
                list = new RecordXItem(some);
            }

            this.m_UI._group.addChild(list);

            list.onUpdate();
        }
    }

    public refreshList():void
    {
        this.isXiang = false;

        this.m_UI._group.scrollV = 0;

        this.m_UI._group.removeChildren();

        for(var i = 0; i < this.obj.length; i++)
        {
            var some:any = this.obj[i];

            some["rank"] = i;

            var list:RecordItem;
            if(this.itemList[i])
            {
                list = this.itemList[i];
                list.obj = some;
            }
            else
            {
                list = new RecordItem(some);
            }

            this.m_UI._group.addChild(list);

            list.onUpdate();
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

        SocketManager.getInstance().getGameConn().send(19,{});
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
        if(this.isXiang)
        {
            this.refreshList();

            return;
        }

        super.hide(1);
    }


    /**
     * 面板关闭后需要销毁的对象
     */
    public destroy(): void {
        super.destroy();
    }
}