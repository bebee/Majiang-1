class SettingDialog extends BaseDialog
{

    private m_UI:SettingUI;

    public constructor()
    {
        super("setting_txt", 670, 380);
    }

    public slider_music:mui.EHSlider;

    public slider_sound:mui.EHSlider;

    createChildren()
    {
        super.createChildren();

        this.m_UI = new SettingUI();

        this.addChild(this.m_UI);

        this.m_UI.horizontalCenter = 0;

        this.m_UI.verticalCenter = 10;

        this.slider_music = new mui.EHSlider(100, 0, "setting_progressbar_bg", "radio_btn", "setting_progressbar1");

        this.slider_music.x = 95;

        this.slider_music.y = 100;

        this.slider_music.width = 320;

        this.m_dialog._title_img.visible = false;

        this.m_UI.addChild(this.slider_music);

        this.slider_music.addEventListener(egret.Event.CHANGE, this.setMusic, this);

        this.slider_sound = new mui.EHSlider(100, 0, "setting_progressbar_bg", "radio_btn", "setting_progressbar1");

        this.slider_sound.x = 95;

        this.slider_sound.y = 170;

        this.slider_sound.width = 320;

        this.m_UI.addChild(this.slider_sound);

        this.slider_sound.addEventListener(egret.Event.CHANGE, this.setSound, this);

        this.m_UI._btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOff, this);

        this.m_UI._btn_pai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPai, this);
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

    private onOff():void
    {
        var _switch:number = +NativeApi.getLocalData("switch");

        if(_switch == 1)
        {
            NativeApi.setLocalData("switch", 0);

            this.m_UI._btn_sound.source = "sound_close_btn";

            GameMusic.CloseAllSound();
            GameSound.CloseAllSound();

            this.slider_music.touchEnabled = false;
            this.slider_music.touchChildren = false;
            this.slider_music.filters = Global.getColorFlilter();

            this.slider_sound.touchEnabled = false;
            this.slider_sound.touchChildren = false;
            this.slider_sound.filters = Global.getColorFlilter();
        }
        else
        {
            NativeApi.setLocalData("switch", 1);

            this.m_UI._btn_sound.source = "sound_open_btn";

            if(!GameLayerManager.gameLayer().sceneLayer.visible)
            {
                GameMusic.PlaySound("music_game");
            }
            else
            {
                GameMusic.PlaySound("music_scene");
            }


            this.slider_music.touchEnabled = true;
            this.slider_music.touchChildren = true;
            this.slider_music.filters = [];

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

        var _switch:number = +NativeApi.getLocalData("switch");

        if(_switch == 0)
        {
            this.m_UI._btn_sound.source = "sound_close_btn";

            this.slider_music.touchEnabled = false;
            this.slider_music.touchChildren = false;
            this.slider_music.filters = Global.getColorFlilter();

            this.slider_sound.touchEnabled = false;
            this.slider_sound.touchChildren = false;
            this.slider_sound.filters = Global.getColorFlilter();
        }
        else
        {
            this.m_UI._btn_sound.source = "sound_open_btn";

            this.slider_music.touchEnabled = true;
            this.slider_music.touchChildren = true;
            this.slider_music.filters = [];

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

        this.m_UI._ver.text = "当前版本号：" + GlobalData.getInstance().resourceCode + "\n最新版本号：" + GlobalData.getInstance().player.version;

        this.m_UI._btn_pai.source = "card_"+GlobalData.getInstance().cardType+"_btn";
    }

    /**
     * 面板弹出之前处理
     */
    public beforShow(): void {
        super.beforShow();
    }

    /**
     * 初始化面板ui
     */
    public initUI(): void {
        super.initUI();
    }


    /**
     * 初始化面板数据
     */
    public initData(): void {
        super.initData();
    }


    /**
     * 移除面板方法
     * panel       		面板
     * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public hide(): void
    {
        super.hide(1);
    }


    /**
     * 面板关闭后需要销毁的对象
     */
    public destroy(): void
    {
        super.destroy();
    }
}