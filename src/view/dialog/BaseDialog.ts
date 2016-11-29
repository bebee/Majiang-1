/**
 * 弹出界面基类
  */
class BaseDialog extends eui.Component {

    public init: Boolean = false;//是否初始化
    public showing: Boolean = false;//是否已经显示
    public w: number = 0;
    public h: number = 0;
    public m_dialog: DialogUI;

    public constructor(title: string = "shop_txt", ui_w: number = 0, ui_h: number = 0) {
        super();
        this.w = GameConfig.curWidth();
        this.h = GameConfig.curHeight();

        this.m_dialog = new DialogUI();
        this.m_dialog.verticalCenter = 0;
        this.m_dialog.horizontalCenter = 0;
        this.m_dialog.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.m_dialog._title.source = title;
        if (ui_w > 0) this.m_dialog.width = ui_w;
        if (ui_h > 0) this.m_dialog.height = ui_h;
        this.addChild(this.m_dialog);
    }

    /**
     * 添加面板方法
     * panel            面板
     * dark                背景是否变黑
     * popUpWidth        指定弹窗宽度，定位使用
     * popUpHeight        指定弹窗高度，定位使用
     * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public show(dark: boolean = false, popUpWidth: number = 0, popUpHeight: number = 0, effectType: number = 1, isAlert: boolean = false): void {
        this.beforShow();
        this.initUI();
        this.initData();
        PopUpManager.addPopUp(this, dark, popUpWidth, popUpHeight, effectType, isAlert);
    }


    /**
     * 面板弹出之前处理
     */
    public beforShow(): void {

    }

    /**
     * 初始化面板ui
     */
    public initUI(): void {

    }


    /**
     * 初始化面板数据
     */
    public initData(): void {

    }


    /**
     * 移除面板方法
     * panel            面板
     * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public hide(effectType: number = 1): void {
        PopUpManager.removePopUp(this, effectType);
        this.destroy();
    }


    /**
     * 面板关闭后需要销毁的对象
     */
    public destroy(): void {

    }


    /**
     * 面板是否弹出状态
     */
    public getIsPopUp(): Boolean {
        return this.showing;
    }


    /**
     * 面板是否初始化完毕
     */
    public getIsInit(): Boolean {
        return this.init;
    }

    // 获取面板宽度
    public getWidth(): number {
        return this.width;
    }

    // 获取面板高度
    public getHeight(): number {
        return this.height;
    }
}