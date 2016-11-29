/**
 * CommonManager
 * @Author Ace.c
 * @Create 2016-11-29 11:58
 */
class CommonManager {


    public constructor() {
    }

    /**
     * 设置升牌效果, 通过功能菜单
     */
    static setRaiseCardsByFuncMenu(): any[] {
        if (!GSData.i.funcSelects) {
            return [];
        }

        var all: any = GSData.i.funcSelects;
        var paiAll: any[] = [];
        var paiSingle: any[] = [];

        /**
         * @param type 1单张 2所有
         * @param pai
         * @param jin 禁止添加的牌
         */
        function pushPai(type: number, pai: any, jin: number = -1) {
            switch (type) {
                case 1:
                    if (paiSingle.indexOf(pai) == -1 && pai.number != jin) {
                        paiSingle.push(pai);
                    }
                    break;
                case 2:
                    if (paiAll.indexOf(pai) == -1) {
                        paiAll.push(pai);
                    }
                    break;
            }
        }

        for (var i: number = 0; i < all.length; i++) {
            var obj: any = all[i];

            if (obj.index == 0 || obj.index == 5 || obj.index == 6) {
                continue;
            }

            switch (obj.index) {
                case 1://吃
                    for (var j: number = 0; j < obj.group.length; j++) {
                        for (var k: number = 0; k < obj.group[j].pai.length; k++) {
                            pushPai(1, obj.group[j].pai[k], obj.group[j].pai[1].number);
                        }
                    }
                    break;
                case 2://碰
                    for (var j: number = 0; j < obj.pai.length; j++) {
                        pushPai(2, obj.pai[j]);
                    }
                    break;
                case 3://杠
                case 4://补
                    for (var j: number = 0; j < obj.group.length; j++) {
                        switch (obj.group[j].action) {
                            case 27:
                            case 28:
                                pushPai(1, obj.group[j].pai);
                                break;
                            default:
                                for (var k: number = 0; k < obj.group[j].pai.length; k++) {
                                    var pai: any = obj.group[j].pai[k];
                                    switch (obj.group[j].action) {
                                        case 22:
                                        case 26:
                                            pushPai(1, pai);
                                            break;
                                        default:
                                            pushPai(2, pai);
                                            break;
                                    }
                                }
                                break;
                        }
                    }
                    break;
            }
        }

        Acekit.i.dispatchEvent(EffectEvent.RaiseCards, {
            singleton: paiSingle,
            all: paiAll
        });
    }
}