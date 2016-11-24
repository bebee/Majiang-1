/**
 * Created by Administrator on 2016/10/26.
 */
interface IUpdate{

    update(advanceTime:number,timeStamp ?:number):void;

    completed:boolean;
    //自动移除
    autoRemove :boolean;
    //停止刷新
    stop :boolean;

}