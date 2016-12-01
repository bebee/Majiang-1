/**
 * ChangeThreeSelect
 * @Author Ace.c
 * @Create 2016-12-01 11:28
 */
class ChangeThreeSelect extends BaseSprite {

    private btn_confirm: eui.Button;
    private lab_time: eui.BitmapLabel;

    private time: number;

    public constructor() {
        super();
        this.skinName = "ChangeThreeSelectSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.horizontalCenter = 0;
        this.bottom = 280;

        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.show();
    }

    private timeHandler() {
        if (!this.initComplete)return;

        if (this.time > 0) {
            this.time--;
            this.lab_time.text = "" + this.time;
        }
        else {
            this.hide();
        }
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_confirm:
                break;
        }
    }

    public show() {
        super.show();

        Acekit.i.addChild(this);

        this.time = GameConst.ChangeThreeTime;
        this.lab_time.text = "" + this.time;
        TimerManager.i.addEventListener(TimerManager.Second, this.timeHandler, this);
    }

    private hide() {
        super.hide();

        Acekit.i.removeChild(this);

        TimerManager.i.delEventListener(TimerManager.Second, this.timeHandler, this);
    }
}