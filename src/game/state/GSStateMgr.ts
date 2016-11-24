
/**
 * Created by Administrator on 2016/10/30.
 */
class GSStateMgr{

    completed:boolean;
    autoRemove:boolean;
    stop:boolean;

    static i : GSStateMgr = new GSStateMgr;

    states : IState[] = [];

    init(){

        this.put(GSState.State_HeadToTarget,new State_HeadToTarget);

        this.put(GSState.State_CardPutline,new State_CardPutline);

        //this.put(GSState.State_ToPlay,new State_ToPlay);

        /*this.put(GSState.State_TurnCatch,new State_TurnCatch);

        this.put(GSState.State_ReadyPlay,new State_ReadyPlay);

        this.put(GSState.State_FuncSelect,new State_FuncSelect);*/


    }

    put(id:number,state:IState){

        this.states[id] = state;

        GSUpdate.i.addUpdate(state);

    }

    getStateIns (id:number){

        return this.states[id];
    }

    setState(stateID:number){

        console.log("游戏进入状态",stateID);

        var state:IState = this.getStateIns(stateID);

        state.play();

    }

}