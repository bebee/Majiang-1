class MessageUI extends eui.Component
{
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "MessageSkin";

        this.touchChildren = true;
    }

    public btn_t:mui.EButton;

    public btn_f:mui.EButton;

    public _labs:eui.Label;

    onComplete()
    {
        this.btn_t = new mui.EButton("btn_green", "确  定", 24);
        this.btn_t.x = 391;
        this.btn_t.y = 320;
        this.addChild(this.btn_t);

        this.btn_f = new mui.EButton("btn_red", "取  消", 24);
        this.btn_f.x = 115;
        this.btn_f.y = 320;
        this.addChild(this.btn_f);
    }

    createChildren()
    {
        super.createChildren();
    }
}
