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

    public _group_b:eui.Group;


    public btn_chat:eui.Image;
    public btn_expression:eui.Image;

    onComplete()
    {
        this.btn_chat = new eui.Image();
        this.btn_chat.source = "chat_btn_cl";
        this.btn_chat.x = 543;
        this.btn_chat.y = 48;
        this.addChild(this.btn_chat);

        this.btn_expression = new eui.Image();
        this.btn_expression.source = "chat_btn_ba";
        this.btn_expression.x = 543;
        this.btn_expression.y = 187;
        this.addChild(this.btn_expression);
    }

    createChildren()
    {
        super.createChildren();
    }
}
