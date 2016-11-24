/**
 * Created by Administrator on 2016/11/1.
 * 准备出牌状态
 */

class State_ReadyPlay extends BaseState{

    play(){

        super.play();

    }

    update(advanceTime:number, timeStamp?:number):void {

        if(this.completed) return;

        /*if(GSController.i.triggerPlay) {

            GSController.i.triggerPlay = false;

            this.exit();

            GSStateMgr.i.setState(GSState.State_ToPlay);

        }*/

    }

    reset(){

        super.reset();

    }

}