/**
 * 解散房间返回
 */
class S6 {
    public parseData(obj: any) {
        if (!obj || !obj.hasOwnProperty("data")) return;

        console.log("解散房间！");

        game.roomClean();

        GSController.i.exit();

        game.askPanel.showMsg(function (r) {
        }, "房间解散了，请进入其他房间！", null, null, true);
    }
}