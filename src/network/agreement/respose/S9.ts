/**
 * 人满通知
 */
class S9 {
    public parseData(obj: any) {
        if (!obj) return;

        var type: number = +obj.data.type;

        switch (type) {
            case 1://通知房主开启游戏
                break;
            case 2://轮到谁
                console.log("轮到谁抓牌:", obj.data.data.pos);

                var pos: number = +obj.data.data.pos;
                var dui_num: number = obj.data.data.dui_num;
                var gang_end = obj.data.data.gang_end;

                game.status = GameStatus.gamestart;
                game.statusComplete = true;

                game.manager.dispatchEvent(EffectEvent.CardThrow);

                GSDataProxy.i.S2C_TurnDir(pos, dui_num, gang_end);
                break;
            case 3://触发中断
                console.log("显示功能菜单:", obj.data.data);

                var d = obj.data.data;

                GSDataProxy.i.S2C_Function(d);
                break;
            case 4://别人触发中断
                console.log("同步其他方功能牌", obj);

                game.manager.dispatchEvent(EffectEvent.CardThrow);
                game.manager.dispatchEvent(EffectEvent.CardThrowTips);
                GSDataProxy.i.S2C_FuncResult(obj.data.data);
                break;
            case 5: //补杠被劫
                console.log("删除手牌", obj);

                GSDataProxy.i.S2C_DeletePai(obj.data.data.pos, obj.data.data.pai);
                break;
            case 6://补杠提示
                game.manager.dispatchEvent(EffectEvent.CardThrow, [GSData.i.getDir(obj.data.data.pos), obj.data.data.pai]);
                break;
            case 7://换三张
                game.status = GameStatus.changeThree;
                game.statusComplete = false;
                break;
            case 8://订缺
                game.status = GameStatus.missing;
                game.statusComplete = false;
                game.isQue = true;
                game.manager.dispatchEvent(EffectEvent.Que);
                break;
            case 9://同步换三张
                var dir: number = GSDataProxy.i.gData.getDir(obj.data.data);
                for (var i: number = 0; i < 3; i++) {
                    PublicVal.i.removeHandPai(dir);
                }
                GSController.i.updateMJView(dir, false, false);
                break;
            case 10://同步订缺
                for (var key in obj.data.data) {
                    game.roomQue[GSDataProxy.i.gData.getDir(Number(key))] = obj.data.data[key];
                }

                game.manager.dispatchEvent(EffectEvent.QueComplete);
                break;
        }
    }
}