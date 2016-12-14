/**
 * 绑定
 */
class S7
{
    public parseData(obj:any)
    {
        if(!obj) return;

        if(obj["data"] && obj["data"]["agent"])
        {
            game.player.agent = +obj["data"]["agent"];

            EffectUtils.showTips("恭喜！绑定成功！", 5);

            StackManager.open(ActivityPanel, "ActivityPanel");

            StackManager.closeDialog("BindDialog");
        }
    }
}