/**
 * 局结算
 */
class S16 {
    public parseData(obj: any) {
        if (!obj) return;

        console.log("牌局结算:", obj);

        var data = obj.data;

        game.manager.dispatchEvent(EffectEvent.CardThrow);
        game.manager.dispatchEvent(EffectEvent.CardThrowTips);

        GSDataProxy.i.S2C_FinalResult(data);
    }
}