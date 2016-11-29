class ChatPao extends eui.Component
{
    public constructor()
    {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "ChatPaoSkin";

        this.touchChildren = true;
    }

    public _biao:eui.Image;

    public _txt:eui.Label;

    onComplete()
    {

    }

    createChildren()
    {
        super.createChildren();
    }
}
