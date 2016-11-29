class ChatUI extends eui.Component
{
    public constructor()
    {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "ChatSkin";

        this.touchChildren = true;
    }

    public _group:eui.Group;

    onComplete()
    {

    }

    createChildren()
    {
        super.createChildren();
    }
}
