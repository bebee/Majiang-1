/**
 * 版本号广播
 */
class S26
{
    public parseData(obj:any)
    {
        if(GameConfig.users) return;

        var data = obj.data;

        var type = data.type;

        if(+type == 1)
        {
            GlobalData.getInstance().player.version = data.data;

            var ver:string = GlobalData.getInstance().player.version;

            if(!ver) return;

            var arr:Array<any> = ver.split('.');

            var cver:string = GlobalData.getInstance().resourceCode;

            var carr:Array<any> = cver.split('.');

            if(arr[0] != carr[0] || arr[1] != carr[1])
            {
                if(!GameLayerManager.gameLayer().messagBox) GameLayerManager.gameLayer().messagBox = new MessageDialog();
                GameLayerManager.gameLayer().messagBox.showMsg(function (r)
                {
                    var h:string = GameConfig.wei_href_address;
                    if(GameConfig.roomid) h += "?roomid=" + GameConfig.roomid;
                    location.href = h;
                },"当前游戏版本过低，请刷新游戏！");
            }
        }
    }
}