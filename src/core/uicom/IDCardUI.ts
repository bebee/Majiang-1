class IDCardUI extends eui.Component
{
    private rect1:egret.Sprite;
    private rect2:egret.Sprite;

    public constructor()
    {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "IDCardSkin";

        this.touchChildren = true;

        this.rect1 = new egret.Sprite();
        this.rect2 = new egret.Sprite();
    }

    public _name:eui.EditableText;

    public _user:eui.EditableText;

    public btn_click:mui.EButton;

    onComplete()
    {

    }

    createChildren()
    {
        super.createChildren();

        this.addChildAt(this.rect1, 0);
        this.addChildAt(this.rect2, 0);

        this.rect1.graphics.clear();
        this.rect2.graphics.clear();

        this.rect1.graphics.beginFill(0xC7A27D, 1);
        this.rect1.graphics.drawRoundRect(194, 134, 332, 40, 20, 20);
        this.rect1.graphics.endFill();

        this.rect2.graphics.beginFill(0xC7A27D, 1);
        this.rect2.graphics.drawRoundRect(194, 204, 332, 40, 20, 20);
        this.rect2.graphics.endFill();

        this.btn_click = new mui.EButton("btn_green", "认  证");
        this.btn_click.x = 255;
        this.btn_click.y = 279;
        this.addChild(this.btn_click);
    }
}
