/**
 * GameManager
 * @Author Ace.c
 * @Create 2016-11-29 11:52
 */
class GameManager {


    public constructor() {
    }

    static init(stage) {
        Acekit.i.init(stage);
        Acekit.i.addEventListener(EffectEvent.Chupai, this.onChupai, this);
        Acekit.i.addEventListener(EffectEvent.ChupaiTips, this.onChupaiTips, this);
        Acekit.i.addEventListener(EffectEvent.RaiseCards, this.onRaiseCards, this);
    }

    private static onChupai(arr: any[]) {
        if (arr && arr.length == 2) {
            ChupaiEffect.play(arr[0], arr[1]);
        }
        else {
            ChupaiEffect.stop(true);
        }
    }

    private static onChupaiTips(arr: any[]) {
        console.log(arr);
        if (arr && arr.length == 2) {
            ChupaiTipsEffect.play(arr[1], (arr[0] == 1 || arr[0] == 3) ? 2 : 0);
        }
        else {
            ChupaiTipsEffect.stop();
        }
    }

    private static onRaiseCards(data: any) {
        if (data) {
            RaiseCardsEffect.play(data.singleton, data.all, data.touch);
        }
        else {
            RaiseCardsEffect.stop(true);
        }
    }

    /**
     * 复制一张牌
     * @param card
     * @returns {CardView|CardView}
     */
    static copyPai(card: CardView) {

        var cardView = CardView.getCardView();
        cardView.alpha = card.alpha;
        cardView.scaleX = card.scaleX;
        cardView.scaleY = card.scaleY;
        cardView.x = card.x;
        cardView.y = card.y;
        cardView.dir = card.dir;
        cardView.style = card.style;
        cardView.pai = card.pai;
        cardView.count = card.count;
        cardView.reDraw();

        return cardView;
    }
}