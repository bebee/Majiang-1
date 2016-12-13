/**
 * Created by Administrator on 2016/10/30.
 */
class State_HeadToTarget extends BaseState{

    count:number;

    play(){

        super.play();

        var gameView:GSView = GSController.i.gsView;

        for(var i:number = 1; i <= GSConfig.playerCount;i++){

            var headView:HeadIconRich = gameView.headViews[i];

            var pos = GSConfig.headTargetPos[i];

            egret.Tween.get(headView).to({x:pos.x,y:pos.y},100).call(this.moveComplete,this);

        }


    }

    moveComplete(){

        this.count ++ ;

        if(this.count >= GSConfig.playerCount){

            this.exit();

            GSStateMgr.i.setState(GSState.State_CardPutline);
        }

    }

    update(advanceTime:number, timeStamp?:number):void {

        if(this.completed) return;

    }

    reset(){

        super.reset();

        this.count = 0;
    }

}