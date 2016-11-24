class SettingUI extends eui.Component
{
    public constructor()
    {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "SettingSkin";

        this.touchChildren = true;
    }

    //public _btn_music:mui.EButton;  //音乐按钮

    public _btn_sound:eui.Image;  //音效按钮


    onComplete()
    {
        // this._btn_music = new mui.EButton("sound_open_btn", "", 20);
        // this._btn_music.x = 470;
        // this._btn_music.y = 69;
        // this.addChild(this._btn_music);

        this._btn_sound = new eui.Image();
        this._btn_sound.source = "sound_open_btn";
        this._btn_sound.x = 500;
        this._btn_sound.y = 136;//139;
        this.addChild(this._btn_sound);
    }

    createChildren()
    {
        super.createChildren();
    }
}
