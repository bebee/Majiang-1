/**
 * 局结算
 */
class S16
{
    public parseData(obj:any)
    {
        if(!obj) return;

        console.log("牌局结算:",obj);

        var data = obj.data;

        GSDataProxy.i.S2C_FinalResult(data);

        GameDispatcher.ins.dispatchEvent(GameEvent.ChupaiEvent);
        GameDispatcher.ins.dispatchEvent(GameEvent.ChupaiTipsEvent);
    }
}