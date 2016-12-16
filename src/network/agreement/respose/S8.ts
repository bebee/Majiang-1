/**
 * 房间消息同步
 */
class S8 {
    public parseData(obj: any) {
        if (!obj || !obj.hasOwnProperty("data")) return;

        console.log("同步房间人员信息", obj);

        var data: any = obj.data;

        if (data.hasOwnProperty("rules")) {
            game.roomRules = data.rules;
            PublicVal.i.rules = FashionTools.formatRules(game.roomRules);

            //听牌局
            if (game.roomRules.indexOf(GameRule.kouting) != -1) {
                GSData.i.hasTingRule = true;
            }
        }

        if (data.hasOwnProperty("rules")) {
            var infos: any[] = data.infos;
            var player: PlayerVo;

            for (var i = 0; i < infos.length; i++) {
                if (game.roomPlayers[infos[i].uid]) {
                    player = game.roomPlayers[infos[i].uid];
                }
                else {
                    player = new PlayerVo(infos[i]);
                }

                switch (player.status) {
                    case "leave":
                        GameSound.PlaySound("sound_other_player_leave");
                        EffectUtils.showTips(player.nick + " 离开了房间！", 4);
                        break;
                    case "offline":
                        GameSound.PlaySound("sound_other_player_leave");
                        EffectUtils.showTips(player.nick + " 离线了！", 4);
                        break;
                    case "online":
                        GameSound.PlaySound("sound_other_player_enter");
                        EffectUtils.showTips(player.nick + (game.roomPlayers[player.uid] ? " 回来了！" : " 加入了游戏！"), 4);
                        break;
                }

                if (player.status != "leave") {
                    game.roomPlayers[player.uid] = player;

                    GSDataProxy.i.gData.firstInRoom = player.uid == game.player.uid;
                }
            }
        }

        game.initGameDir();

        GSDataProxy.i.S2C_RoomPlayers();
    }
}