class DissolutionUI extends eui.Component
{
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "DissolutionSkin";

        this.touchChildren = true;
    }

    public _img1:eui.Image;
    public _img2:eui.Image;
    public _img3:eui.Image;
    public _img4:eui.Image;

    public _label1:eui.Label;
    public _label2:eui.Label;
    public _label3:eui.Label;
    public _label4:eui.Label;

    public btn_true:mui.EButton;

    public btn_false:mui.EButton;

    onComplete()
    {
        this.btn_true = new mui.EButton("btn_green","同  意", 24);

        this.btn_true.x = 404;

        this.btn_true.y = 303;

        this.addChild(this.btn_true);


        this.btn_false = new mui.EButton("btn_red","拒  绝", 24);

        this.btn_false.x = 110;

        this.btn_false.y = 303;

        this.addChild(this.btn_false);
    }

    createChildren()
    {
        super.createChildren();
    }
}
