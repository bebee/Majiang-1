/**
 * Created by Administrator on 2016/11/24.
 */
class TimeEffectView implements IUpdate{

    static startCount:number = 16;

    view:egret.Bitmap;

    currCount:number;

    passTime:number;

    callback:Function;

    shake:boolean;

    constructor(callback:Function){

        this.callback = callback;

        this.view = new egret.Bitmap;
        this.view.anchorOffsetX = 29 >> 1;
        this.view.anchorOffsetY = 32 >> 1;

        this.stop = true;

    }

    play(shake:boolean){

        this.shake = shake;

        this.view.visible = true;

        this.stop = false;

        this.currCount = TimeEffectView.startCount;

        this.updateTime();

        this.passTime = 0;

    }

    over(){

        this.stop = true;

    }

    reset(){

        this.stop = true;
        this.view.visible = false;
    }

    update(advanceTime:number,timeStamp ?:number):void{

        this.passTime+= advanceTime;

        if(this.passTime >= 1000){

            this.passTime = 0;

            this.currCount --;

            if(this.currCount < 0){

                this.over();

                (this.callback!= null && this.shake) && this.callback();

                return;
            }

            this.updateTime();
        }

    }

    updateTime(){

        this.view.texture = GameRes.getUI("time_"+this.currCount);

    }

    completed:boolean;
    //自动移除
    autoRemove :boolean;
    //停止刷新
    stop :boolean;

}