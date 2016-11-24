/**
 * Created by Administrator on 2016/10/29.
 */
class BaseUpdate implements IUpdate{

    //----------------实现接口---------------
    autoRemove :boolean = false;
    //停止刷新
    stop :boolean = false;

    completed:boolean = false;

    update(advanceTime:number, timeStamp?:number):void {


    }

}