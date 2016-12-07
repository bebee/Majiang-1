class SettingUI extends eui.Component
{
    public constructor()
    {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "SettingSkin";

        this.touchChildren = true;
    }

    public _btn_sound:mui.EButton;  //音效按钮
    public _btn_music:mui.EButton;  //音乐按钮
    public _btn_pai:eui.Image;   //手牌按钮
    public _btn_color:eui.Image; //手牌颜色

    public _ver:eui.Label;


    onComplete()
    {
        this._btn_sound = new mui.EButton("sound_open_btn");
        this._btn_sound.x = 355;
        this._btn_sound.y = 180;
        this.addChild(this._btn_sound);

        this._btn_music = new mui.EButton("sound_open_btn");
        this._btn_music.x = 355;
        this._btn_music.y = 100;
        this.addChild(this._btn_music);


        this._btn_pai = new eui.Image();
        this._btn_pai.source = "sound_open_btn";
        this._btn_pai.x = 530;
        this._btn_pai.y = 100;
        this.addChild(this._btn_pai);

        this._btn_color = new eui.Image();
        this._btn_color.source = "card_style_green";
        this._btn_color.x = 530;
        this._btn_color.y = 170;
        this.addChild(this._btn_color);
    }

    createChildren()
    {
        super.createChildren();
    }
}
