class ChatListUI extends eui.Component
{
    public clickey:number = 0;

    public constructor()
    {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "ChatListSkin";

        this.touchChildren = true;
    }

    public _labels:eui.Label;

    onComplete()
    {

    }

    createChildren()
    {
        super.createChildren();

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    private onClick(e:egret.TouchEvent):void
    {
        SocketManager.getInstance().getGameConn().send(25, {"args":{"type":1, "chat":{"id":this.clickey, "sex":GlobalData.getInstance().player.sex, "uid":GlobalData.getInstance().player.uid}}});
        //GameSound.PlaySound("chat_"+GlobalData.getInstance().player.sex+"_" + this.clickey);

        StackManager.closeDialog("ChatDialog");
    }
}
