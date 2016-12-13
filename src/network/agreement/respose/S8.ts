/**
 * 房间消息同步
 */
class S8 {
    public parseData(obj: any) {
        if (!obj) return;

        console.log("同步房间人员信息", obj);

        GSDataProxy.i.S2C_RoomPlayers(obj.data.rules, obj.data.infos);

        var info: any = obj.data.infos;

        for (var i = 0; i < info.length; i++) {
            GlobalData.getInstance().player.playerInfo.push(info[i]);
        }
    }
}