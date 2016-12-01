/**
 * 登陆返回
 */
class S1
{
    public parseData(obj:any)
    {
        if(!obj) return;

        if(obj["data"])
        {
            GlobalData.getInstance().sendLogin = false;

            GlobalData.getInstance().connCount = 0;
            
            GlobalData.getInstance().connCount = 0;
            
            GlobalData.getInstance().player.update(obj["data"]);

            SceneManager.find("LoadingScene").onIn();

            NativeApi.setLocalData("getAccessCode", 0);

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
                },"当前游戏版本过低，请点击确定刷新游戏！");
            }
        }
    }
}