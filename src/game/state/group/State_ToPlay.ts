/**
 * Created by Administrator on 2016/11/1.
 *
 * 出牌状态
 */


class State_ToPlay extends BaseState{

    play(){

        super.play();



    }



    update(advanceTime:number, timeStamp?:number):void {

        if(this.completed) return;

    }

    reset(){

        super.reset();

    }

}