/**
 * TimerManager
 * @Author Ace.c
 * @Create 2016-11-08 16:52
 */
class TimerManager extends BaseDispatcher {

    private static _i: TimerManager;

    static get i(): TimerManager {
        return this._i || (this._i = new TimerManager());
    }

    static Second: string = "Second";

    private timer: egret.Timer;

    public constructor() {
        super();

        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.start();
    }

    private onTimerHandler() {
        this.dispatchEvent(TimerManager.Second);
    }
}