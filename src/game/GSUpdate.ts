/**
 * Created by Administrator on 2016/10/28.
 */

//刷新器
class GSUpdate{

    static i : GSUpdate = new GSUpdate;

    lastTime:number;

    updates : IUpdate[];

    //启动
    start(){

        this.updates = [];

        egret.sys['$ticker'].$startTick(this.callBack,this);

        this.lastTime = egret.getTimer();

    }
    callBack(timeStamp: number){

        var advanceTime : number = timeStamp - this.lastTime;

        for(var i:number = 0; i < this.updates.length ; i ++){

            var update : IUpdate = this.updates[i];

            if(update.stop) continue;

            update.update(advanceTime,timeStamp);

            if(update.autoRemove && update.completed){

                this.updates.splice(i--,1);

            }

        }

        this.lastTime = timeStamp;

        return false;

    }

    addUpdate(update:IUpdate){

        if(this.updates.indexOf(update) == -1)

        this.updates.push(update);

    }

    removeUpdate(update:IUpdate){

        this.updates.splice(this.updates.indexOf(update),1);
    }

}