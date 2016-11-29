class TipsDialog extends BaseDialog
{

    private m_UI:MessageUI;

    public constructor()
    {
        super("msg_title", 662,410);
    }

    createChildren()
    {
        super.createChildren();

        this.m_UI = new MessageUI();

        this.addChild(this.m_UI);

        this.m_UI.horizontalCenter = 0;

        this.m_UI.verticalCenter = 0;

        this.m_dialog._title_img.visible = false;

        this.m_UI.btn_f.visible = this.m_UI.btn_t.visible = false;

        this.m_UI._labs.text = "投诉建议举报   lyqp01【官方微信号】";

        //"房卡问题咨询   CCTV1V5【微信公众号】\n" + "代理加盟咨询   CCTV1V5【微信公众号】";
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
    public destroy(): void
    {
        super.destroy();
    }
}