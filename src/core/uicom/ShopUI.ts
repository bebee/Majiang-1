class ShopUI extends eui.Component
{
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "ShopSkin";

        this.touchChildren = true;
    }

    public _group:eui.Group;

    public _labels:eui.Label;

    onComplete()
    {

    }

    createChildren()
    {
        super.createChildren();
    }
}
