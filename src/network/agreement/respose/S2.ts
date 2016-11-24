/**
 * 创建房间返回
 */
class S2
{
    public parseData(obj:any)
    {
        if(!obj) return;

        if(obj["data"])
        {
            GlobalData.getInstance().player.cur = +obj["data"]["cur"];

            console.log("创建成功,房间ID为：" + obj["data"]["roomid"], obj);

            GSData.i.roomID = obj["data"]["roomid"];

            StackManager.closeDialog("CreateDialog");
        }
    }
}