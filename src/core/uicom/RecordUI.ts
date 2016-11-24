class RecordUI extends eui.Component
{
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "RecordSkin";

        this.touchChildren = true;
    }

    _group:eui.Group;

    _scroller:eui.Label;

    onComplete()
    {

    }

    createChildren()
    {
        super.createChildren();
    }
}
