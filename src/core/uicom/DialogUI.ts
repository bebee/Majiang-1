class DialogUI extends eui.Component
{
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "DialogSkin";

        this.touchChildren = true;
    }

    public btn_close:mui.EButton;

    public _title:eui.Image;

    public _title_img:eui.Image;

    public _dialog_bg:eui.Image;

    onComplete()
    {
        this.btn_close = new mui.EButton("close_btn", "", 20);

        this.addChild(this.btn_close);
    }

    createChildren()
    {
        super.createChildren();
    }
}
