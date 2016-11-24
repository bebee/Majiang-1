/**
 * 心跳
 */
class S18
{
    public parseData(obj:any)
    {
        Heart.getInstance().nettime = 0;


        SocketManager.getInstance().getGameConn().send(18,{});

        console.log("砰！");
    }
}