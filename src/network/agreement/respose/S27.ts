/**
 * 版本号广播
 */
class S27
{
    public parseData(obj:any)
    {
        if(+obj.code != 0) return;

        EffectUtils.showTips("身份信息认证成功!");
        StackManager.closeDialog("IDCardDialog");
        var gm:GameMainScene = SceneManager.find("GameMainScene");
        if(gm) gm.btn_shiming.visible = false;
        GlobalData.getInstance().player.update(obj.data);
    }
}