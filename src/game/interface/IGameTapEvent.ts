/**
 * Created by Administrator on 2016/11/10.
 */
interface IGameTapEvent{


    onShareGame():void;
    onContinue():void;

    onBGTap();
    onSettingTap();
    onQuitTap();
    onTalkTap();

    onFuncSelect(funcIndex:number):void;
    onGroupSelect(index:number):void;

    onSiriBegin():void;
    onSiriEnd():void;

    onRebackContinue(e:egret.TouchEvent):void;

    onKillTouch(pos: number): void;

    onJiesanTap(): void;
    onWeixinTap(): void;
    onStartGame():void;
    onInvite():void;
    onHeadTouch(dir: number): void;


    onReplayPlayTap():void;
    onReplayPauseTap():void;
    onReplayFFTap():void;
    onReplayFBTap():void;

}