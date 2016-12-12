class SettingDialog extends BasePanel
{

    public constructor()
    {
        super("setting_txt", 700, 400);
        super();

        this.skinName = "RulePanelSkin";
    }

    childrenCreated()
    {
        super.childrenCreated();

        this.setTitle("setting_txt");

        this.horizontalCenter = 0;
        this.verticalCenter = 0;


        this.slider_sound.addEventListener(egret.Event.CHANGE, this.setSound, this);

        this.m_UI._btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOff, this);

        this.m_UI._btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpen, this);

        this.m_UI._btn_pai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPai, this);

        this.m_UI._btn_color.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);

        
    }

    private onChange( ):void
    {
        var style:number = +NativeApi.getLocalData("style");

        if(style == 0)
        {
            NativeApi.setLocalData("style", 1);

            GlobalData.getInstance().cardStyle = 1;

            FashionTools.setGameStyle(1);

            this.m_UI._btn_color.source = "card_style_green";
        }
        else
        {
            NativeApi.setLocalData("style", 0);

            GlobalData.getInstance().cardStyle = 0;

            FashionTools.setGameStyle(0);

            this.m_UI._btn_color.source = "card_style_blue";
        }
    }

    private onPai():void
    {
        var _pai:number = +NativeApi.getLocalData("pai");

        if(_pai == 1)
        {
            NativeApi.setLocalData("pai", 0);

            GlobalData.getInstance().cardType = 0;

            FashionTools.setViewType(0);
        }
        else
        {
            NativeApi.setLocalData("pai", 1);

            GlobalData.getInstance().cardType = 1;

            FashionTools.setViewType(1);
        }

        this.m_UI._btn_pai.source = "card_"+GlobalData.getInstance().cardType+"_btn";
    }

    private onOpen():void
    {
        var _switch:number = +NativeApi.getLocalData("music");

        if(_switch == 1)
        {
            NativeApi.setLocalData("music", 0);

            this.m_UI._btn_music.textImg.source = "sound_close_btn";

            GameMusic.CloseAllSound();

            this.slider_music.touchEnabled = false;
            this.slider_music.touchChildren = false;
            this.slider_music.filters = Global.getColorFlilter();
        }
        else
        {
            NativeApi.setLocalData("music", 1);
            this.m_UI._btn_music.textImg.source = "sound_open_btn";
            GameMusic.PlaySound("music_scene");
            this.slider_music.touchEnabled = true;
            this.slider_music.touchChildren = true;
            this.slider_music.filters = [];
        }
    }

    private onOff():void
    {
        var _switch:number = +NativeApi.getLocalData("switch");

        if(_switch == 1)
        {
            NativeApi.setLocalData("switch", 0);

            this.m_UI._btn_sound.textImg.source = "sound_close_btn";

            GameSound.CloseAllSound();

            this.slider_sound.touchEnabled = false;
            this.slider_sound.touchChildren = false;
            this.slider_sound.filters = Global.getColorFlilter();
        }
        else
        {
            NativeApi.setLocalData("switch", 1);

            this.m_UI._btn_sound.textImg.source = "sound_open_btn";

            this.slider_sound.touchEnabled = true;
            this.slider_sound.touchChildren = true;
            this.slider_sound.filters = [];
        }

    }

    private setMusic():void
    {
        this.slider_music.changeShap();

        var v:number = this.slider_music.value;

        var max:number = this.slider_music.maximum;

        var num:number = Math.floor(v / max * 10);

        var vo:number = num / 10;

        GameMusic.setSoundVolume(vo);

        NativeApi.setLocalData("music_volume", vo);
    }

    private setSound():void
    {
        this.slider_sound.changeShap();

        var v:number = this.slider_sound.value;

        var max:number = this.slider_sound.maximum;

        var num:number = Math.floor(v / max * 10);

        var vo:number = num / 10;

        GameSound.setSoundVolume(vo);

        NativeApi.setLocalData("sound_volume", vo);
    }

    /**
     * 添加面板方法
     * dark        		背景是否变黑
     * popUpWidth      	指定弹窗宽度，定位使用
     * popUpHeight      指定弹窗高度，定位使用
     * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public show(): void
    {
        super.show(true, this.width, this.height, 1, false);

        var _music:number = +NativeApi.getLocalData("music");

        if(_music == 0)
        {
            this.m_UI._btn_music.textImg.source = "sound_close_btn";

            this.slider_music.touchEnabled = false;
            this.slider_music.touchChildren = false;
            this.slider_music.filters = Global.getColorFlilter();
        }
        else
        {
            this.m_UI._btn_music.textImg.source = "sound_open_btn";

            this.slider_music.touchEnabled = true;
            this.slider_music.touchChildren = true;
            this.slider_music.filters = [];
        }

        var _switch:number = +NativeApi.getLocalData("switch");

        if(_switch == 0)
        {
            this.m_UI._btn_sound.textImg.source = "sound_close_btn";

            this.slider_sound.touchEnabled = false;
            this.slider_sound.touchChildren = false;
            this.slider_sound.filters = Global.getColorFlilter();
        }
        else
        {
            this.m_UI._btn_sound.textImg.source = "sound_open_btn";

            this.slider_sound.touchEnabled = true;
            this.slider_sound.touchChildren = true;
            this.slider_sound.filters = [];
        }

        var _music_volume:number = +NativeApi.getLocalData("music_volume");
        this.slider_music.value = (_music_volume * 100);
        this.slider_music.validateNow();
        this.slider_music.changeShap();

        var _sound_volume:number = +NativeApi.getLocalData("sound_volume");
        this.slider_sound.value = (_sound_volume * 100);
        this.slider_sound.validateNow();
        this.slider_sound.changeShap();

        this.m_UI._ver.text = "当前版本号：" + GlobalData.getInstance().resourceCode + "    最新版本号：" + GlobalData.getInstance().player.version;

        this.m_UI._btn_pai.source = "card_"+GlobalData.getInstance().cardType+"_btn";


        if(NativeApi.getLocalData("style"))
        {
            var style:number = +NativeApi.getLocalData("style");

            if(style == 1)
            {
                this.m_UI._btn_color.source = "card_style_green";
            }
            else
            {
                this.m_UI._btn_color.source = "card_style_blue";
            }
        }
    }
}