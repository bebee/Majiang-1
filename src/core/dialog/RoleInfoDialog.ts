class RoleInfoDialog extends BaseDialog
{

    private m_UI:RoleInfoUI;

    /**
     * 玩家头像
     */
    private _head:GSHeadIcon;


    /**
     * 关闭按钮
     */
    private btn_closes:mui.EButton;

    public constructor()
    {
        super("", 503, 159);
    }

    createChildren()
    {
        super.createChildren();

        this.m_UI = new RoleInfoUI();

        this.addChild(this.m_UI);

        this.m_UI.horizontalCenter = 0;

        this.m_UI.verticalCenter = 0;

        this.m_dialog.visible = false;

        this._head = new GSHeadIcon();
        this.m_UI.addChild(this._head);
        this._head.x = 73;
        this._head.y = 95;


        this.btn_closes = new mui.EButton("close_btn");
        this.btn_closes.x = 453;
        this.btn_closes.y = -30;

        this._head.headImg.width = this._head.headImg.height = 100;

        this.m_UI.addChild(this.btn_closes);

        this.btn_closes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
    }

    public refreshRole(player:any = null):void
    {
        if(!player) player = GlobalData.getInstance().player;

        this.m_UI._name.text = "" + player.nick;

        this.m_UI._id.text = "I D：" + player.uid;

        this.m_UI._ip.text = "I P：" + player.ip;


        RES.getResByUrl(player.pic, function(t:egret.Texture)
        {
            if(t)
            {
                this._head.setHeadImg(t);
            }

        }, this, RES.ResourceItem.TYPE_IMAGE);
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
    }


    /**
     * 面板关闭后需要销毁的对象
     */
    public destroy(): void {
        super.destroy();
    }
}