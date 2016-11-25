class CreateDialog extends BaseDialog
{

    private checkBoxSize:any = {
        1:{x:307, y:187},
        2:{x:467, y:187},
        3:{x:627, y:187},
        4:{x:307, y:231},
        5:{x:467, y:231},
        6:{x:627, y:231},
        7:{x:307, y:278},
        8:{x:627, y:187}
    };

    private _xy:any = {
        1:{x:198, y:113},
        2:{x:403, y:113},
        3:{x:607, y:113}
    };
    private m_UI:CreateUI;

    public selectIndex:number = 1;

    public checkIndex:number = 0;

    public roudList:any = {
        1:2,
        2:4,
        3:8
    };

    public constructor()
    {
        super("create_btn", 792, 510);
    }

    createChildren()
    {
        super.createChildren();

        this.m_UI = new CreateUI();

        this.addChild(this.m_UI);

        this.m_UI.horizontalCenter = 0;

        this.m_UI.verticalCenter = 0;

        this.m_UI.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        for(var i = 1; i <= 8; i++)
        {
            var ck:mui.ERadio = new mui.ERadio();
            this.m_UI.addChild(ck);
            ck.name = "" + i;
            ck.x = this.checkBoxSize[i]["x"];
            ck.y = this.checkBoxSize[i]["y"];
            if(i == 3) ck.visible = false;
            var lab:eui.Label = this.m_UI["_tg" + i];

            if(i <= 3)
            {
                ck.setSelectIndex(0);
                lab.textColor = 0xA07A4B;
            }
            else
            {
                ck.setSelectIndex(1);
                lab.textColor = 0xff2f19;
            }

            this.checkBoxSize[i]["item"] = ck;
        }

        this.m_UI._center_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSize, this);
        this.m_UI._lef_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSize, this);
        this.m_UI._right_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSize, this);

        this.m_UI.btn_fanxuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheck, this);

        this.m_UI.btn_suiji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRandom, this);

        this.m_UI._riado.touchEnabled = false;
        //this.m_UI._riado.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        //this.m_UI._riado.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
    }

    private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
    private _distance:egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_riado的位置差

    private mouseDown(evt:egret.TouchEvent)
    {
        this._touchStatus = true;
        this._distance.x = evt.stageX - this.m_UI._riado.x;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private mouseMove(evt:egret.TouchEvent)
    {
        if( this._touchStatus )
        {
            var _x:number = evt.stageX - this._distance.x;

            if(_x < 226) _x = 226;
            if(_x > 635) _x = 635;

            this.m_UI._riado.x = _x;
        }
    }

    private mouseUp(evt:egret.TouchEvent)
    {
        this._touchStatus = false;

        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }


    private onRandom():void
    {
        var str:string = "";
        var n1:number = Math.floor(Math.random() * 10);
        str += "" + n1;
        var n2:number = Math.floor(Math.random() * 10);
        str += "" + n2;
        var n3:number = Math.floor(Math.random() * 10);
        str += "" + n3;
        var n4:number = Math.floor(Math.random() * 10);
        str += "" + n4;

        this.m_UI._edit.text = "" +str;

    }

    private onCheck():void
    {
        if(this.checkIndex == 0)
        {
            this.checkIndex = 1;
        }
        else if(this.checkIndex == 1)
        {
            this.checkIndex = 0;
        }

        this.setCheck();
    }

    private setCheck(index:number = this.checkIndex):void
    {
        this.m_UI.btn_fanxuan.textImg.source = "create_xz" + index;

        for(var i = 1; i <= 8; i++)
        {
            var ck:mui.ERadio = this.checkBoxSize[i]["item"];

            var lab:eui.Label = this.m_UI["_tg"+i];

            ck.setSelectIndex(index);

            if(index == 0)
            {
                lab.textColor = 0xA07A4B;
            }
            else
            {
                lab.textColor = 0xff2f19;
            }
        }
    }

    public refreshText():void
    {
        for(var i = 1; i <= 8; i++)
        {
            var ck:mui.ERadio = this.checkBoxSize[i]["item"];

            var lab:eui.Label = this.m_UI["_tg"+i];

            if(ck.selectIndex == 0)
            {
                lab.textColor = 0xA07A4B;
            }
            else
            {
                lab.textColor = 0xff2f19;
            }
        }
    }

    private onSize(e:egret.TouchEvent):void
    {
        switch (e.currentTarget)
        {
            case this.m_UI._center_btn:
                this.selectIndex = 2;
                this.m_UI._tq1.textColor = 0xA07A4B;
                this.m_UI._tq2.textColor = 0xff2f19;
                this.m_UI._tq3.textColor = 0xA07A4B;
                break;
            case this.m_UI._lef_btn:
                this.selectIndex = 1;
                this.m_UI._tq1.textColor = 0xff2f19;
                this.m_UI._tq2.textColor = 0xA07A4B;
                this.m_UI._tq3.textColor = 0xA07A4B;
                break;
            case this.m_UI._right_btn:
                this.selectIndex = 3;
                this.m_UI._tq1.textColor = 0xA07A4B;
                this.m_UI._tq2.textColor = 0xA07A4B;
                this.m_UI._tq3.textColor = 0xff2f19;
                break;
        }

        this.m_UI._riado.x = this._xy[this.selectIndex]["x"];
        this.m_UI._riado.y = this._xy[this.selectIndex]["y"];
    }

    private onClick():void
    {

        // if(this.m_UI._edit.text == "")
        // {
        //     EffectUtils.showTips("密码不能为空", 5);
        //     return;
        // }
        //
        // if(!RegUtils.isNumber(this.m_UI._edit.text))
        // {
        //     EffectUtils.showTips("密码格式不正确(只能是数字)", 5);
        //     return;
        // }

        var arr:Array<any> = [];

        for(var i = 1; i <= 8; i++)
        {
            var ck:mui.ERadio = this.checkBoxSize[i]["item"];

            if(ck.selectIndex == 1)
            {
                arr.push(i);
            }
        }

        SocketManager.getInstance().getGameConn().send(2, {"args":{"type":1,"round":this.roudList[this.selectIndex], "rules":arr, "pass":"0"}});  //创建房间
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

        for(var i = 1; i <= 8; i++)
        {
            var ck:mui.ERadio = this.checkBoxSize[i]["item"];
            if(i <= 3) ck.setSelectIndex(0);
            else ck.setSelectIndex(1);
        }

        this.m_UI.btn_fanxuan.textImg.source = "create_xz" + this.checkIndex;

        this.m_UI._riado.x = this._xy[this.selectIndex]["x"];
        this.m_UI._riado.y = this._xy[this.selectIndex]["y"];

        this.m_UI._edit.text = "0000";
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

        this.selectIndex = 1;
        this.checkIndex = 0;
    }


    /**
     * 面板关闭后需要销毁的对象
     */
    public destroy(): void
    {
        super.destroy();
    }
}