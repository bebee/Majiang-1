/**
 * Created by Administrator on 2016/12/5.
 */
/*
    回放控制条
 */
class ReplayControllView extends egret.DisplayObjectContainer{

    bg:egret.Bitmap;
    PlayButton:egret.DisplayObjectContainer;
    PauseButton:egret.DisplayObjectContainer;
    FBButton:egret.DisplayObjectContainer;
    FFButton:egret.DisplayObjectContainer;
    face:IGameTapEvent;

    constructor(){

        super();

        this.initView();
    }

    bindInterface(face:IGameTapEvent){

        this.face = face;

        this.addChild(this.PlayButton);
        this.addChild(this.PauseButton);
        this.addChild(this.FBButton);
        this.addChild(this.FFButton);




        this.PlayButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.face.onReplayPlayTap,this.face);
        this.PauseButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.face.onReplayPauseTap,this.face);
        this.FBButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.face.onReplayFBTap,this.face);
        this.FFButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.face.onReplayFFTap,this.face);

    }

    initView(){

        this.bg = new egret.Bitmap(GameRes.getUI("RP_xin1"));

        var ax:number = 76 /2 ;
        var ay:number = 58 /2 ;
        this.PlayButton = GameRes.createCenterButton(ax,ay,200,49,"RP_xin2");
        this.PauseButton = GameRes.createCenterButton(ax,ay,200,49,"RP_xin3");
        this.FBButton = GameRes.createCenterButton(ax,ay,70,49,"RP_xin5");
        this.FFButton = GameRes.createCenterButton(ax,ay,336,49,"RP_xin4");


        this.addChild(this.bg);
        this.addChild(this.PlayButton);
        this.addChild(this.PauseButton);
        this.addChild(this.FBButton);
        this.addChild(this.FFButton);



    }

    play(){

        this.PlayButton.visible = false;
        this.PauseButton.visible = true;
    }
    pause(){

        this.PlayButton.visible = true;
        this.PauseButton.visible = false;
    }

}