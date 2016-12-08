/**
 * ChangeThreeVo
 * @Author Ace.c
 * @Create 2016-12-05 16:46
 */
class ChangeThreeVo extends BaseDataVo {

    //换三张类型
    type: CardType;
    //换三张队列
    cards: any[] = [];

    delCard(card: any) {
        if (this.hasCard(card)) {
            this.cards.splice(this.cards.indexOf(card), 1);
            this.type = this.cards.length == 0 ? null : this.type;
            return true;
        }
        return false;
    }

    addCard(card: any) {
        if (this.checkType(card.type)) {
            this.cards.push(card);
            this.type = this.type == null ? card.type : this.type;
            return true;
        }
        return false;
    }

    hasCard(card: any) {
        return this.cards.indexOf(card) != -1;
    }

    clean() {
        this.type = null;
        this.cards = [];
    }

    /**
     * 检测类型
     * @param type
     * @returns {boolean}
     */
    checkType(type: CardType) {
        if (this.type != null && this.type != type) {
            return false;
        }

        if (this.cards.length >= 3) {
            return false;
        }

        if (game.getCtLength(type) < 3) {
            return false;
        }
        return true;
    }

    /**
     * 获取推荐队列
     * @returns {any[]}
     */
    getRecommend(): any[] {
        this.type = game.getCtShortest(3);
        this.cards = game.getCtCards(this.type, 3);
        return this.cards;
    }
}