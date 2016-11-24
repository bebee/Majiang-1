class ShopDialog extends BaseDialog
{

    private m_UI:ShopUI;

    private activit:any =
    {
        1:{"title":"新手福利", "content":"　　公测期间，凡首次登陆游戏的玩家，均可获得12张房卡福利，便于体验游戏。"},
        2:{"title":"邀请福利", "content":"　　公测期间，凡邀请任何一位新人体验游戏（至少两圈）并完成牌局，其对应的邀请人可获得4张房卡，被邀请人可获得2张房卡。"},
        3:{"title":"关注福利", "content":"　　公测期间，关注微信公众号：老友棋牌（微信号：CCTV1V5）进入公众号回复“关注奖励”，即可获得4张房卡。"},
    };

    public selectIndex:number = 1;

    public constructor()
    {
        super("shop_txt", 806, 468);
    }

    createChildren()
    {
        super.createChildren();

        this.m_UI = new ShopUI();

        this.addChild(this.m_UI);

        this.m_UI.horizontalCenter = 0;

        this.m_UI.verticalCenter = 0;

        this.m_dialog._title.top = 7;

        this.m_dialog._title_img.top = -18;

        this.m_dialog._title_img.source = "shop_dialog_head_img";

        this.m_dialog._dialog_bg.source = "dialog_bg";


        for(var k in this.activit)
        {
            var some = this.activit[k];

            var title:string = some.title;

            var btn:mui.EButton = new mui.EButton("btn_cheng", title);

            this.m_UI._group.addChild(btn);

            btn.name = "" + k;

            btn.y = (+k - 1) * 59;

            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

            btn.textField.verticalCenter = -5;

            if(+k == 1)
            {
                btn.textImg.source = "btn_red";
                btn.textField.textColor = 0xfff558;
            }
        }

        this.refreshText(this.selectIndex);
    }

    private onClick(e:egret.TouchEvent = null):void
    {
        this.refreshText(+e.currentTarget.name);

        this.refreshBtn();

        var btn:mui.EButton = e.currentTarget;
        btn["textImg"].source = "btn_red";
        btn.textField.textColor = 0xfff558;
    }

    private refreshText(k:number):void
    {
        this.m_UI._labels.text = "" + this.activit[k].content;
    }

    private refreshBtn():void
    {
        var group:eui.Group = this.m_UI._group;

        for(var i = 0; i < group.numChildren; i++)
        {
            var btn = group.getChildAt(i);
            btn.x = 0;
            btn["textImg"].source = "btn_cheng";
            btn["textField"].textColor = 0xffffff;
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
    }


    /**
     * 面板关闭后需要销毁的对象
     */
    public destroy(): void {
        super.destroy();
    }
}