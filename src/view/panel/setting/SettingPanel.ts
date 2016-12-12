class SettingPanel extends BasePanel {

    private slider_music: eui.HSlider;
    private btn_music: eui.CheckBox;
    private slider_sound: eui.HSlider;
    private btn_sound: eui.CheckBox;
    private btn_style: eui.CheckBox;
    private btn_color: eui.CheckBox;
    private lab_version: eui.Label;

    public constructor() {
        super();

        this.skinName = "SettingPanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setTitle("setting_txt");

        this.slider_music.addEventListener(egret.Event.CHANGE, this.setMusic, this);
        this.slider_sound.addEventListener(egret.Event.CHANGE, this.setSound, this);

        this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_style.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_color.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_music:
                this.changeMusic();
                break;
            case this.btn_sound:
                this.changeSound();
                break;
            case this.btn_style:
                this.changeStyle();
                break;
            case this.btn_color:
                this.changeColor();
                break;
        }
    }

    private changeColor(): void {
        GameLocal.setData(GameLocal.color, this.btn_color.selected ? 0 : 1);

        GlobalData.getInstance().cardColor = +GameLocal.getData(GameLocal.color);

        FashionTools.setGameStyle(GlobalData.getInstance().cardColor);
    }

    private changeStyle(): void {
        GameLocal.setData(GameLocal.style, this.btn_style.selected ? 0 : 1);

        GlobalData.getInstance().cardStyle = +GameLocal.getData(GameLocal.style);

        FashionTools.setViewType(GlobalData.getInstance().cardStyle);
    }

    private changeMusic(): void {
        GameLocal.setData(GameLocal.music, this.btn_music.selected ? 0 : 1);
        this.btn_music.selected ? GameMusic.CloseAllSound() : GameMusic.PlaySound("music_scene");
    }

    private changeSound(): void {
        GameLocal.setData(GameLocal.sound, this.btn_sound.selected ? 0 : 1);
        this.btn_music.selected && GameSound.CloseAllSound();
    }

    private setMusic(): void {
        GameMusic.setSoundVolume(this.slider_music.value);
        GameLocal.setData(GameLocal.musicVolume, this.slider_music.value);
    }

    private setSound(): void {
        GameSound.setSoundVolume(this.slider_sound.value);
        GameLocal.setData(GameLocal.soundVolume, this.slider_sound.value);
    }

    public show(): void {
        super.show();

        this.btn_music.selected = +GameLocal.getData(GameLocal.music) == 1 ? false : true;
        this.btn_sound.selected = +GameLocal.getData(GameLocal.sound) == 1 ? false : true;

        this.btn_style.selected = +GameLocal.getData(GameLocal.style) == 1 ? false : true;
        this.btn_color.selected = +GameLocal.getData(GameLocal.color) == 1 ? false : true;

        this.slider_music.value = +GameLocal.getData(GameLocal.musicVolume);
        this.slider_sound.value = +GameLocal.getData(GameLocal.soundVolume);

        this.lab_version.text = "当前版本号：" + GlobalData.getInstance().resourceCode + "    最新版本号：" + GlobalData.getInstance().player.version;
    }
}