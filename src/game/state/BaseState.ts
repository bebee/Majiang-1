/**
 * Created by Administrator on 2016/10/30.
 */
class BaseState implements IState{
    completed:boolean;
    autoRemove:boolean;
    stop:boolean;

    constructor(){

        this.stop = true;
    }

    play() {

        this.reset();
    }

    exit(){

        this.stop = true;
    }

    reset() {

        this.completed = false;
        this.stop = false;
    }

    update(advanceTime:number, timeStamp?:number):void {
    }

}