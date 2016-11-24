/**
 * 打牌返回
 */
class S4
{
    public parseData(obj:any)
    {
        if(!obj) return;

        console.log("收到池中打出的牌",obj);

        GSDataProxy.i.S2C_PoolPai(obj);
    }
}