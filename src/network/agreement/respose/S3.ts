/**
 * 加入房间返回
 */
class S3
{
    public parseData(obj:any)
    {
        if(!obj) return;

        if(+obj.code == 0) StackManager.closeDialog("JoinDialog");

        console.log("加入房子返回", obj);
    }
}