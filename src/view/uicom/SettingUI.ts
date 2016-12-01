class SettingUI extends eui.Component
{
    public constructor()
    {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "SettingSkin";

        this.touchChildren = true;
    }

    public _btn_sound:eui.Image;  //音效按钮
    public _btn_pai:eui.Image;   //手牌按钮

    public _ver:eui.Label;


    onComplete()
    {
        this._btn_sound = new eui.Image();
        this._btn_sound.source = "sound_open_btn";
        this._btn_sound.x = 500;
        this._btn_sound.y = 100;
        this.addChild(this._btn_sound);


        this._btn_pai = new eui.Image();
        this._btn_pai.source = "sound_open_btn";
        this._btn_pai.x = 500;
        this._btn_pai.y = 170;
        this.addChild(this._btn_pai);
    }

    createChildren()
    {
        super.createChildren();
    }
}
