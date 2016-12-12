/**
 * 解散房间返回
 */
class S6 {
    public parseData(obj: any) {
        if (!obj) return;

        if (obj && obj["sequence"]) {
            console.log("解散房间！");
        }

        // EffectUtils.showTips("房间已经解散！", 5, false);
        // GSController.i.exit();

        LayerManager.gameLayer().messagBox.showMsg(function (r) {
            GSController.i.exit();
        }, "房间解散了，请进入其他房间！", null, null, true);
    }
}