/**
 * TimerManager
 * @Author Ace.c
 * @Create 2016-11-08 16:52
 */
class TimerManager extends GameDispatcher {

    static Second: string = "Second";

    static _instance: TimerManager;

    static getInstance(): TimerManager {
        if (!this._instance) {
            this._instance = new TimerManager();
        }
        return this._instance;
    }

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