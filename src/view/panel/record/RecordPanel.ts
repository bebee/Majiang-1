class RecordPanel extends BasePanel {

    private scroller:eui.Scroller;
    private group:eui.Group;

    public obj: Array<any> = [];
    public xobj: Array<any> = [];

    private itemList: any = {};
    private XitemList: any = {};

    public pcList: Array<any> = [];


    private isXiang: boolean = false;

    public constructor() {
        super();
        this.skinName = "RecordPanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setTitle("record_txt");
    }

    public refreshXList(): void {
        this.isXiang = true;

        this.group.scrollV = 0;

        this.group.removeChildren();

        for (var i = 0; i < this.xobj.length; i++) {
            var some: Array<any> = this.xobj[i];

            some.push(i + 1);

            var list: RecordXItem;
            if (this.XitemList[i]) {
                list = this.XitemList[i];
                list.obj = some;
            }
            else {
                list = new RecordXItem(some);
            }

            this.group.addChild(list);

            list.onUpdate();
        }
    }

    public refreshList(): void {
        this.isXiang = false;

        this.group.scrollV = 0;

        this.group.removeChildren();

        for (var i = 0; i < this.obj.length; i++) {
            var some: any = this.obj[i];

            some["rank"] = i;

            var list: RecordItem;
            if (this.itemList[i]) {
                list = this.itemList[i];
                list.obj = some;
            }
            else {
                list = new RecordItem(some);
            }

            this.group.addChild(list);

            list.onUpdate();
        }
    }

    public show(): void {
        super.show();

        SocketManager.getInstance().getGameConn().send(19, {});
    }


    public hide(): void {
        if (this.isXiang) {
            this.refreshList();
            return;
        }

        super.hide();
    }
}