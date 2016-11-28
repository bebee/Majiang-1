enum RaiseCardsType {
    singleton, all
}

/**
 * RaiseCardsEffect
 * @Author Ace.c
 * @Create 2016-11-28 16:25
 */
class RaiseCardsEffect {

    static play(singleton: any[], all: any[], touchEnabled?: boolean) {
        if (!singleton && !all) {
            this.stop(true);
            return;
        }

        this.stop(touchEnabled);

        if (singleton) {
            this.update(singleton, RaiseCardsType.singleton);
        }

        if (all) {
            this.update(all, RaiseCardsType.all);
        }
    }

    static stop(touchEnabled?: boolean) {
        var view: MJView = GSController.i.gsView.MJViews[1];
        var card: CardView;
        for (var i: number = 0; i < view.handCon.numChildren; i++) {
            card = <CardView>view.handCon.getChildAt(i);
            if (!card || card.index < 0) {
                continue;
            }

            card.y = card.pos.y;
            card.touchEnabled = touchEnabled;
        }
    }

    private static update(arr: any[], type: RaiseCardsType) {
        for (var i: number = 0; i < arr.length; i++) {
            this.excute(arr[i], type);
        }
    }

    private static excute(pai: any, type: RaiseCardsType) {
        var view: MJView = GSController.i.gsView.MJViews[1];
        var card: CardView;

        for (var j: number = 0; j < view.handCon.numChildren; j++) {
            card = <CardView>view.handCon.getChildAt(j);
            if (!card || card.index < 0) {
                continue;
            }

            if (card.pai.type == pai.type && card.pai.number == pai.number) {
                card.y = card.pos.y - GSConfig.moveUpDis;
                if (type == RaiseCardsType.singleton) {
                    break;
                }
            }
        }
    }
}