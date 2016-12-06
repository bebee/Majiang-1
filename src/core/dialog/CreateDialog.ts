class CreateDialog extends BaseDialog {

    private m_UI: CreateUI;

    public constructor() {
        super("create_btn", 880, 570);
    }

    createChildren() {
        super.createChildren();

        this.m_UI = new CreateUI();

        this.addChild(this.m_UI);

        this.m_UI.horizontalCenter = 0;

        this.m_UI.verticalCenter = 0;
    }

    /**
     * 添加面板方法
     * dark                背景是否变黑
     * popUpWidth        指定弹窗宽度，定位使用
     * popUpHeight      指定弹窗高度，定位使用
     * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public show(): void {
        super.show(true, this.width, this.height, 1, false);

        this.m_UI.show();
    }

    /**
     * 移除面板方法
     * panel            面板
     * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public hide(): void {
        super.hide(1);

        this.m_UI.hide();
    }
}