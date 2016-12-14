class ChatPanel extends BasePanel {

    private chatGroup: eui.Group;
    private btn_chat: eui.Button;
    private expGroup: eui.Group;
    private btn_expression: eui.Button;

    public constructor() {
        super();
        this.skinName = "ChatPanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setType(BgViewType.normal);

        for (var k in gameConfig.chat) {
            var item: ChatItem = new ChatItem();
            this.chatGroup.addChild(item);

            item.clickey = +gameConfig.chat[k].id;
            item.lab_content.text = gameConfig.chat[k].text;
        }

        for (var i = 1; i <= 20; i++) {
            var img: eui.Image = new eui.Image();
            img.source = "expression" + i + ".1";
            img.name = "" + i;
            img.scaleX = img.scaleY = 0.7;
            this.expGroup.addChild(img);
            img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
        }

        this.btn_chat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkChat, this);
        this.btn_expression.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkExpression, this);
    }

    private onClickIcon(e: egret.TouchEvent): void {
        var p: PlayerVo = game.player;
        var id = +e.currentTarget.name;
        SocketManager.getInstance().getGameConn().send(25, {
            args: {
                type: 4,
                expression: {id: id, uid: p.uid}
            }
        });
        this.hide();
    }

    private checkChat(): void {
        this.chatGroup.visible = true;
        this.expGroup.visible = false;
    }

    private checkExpression(): void {
        this.chatGroup.visible = false;
        this.expGroup.visible = true;
    }
}