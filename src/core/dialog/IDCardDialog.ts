class IDCardDialog extends BaseDialog
{
    private m_UI:IDCardUI;

    public constructor()
    {
        super("idcard_title", 666, 382);
    }
    
    createChildren()
    {
        super.createChildren();

        this.m_UI = new IDCardUI();

        this.addChild(this.m_UI);

        this.m_UI.horizontalCenter = 0;

        this.m_UI.verticalCenter = 0;

        this.m_dialog._title_img.visible = false;
        this.m_dialog._title.visible = false;

        this.m_UI._name.text = "请输入姓名";
        this.m_UI._user.text = "请输入身份证号";

        this.m_UI._name.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickName, this);
        this.m_UI._user.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickUser, this);

        this.m_UI.btn_click.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    private onClick():void
    {
        if(this.m_UI._name.text == "请输入姓名")
        {
            return EffectUtils.showTips("请输入姓名!");
        }

        if(this.m_UI._user.text == "请输入身份证号")
        {
            return EffectUtils.showTips("请输入身份证号!");
        }

        if(RegUtils.isNull(this.m_UI._name.text))
        {
            return EffectUtils.showTips("姓名不能为空!");
        }

        if(RegUtils.isNull(this.m_UI._user.text))
        {
            return EffectUtils.showTips("身份证号不能为空!");
        }

        if(this.m_UI._user.text.length != 18 && this.m_UI._user.text.length != 15)
        {
            return EffectUtils.showTips("身份证号长度不正确!");
        }

        EffectUtils.showTips("身份信息认证成功!");

        this.hide();
    }

    private onClickName():void
    {
        if(this.m_UI._name.text == "请输入姓名")
        {
            this.m_UI._name.text = "";
        }
    }

    private onClickUser():void
    {
        if(this.m_UI._user.text == "请输入身份证号")
        {
            this.m_UI._user.text = "";
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
    public beforShow(): void
    {
        super.beforShow();
    }

    /**
     * 初始化面板ui
     */
    public initUI(): void
    {
        super.initUI();
    }


    /**
     * 初始化面板数据
     */
    public initData(): void
    {
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

        this.m_UI._name.text = "请输入姓名";
        this.m_UI._user.text = "请输入身份证号";
    }


    /**
     * 面板关闭后需要销毁的对象
     */
    public destroy(): void
    {
        super.destroy();
    }
}