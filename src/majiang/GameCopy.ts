/**
 * GameCopy
 * @Author Ace.c
 * @Create 2016-11-28 15:14
 */
class GameCopy {

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