/**
 * ChangeThreeVo
 * @Author Ace.c
 * @Create 2016-12-05 16:46
 */
class ChangeThreeVo extends BaseDataVo {

    type: CardType;

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

        if (this.getTypeLength(type) < 3) {
            return false;
        }

        return true;
    }

    /**
     * 获取检测的牌组
     * @returns {any[]}
     */
    getQuickCards(): any[] {
        var list: any[][] = [[CardType.wan, this.getTypeLength(CardType.wan)], [CardType.tiao, this.getTypeLength(CardType.tiao)], [CardType.tong, this.getTypeLength(CardType.tong)]];
        list.sort(function (a, b) {
            if (a[1] < b[1]) {
                return -1;
            }
            else if (a[1] > b[1]) {
                return 1;
            }
            else {
                return 0;
            }
        });
        var length: number;
        var type: CardType;
        for (var i: number = 0; i < list.length; i++) {
            length = list[i][1];
            if (length >= 3) {
                type = list[i][0];
                break;
            }
        }

        this.type = type;

        this.cards = this.getTypeCards(type);

        return this.cards;
    }

    /**
     * 获取类型的牌组
     * @param type
     * @returns {number}
     */
    getTypeCards(type: CardType) {
        var handCards: any[] = PublicVal.i.getHandPais(1);
        var cards: any[] = [];
        var card: any;
        for (var i: number = 0; i < handCards.length; i++) {
            card = handCards[i];
            if (card && card.type == type) {
                cards.push(card);

                if (cards.length == 3) {
                    break;
                }
            }
        }
        return cards;
    }

    /**
     * 获取类型的长度
     * @param type
     * @returns {number}
     */
    getTypeLength(type: CardType) {
        var handCards: any[] = PublicVal.i.getHandPais(1);
        var length: number = 0;
        var card: any;
        for (var i: number = 0; i < handCards.length; i++) {
            card = handCards[i];
            if (card && card.type == type) {
                length++;
            }
        }
        return length;
    }
}