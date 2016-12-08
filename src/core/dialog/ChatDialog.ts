class ChatDialog extends BaseDialog
{
    private m_UI:ChatUI;

    public chat:any =
    {
        0:{"text":"赶紧的，麻将桌都让你给靠倒了", "id":0},
        1:{"text":"打啊，你搁那疙瘩相面呢啊？", "id":1},
        2:{"text":"不是，你嘎哈呢啊，你打的咋这慢呢？", "id":2},
        3:{"text":"打完别走啊，喝几瓶再来2圈。", "id":3},
        4:{"text":"这麻将跟你打的，哎呦我天，我都怀疑人生。", "id":4},
        5:{"text":"你跟谁俩舞舞玄玄的呢？", "id":5},
        6:{"text":"哎你这牌，打绝了。", "id":6},
        7:{"text":"那谁，你天生就是打麻将的料！", "id":7},
        8:{"text":"别闹，好好玩一会。", "id":8},
        9:{"text":"就是“蛋”多，爱咋咋滴", "id":9},
        10:{"text":"oh money money go my home", "id":12},
        11:{"text":"傻愣的，打牌要快啊", "id":13},
        12:{"text":"你那是啥网络呀，太差了", "id":14},
        13:{"text":"都别点啊，我自摸", "id":15},
        14:{"text":"你是炮兵院校毕业的？", "id":16},
        15:{"text":"看我仙人掌，搂宝咯！", "id":17},
        16:{"text":"为什么受伤的总是我", "id":18},
        17:{"text":"咋又你胡了，这脑袋嗡一下", "id":19},
        18:{"text":"别拦着我啊，连坐五庄", "id":20}
        // 0:{"text":"oh money money go my home", "id":0},
        // 1:{"text":"傻愣的，打牌要快啊", "id":8},
        // 2:{"text":"你那是啥网络呀，太差了", "id":9},
        // 3:{"text":"都别点啊，我自摸", "id":5},
        // 4:{"text":"麻将精华在于单砸", "id":1},
        // 5:{"text":"你是炮兵院校毕业的？", "id":2},
        // 6:{"text":"看我仙人掌，搂宝咯！", "id":3},
        // 7:{"text":"有钱难买上家叉，谢谢", "id":4},
        // 8:{"text":"为什么受伤的总是我", "id":6},
        // 9:{"text":"小鸡不能打，一打就打两", "id":7},
        // 10:{"text":"咋又你胡了，这脑袋嗡一下", "id":10},
        // 11:{"text":"决战到天亮，都别走", "id":11},
        // 12:{"text":"很高兴认识你们这些麻友", "id":12},
        // 13:{"text":"哎呀妈呀，你打的也忒好了", "id":13},
        // 14:{"text":"别拦着我啊，连坐五庄", "id":14},
        // 15:{"text":"昨天摸啥了，手这么臭", "id":15}
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