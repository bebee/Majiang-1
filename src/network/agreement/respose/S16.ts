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

        gameCore.gameManager.dispatchEvent(EffectEvent.Chupai);
        gameCore.gameManager.dispatchEvent(EffectEvent.ChupaiTips);
    }
}