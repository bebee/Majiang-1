/**
 * 登陆返回
 */
class S1 {
    public parseData(obj: any) {
        if (!obj) return;

        if (obj["data"]) {
            game.loginWaiting = false;
            game.reconnectCount = 0;

            game.player.update(obj["data"]);

            if (SceneManager.find("LoadingScene")) {
                SceneManager.find("LoadingScene").onIn();
            }

            gameLocal.setData(gameLocal.loginAccessCode, 0);

            if (!game.user) {
                var ver: string = game.player.version;

                if (!ver) return;

                var arr: Array<any> = ver.split('.');

                var cver: string = game.version;

                var carr: Array<any> = cver.split('.');

                if (arr[0] != carr[0] || arr[1] != carr[1]) {
                    game.askPanel.showMsg(function (r) {
                        if (r) {
                            var h: string = gameConfig.GameUrl;
                            if (game.roomid) h += "?roomid=" + game.roomid;
                            location.href = h;
                        }

                    }, "当前游戏版本过低，请点击确定刷新游戏！");
                }
            }
        }
    }
}