/**
 * Created by Administrator on 2016/11/26.
 */
class FashionTools {

    //自动出牌
    static autoPush() {

        /* if(GSConfig.auto) {

         var pai = GSData.i.getCatchPai(1);

         SocketManager.getInstance().getGameConn().send(4, {"args": pai});
         }*/
    }

    //自动过
    static autoPass() {

        /* if(GSConfig.auto) {

         SocketManager.getInstance().getGameConn().send(15, {"args": {"action": 0, "pai": []}});

         GSController.i.hideFuncSelectMenu();


         var pais = GSData.i.getHandPais(1);

         if(pais){

         if(GSConfig.handLens[pais.length]) {

         FashionTools.autoPush();
         }
         }

         }*/
    }

    /*显示类型 标准/精致
     * */
    static setViewType(type: number) {
        if (type == 1) {
            GSConfig.posRulePlus[1] = GSConfig.posRule[1];
            GSConfig.handPosPlus[1] = GSConfig.gameHandPos[1];
        } else {
            GSConfig.posRulePlus[1] = GSConfig.posRule[5];
            GSConfig.handPosPlus[1] = GSConfig.gameHandPos[5];
        }
        GSController.i.updateHandViewSize();
    }

    /*
     设置游戏牌风格
     */
    static setGameStyle(type: number) {
        if (type == 1) {
            GSConfig.card_bg_style = GSConfig.soft_card_bg_style;
            GSConfig.table_bg_res = GSConfig.soft_table_bg_res;
        } else {
            GSConfig.card_bg_style = GSConfig.normal_card_bg_style;
            GSConfig.table_bg_res = GSConfig.normal_table_bg_res;
        }
        GSController.i.updateGameStyle();
    }


    /*
     格式化规则文字
     */
    static formatRules(rules: number[]) {

        var ruleStr: string = "";

        for (var i: number = 0; i < rules.length; i++) {

            if (gameConfig.rules[rules[i]]) {
                ruleStr += gameConfig.rules[rules[i]] + " ";
            }
        }
        return ruleStr;
    }

    /*
     格式化牌型
     */
    static formatPai(type: number, paiNums: number[]) {

        var arr = [];

        if (paiNums) {

            for (var i: number = 0; i < paiNums.length; i++) {

                arr.push({type: type, number: paiNums[i]});
            }

        }

        return arr;
    }

    //排序手牌
    static sortPai(pais: any = null) {
        //if(pais == null) pais = PublicVal.i.allPais[1].handPais;

        pais.sort((a, b)=> {
            var _a = a.type * 10 + a.number;
            var _b = b.type * 10 + b.number;

            if (a.type == game.roomQue[1]) {
                _a += 100;
            }

            if (b.type == game.roomQue[1]) {
                _b += 100;
            }

            if (_a > _b) {
                return 1;
            }
            else if (_a == _b) {
                return 0;
            }
            else if (_a < _b) {
                return -1;
            }
        });
    }

    //移除队列某张牌
    static removePai(list: any, pai: any) {

        for (var i: number = 0; i < list.length; i++) {

            if (list[i].type == pai.type && list[i].number == pai.number) {

                list.splice(i, 1);

                break;
            }
        }
    }
}