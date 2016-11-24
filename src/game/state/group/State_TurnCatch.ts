/**
 * Created by Administrator on 2016/10/30.
 * 抓牌状态
 */
class State_TurnCatch extends BaseState{

    play(){

        super.play();

        //GSController.i.catchCard();

        //GSController.i.catchCard(2,GSData.i.ownCatchPai);
        //GSController.i.catchCard(3,GSData.i.ownCatchPai);
        //GSController.i.catchCard(4,GSData.i.ownCatchPai);

        //GSController.i.triggerReadyPlay = true;

    }


    update(advanceTime:number, timeStamp?:number):void {

        if(this.completed) return;

        /*if(GSController.i.triggerReadyPlay){

            GSController.i.triggerReadyPlay = false;

            this.exit();

            GSStateMgr.i.setState(GSState.State_ReadyPlay);
        }*/

    }

    reset(){

        super.reset();

    }

}