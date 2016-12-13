/**
 * 登陆返回
 */
class S1 {
    public parseData(obj: any) {
        if (!obj) return;

        if (obj["data"]) {
            gameData.sendLogin = false;
            gameData.connCount = 0;

            gameData.player.update(obj["data"]);

            if (SceneManager.find("LoadingScene")) {
                SceneManager.find("LoadingScene").onIn();
            }

            gameLocal.setData(gameLocal.loginAccessCode, 0);

            if (!gameConfig.users) {
                var ver: string = gameData.player.version;

                if (!ver) return;

                var arr: Array<any> = ver.split('.');

                var cver: string = gameData.version;

                var carr: Array<any> = cver.split('.');

                if (arr[0] != carr[0] || arr[1] != carr[1]) {
                    if (!LayerManager.gameLayer().messagBox) LayerManager.gameLayer().messagBox = new TipsAskPanel();
                    LayerManager.gameLayer().messagBox.showMsg(function (r) {
                        if (r) {
                            var h: string = gameConfig.GameUrl;
                            if (gameConfig.roomid) h += "?roomid=" + gameConfig.roomid;
                            location.href = h;
                        }

                    }, "当前游戏版本过低，请点击确定刷新游戏！");
                }
            }
        }
    }
}