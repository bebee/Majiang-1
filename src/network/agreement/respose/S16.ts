/**
 * 局结算
 */
class S16 {
    public parseData(obj: any) {
        if (!obj) return;

        console.log("牌局结算:", obj);

        var data = obj.data;

        game.manager.dispatchEvent(EffectEventType.CardThrow);
        game.manager.dispatchEvent(EffectEventType.CardThrowTips);

        GSDataProxy.i.S2C_FinalResult(data);
    }
}