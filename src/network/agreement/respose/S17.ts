/**
 * 再来一局
 */
class S17
{
    public parseData(obj:any)
    {
        if(!obj) return;

        //console.log("17", obj);

        //点击继续游戏 触发的  重新开始牌局

        /*for(var k in obj.data)
        {
            console.log(obj.data[k]);
        }*/
        GSDataProxy.i.S2C_ContinueGame(obj.data);
    }
}