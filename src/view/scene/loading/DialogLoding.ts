/**
 * 界面加载
 */
class DialogLoding extends egret.Sprite {
    private label: eui.Label;

    public constructor() {
        super();

        this.graphics.clear();
        this.graphics.beginFill(0x0, 0.5);
        this.graphics.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight());
        this.graphics.endFill();

        this.label = new eui.Label();
        this.label.width = 100;
        this.label.height = 30;
        this.label.textAlign = "center";
        this.label.textColor = 0xffffff;
        this.label.size = 26;
        this.label.fontFamily = "Microsoft YaHei";
        this.label.bold = true;
        this.label.x = this.width / 2 - this.label.width / 2;
        this.label.y = this.height / 2 - this.label.height / 2 + 100;
    }

    public show(): void {
        if (!LayerManager.gameLayer().loadLayer.contains(this)) {
            LayerManager.gameLayer().loadLayer.addChild(this);
        }

        this.addChild(this.label);
        this.label.text = "0%";
    }

    public setTitle(w: number, t: number): void {
        this.label.text = Math.floor(w / t * 100) + "%";
    }

    public clearLoad(): void {
        if (LayerManager.gameLayer().loadLayer.contains(this)) {
            LayerManager.gameLayer().loadLayer.removeChild(this);
        }

        this.removeChildren();
    }
}