/**
 * 版本号广播
 */
class S26 {
    public parseData(obj: any) {
        if (game.user) return;

        var data = obj.data;

        var type = data.type;

        if (+type == 1) {
            game.player.version = data.data;

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
                }, "当前游戏版本过低，请刷新游戏！");
            }
        }
    }
}