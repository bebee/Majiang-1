/**
 * 被踢
 */
class S23
{
    public parseData(obj:any)
    {
        EffectUtils.showTips("你被房主踢出了房间！");
        GSController.i.exit();
    }
}