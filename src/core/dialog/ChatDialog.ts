class ChatDialog extends BaseDialog
{
    private m_UI:ChatUI;

    public chat:any =
    {
        0:{"text":"你太牛了！", "id":0},
        1:{"text":"哈哈，手气真好。", "id":1},
        2:{"text":"快点出牌呀。", "id":2},
        3:{"text":"今天真高兴。", "id":3},
        4:{"text":"你放炮，我不胡！", "id":4},
        5:{"text":"你家里是开银行的吧？", "id":5},
        6:{"text":"不好意思，我有事要先走一步啦。", "id":6},
        7:{"text":"你的牌打的太好了。", "id":7},
        8:{"text":"大家好，很高兴见到各位", "id":8},
        9:{"text":"怎么又断线了，网络怎么这么差呀？", "id":9},
    };

    public constructor()
    {
        super("bind_img", 670, 388);
    }

    createChildren()
    {
        super.createChildren();

        this.m_UI = new ChatUI();

        this.addChild(this.m_UI);

        this.m_UI.horizontalCenter = 0;

        this.m_UI.verticalCenter = 0;

        this.m_dialog._title_img.visible = false;

        this.m_dialog._title.visible = false;

        for(var k in this.chat)
        {
            var list:ChatListUI = new ChatListUI();
            this.m_UI._group.addChild(list);
            list.clickey = +this.chat[k].id;
            list._labels.text = this.chat[k].text;
        }

        this.m_UI.btn_chat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkChat, this);

        this.m_UI.btn_expression.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkExpression, this);


        for(var i = 1; i <= 20; i++)
        {
            var img:eui.Image = new eui.Image();
            img.source = "expression"+i+".1";
            img.name = "" + i;
            img.scaleX = img.scaleY = 0.7;
            this.m_UI._group_b.addChild(img);
            img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
        }
    }

    private onClickIcon(e:egret.TouchEvent):void
    {
        var p:Player = GlobalData.getInstance().player;
        var id = +e.currentTarget.name;
        SocketManager.getInstance().getGameConn().send(25, {"args":{"type":4, "expression":{"id":id, "uid":p.uid}}});
        this.hide();
    }

    private checkChat():void
    {
        this.m_UI._group.visible = true;
        this.m_UI._group_b.visible = false;
        this.m_UI.btn_chat.source = "chat_btn_cl";
        this.m_UI.btn_expression.source = "chat_btn_ba";
    }

    private checkExpression():void
    {
        this.m_UI._group.visible = false;
        this.m_UI._group_b.visible = true;
        this.m_UI.btn_chat.source = "chat_btn_ca";
        this.m_UI.btn_expression.source = "chat_btn_bl";
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
     * 移除面板方法
     * panel       		面板
     * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public hide(): void
    {
        super.hide(1);

        this.checkChat();
    }

    /**
     * 面板关闭后需要销毁的对象
     */
    public destroy(): void
    {
        super.destroy();
    }
}