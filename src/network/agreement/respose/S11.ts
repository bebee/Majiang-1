/**
 * 同步牌的信息
 */
class S11 {
    public parseData(obj: any) {
        if (!obj) return;

        console.log("同步牌的信息", obj);

        var action = +obj.data.action;

        if (action > 0) {

            switch (action) {

                case 100://初始牌手牌
                    GSDataProxy.i.S2C_OwnCardInfo(obj);
                    break;
                case 200://抓牌
                    console.log("同步己方抓牌", obj.data.pai[0]);
                    game.manager.dispatchEvent(EffectEvent.CardThrow);
                    game.manager.dispatchEvent(EffectEvent.CardRaise);
                    GSDataProxy.i.S2C_OwnCatch(obj.data.pai[0], obj.data.dui_num, obj.data.hasOwnProperty("fen"));
                    GSController.i.gsView.resetAllChildrenTouch();
                    break;
                case 300://换宝牌
                    GSDataProxy.i.S2C_Bao(obj.data);
                    break;
                case 301://换三张
                    game.isChangeThree = true;
                    game.manager.dispatchEvent(EffectEvent.ChangeThreeComplete, obj.data.huan_type);

                    var pais: any = obj.data.pai;
                    for (var i: number = 0; i < pais.length; i++) {
                        PublicVal.i.addHandPai(1, pais[i]);
                        PublicVal.i.addHandPai(2, null);
                        PublicVal.i.addHandPai(3, null);
                        PublicVal.i.addHandPai(4, null);
                    }

                    FashionTools.sortPai(PublicVal.i.getHandPais(1));
                    break;
                case 302://订缺
                    break;
                default://同步自己的功能牌
                    game.manager.dispatchEvent(EffectEvent.CardThrow);
                    game.manager.dispatchEvent(EffectEvent.CardThrowTips);
                    GSDataProxy.i.S2C_FuncResult(obj.data);
                    GSController.i.gsView.resetAllChildrenTouch();
                    break;
            }
        }
    }
}