/**
 * 版本号广播
 */
class S26 {
    public parseData(obj: any) {
        if (game.user) return;

        var data = obj.data;

        var type = data.type;

        if (type == 1) {

            if (!game.player.version || game.player.version == "") {
                game.player.version = data.data;
            }
            else {
                var newVer: string = data.data;
                var newArr: Array<any> = newVer.split('.');
                var oldVer: string = game.player.version;
                var oldArr: Array<any> = oldVer.split('.');

                if (oldArr[0] != newArr[0] || oldArr[1] != newArr[1]) {
                    game.askPanel.showMsg(function (r) {
                        location.href = gameConfig.clientUrl += "?roomid=" + game.roomid;
                    }, "当前游戏版本过低，请刷新游戏！");

                    game.askPanel.hideClose();
                }
            }
        }
    }
}