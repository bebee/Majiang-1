/**
 * Created by Administrator on 2016/11/2.
 *
 * 吃碰杠 功能选择
 */


class State_FuncSelect extends BaseState{

    play(){

        super.play();

        GSController.i.showFuncSelectMenu();

    }


    update(advanceTime:number, timeStamp?:number):void {

        if(this.completed) return;



    }

    reset(){

        super.reset();

    }

}