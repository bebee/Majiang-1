/**
 * 打牌
 */
class S4 {
    public parseData(obj: any) {
        if (!obj || !obj.hasOwnProperty("data")) return;

        console.log("收到池中打出的牌", obj);

        GSDataProxy.i.S2C_PoolPai(obj);
    }
}