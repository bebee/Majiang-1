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

        Acekit.i.dispatchEvent(EffectEvent.Chupai);
        Acekit.i.dispatchEvent(EffectEvent.ChupaiTips);
    }
}