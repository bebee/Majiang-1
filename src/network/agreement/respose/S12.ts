/**
 * 离开房间
 */
class S12 {
    public parseData(obj: any) {
        if (!obj || !obj.hasOwnProperty("data")) return;

        console.log("离开房间！");

        game.roomClean();

        GSController.i.exit();
    }
}