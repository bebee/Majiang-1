/**
 * 登陆返回
 */
class S1 {
    public parseData(obj: any) {
        if (!obj) return;

        if (obj["data"]) {
            game.loginWaiting = false;
            game.connectCount = 0;

            game.player.update(obj["data"]);

            gameLocal.setData(gameLocal.loginAccessCode, 0);

            // if (!game.user) {
            //     var serverVer: string = game.player.version;
            //     var clientVer: string = game.version;
            //
            //     if (!serverVer) {
            //         return;
            //     }
            //
            //     if (serverVer.split('.')[0] != clientVer.split('.')[0] || serverVer.split('.')[1] != clientVer.split('.')[1]) {
            //         game.askPanel.showMsg(function (r) {
            //             if (r) {
            //                 var gameurl: string = gameConfig.clientUrl;
            //                 if (game.roomid) {
            //                     gameurl += "?roomid=" + game.roomid;
            //                 }
            //                 location.href = gameurl;
            //             }
            //         }, "当前游戏版本过低，请点击确定刷新游戏！");
            //     }
            // }

            if (SceneManager.find("LoadingScene")) {
                SceneManager.find("LoadingScene").onIn();
            }
        }
    }
}