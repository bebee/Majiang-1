/**
 * 创建房间返回
 */
class S2 {
    public parseData(obj: any) {
        if (!obj || !obj.hasOwnProperty("data")) return;

        console.log("创建成功,房间ID为：" + obj.data.roomid, obj);

        game.player.cur = obj.data.cur;

        game.roomid = obj.data.roomid;

        StackManager.closeDialog("CreatePanel");
    }
}