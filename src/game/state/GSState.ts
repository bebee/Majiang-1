/**
 * Created by Administrator on 2016/10/30.
 */
class GSState{

    //头像运动
    static State_HeadToTarget:number = 1;
    //排列全部牌
    static State_CardPutline:number = 2;
    //轮到抓牌
    static State_TurnCatch:number = 3;
    //准备出牌状态
    static State_ReadyPlay:number = 4;
    //出牌状态
    static State_ToPlay:number = 5;
    //进入吃碰杠功能选择状态
    static State_FuncSelect:number = 6;

}