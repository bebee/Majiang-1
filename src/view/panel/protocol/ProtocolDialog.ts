class ProtocolDialog extends BaseDialog {

    private scroller: eui.Scroller;
    private group: eui.Group;
    private lab_description: eui.Label;

    private text: eui.Label;

    public constructor() {
        super("agreement_text", 880, 570);

        this.skinName = "ProtocolPanelSkin";
    }

    createChildren() {
        super.createChildren();

        this.horizontalCenter = 0;

        this.verticalCenter = 0;

        this.m_dialog._title_img.visible = false;

        this.decode();
    }

    public decode(): void {

        var _this = this;
        RES.getResAsync("protocol", function () {

            var json: any = RES.getRes("protocol");

            if (!json) return;

            var arrt: Array<any> = [];

            if (json["ztitle"]) {
                arrt.push({
                    text: "　　　　　　　　　　　" + json["ztitle"] + "\n",
                    style: {"textColor": 0xA97144, "fontFamily": "" + GameConfig.FontFamily, "size": 24}
                });
            }

            if (json["title"]) {
                arrt.push({
                    text: "　　" + json["title"],
                    style: {"textColor": 0xA97144, "fontFamily": "" + GameConfig.FontFamily, "size": 20}
                });
            }

            var content: any;
            for (var key1 in json.content) {
                content = json.content[key1];

                if (!content) continue;

                arrt.push({
                    text: "\n\n" + content["desc"],
                    style: {"textColor": 0xA97144, "fontFamily": "" + GameConfig.FontFamily, "size": 22}
                });

                if (!content.list) continue;

                for (var key2 in content.list) {
                    arrt.push({
                        text: "\n" + content.list[key2],
                        style: {"textColor": 0xA97144, "fontFamily": "" + GameConfig.FontFamily, "size": 20}
                    });
                }
            }

            if (json["etitle"]) {
                arrt.push({
                    text: "\n　　" + json["etitle"],
                    style: {"textColor": 0xA97144, "fontFamily": "" + GameConfig.FontFamily, "size": 20}
                });
            }
            _this.lab_description.textFlow = arrt;

            _this.scroller.viewport.scrollV = 0;
            _this.scroller.validateNow();

        }, this);
    }
}