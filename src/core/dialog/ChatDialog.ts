class ChatDialog extends BaseDialog
{
    private m_UI:ChatUI;

    public chat:any =
    {
        0:{"text":"赶紧的，麻将桌都让你给靠倒了"},
        1:{"text":"打啊，你搁那疙瘩相面呢啊？"},
        2:{"text":"不是，你嘎哈呢啊，你打的咋这慢呢？"},
        3:{"text":"打完别走啊，喝几瓶再来2圈。"},
        4:{"text":"这麻将跟你打的，哎呦我天，我都怀疑人生。"},
        5:{"text":"你跟谁俩舞舞玄玄的呢？"},
        6:{"text":"哎你这牌，打绝了。"},
        7:{"text":"那谁，你天生就是打麻将的料！"},
        8:{"text":"别闹，好好玩一会。"},
        9:{"text":"就是“蛋”多，爱咋咋滴"},
        10:{"text":"我是洮北区的，你哪的啊？"},
        11:{"text":"我在开发区呢，过来喝点啊？"}
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
            list.clickey = +k;
            list._labels.text = this.chat[k].text;
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