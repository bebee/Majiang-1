class UserAgreement extends BaseDialog
{

    private m_UI:RuleUI;

    private text:eui.Label;

    private jsons:any;

    public constructor()
    {
        super();
    }

    createChildren()
    {
        super.createChildren();

        this.m_UI = new RuleUI();

        this.addChild(this.m_UI);

        this.m_UI.horizontalCenter = 0;

        this.m_UI.verticalCenter = 0;

        this.m_dialog._title_img.visible = false;

        this.m_dialog._title.source = "agreement_text";

        this.jsons = RES.getRes("agreement");

        if(!this.jsons) return;

        var arrt:Array<any> = [];

        if(this.jsons["ztitle"]) arrt.push({text:"　　　　　　　　　　　"+this.jsons["ztitle"] + "\n",style: {"textColor":0xA97144,"fontFamily": "" + GameConfig.FontFamily,"size":24}});

        if(this.jsons["title"]) arrt.push({text:"　　"+this.jsons["title"],style: {"textColor":0xA97144,"fontFamily": "" + GameConfig.FontFamily,"size":20}});

        var content = this.jsons.content;

        for(var k in content)
        {
            var some = content[k];

            if(!some) continue;

            arrt.push({text:"\n\n" + some["desc"],style: {"textColor":0xA97144,"fontFamily": "" + GameConfig.FontFamily,"size":22}});

            var list = some.list;

            if(!list) continue;

            for(var l in list)
            {
                arrt.push({text:"\n" + list[l],style: {"textColor":0xA97144,"fontFamily": "" + GameConfig.FontFamily,"size":20}});
            }
        }

        if(this.jsons["etitle"]) arrt.push({text:"\n　　"+this.jsons["etitle"],style: {"textColor":0xA97144,"fontFamily": "" + GameConfig.FontFamily,"size":20}});

        this.setText(arrt);
    }

    public setText(arr:Array<any>):void
    {
        this.text = new eui.Label();
        this.text.width = this.m_UI._scroller.width - 40;
        this.text.lineSpacing = 10;
        this.text.textFlow = <Array < egret.ITextElement >>arr;
        this.m_UI._group.addChild(this.text);
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