/**
 * GamePai
 * @Author Ace.c
 * @Create 2016-12-14 10:49
 */
class gamePai {



    /**
     * 获取最短的牌类型
     * @param limitLength 最低限制长度(大于等于该长度, 默认为-1不限制)
     * @returns {any}
     */
    static getCtShortest(limitLength: number = -1): CardType {
        var list: any[][] = [
            [CardType.wan, this.getCtLength(CardType.wan)],
            [CardType.tiao, this.getCtLength(CardType.tiao)],
            [CardType.tong, this.getCtLength(CardType.tong)]
        ];

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

        if (limitLength == -1) {
            return list[0][0];
        }
        else {
            for (var i: number = 0; i < list.length; i++) {
                length = list[i][1];
                if (list[i][1] >= limitLength) {
                    return list[i][0];
                }
            }
        }
    }

    /**
     * 获取某个类型牌的手牌长度
     * @param type
     * @returns {number}
     */
    static getCtLength(type: CardType): number {
        var handCards: any[] = PublicVal.i.getHandPais(1);
        var length: number = 0;
        var card: any;
        if (handCards) {
            for (var i: number = 0; i < handCards.length; i++) {
                card = handCards[i];
                if (card && card.type == type) {
                    length++;
                }
            }
        }
        return length;
    }

    /**
     * 获取某个类型牌的手牌序列
     * @param type
     * @param length
     * @returns {any[]}
     */
    static getCtCards(type: CardType, length: number = -1): any[] {
        var handCards: any[] = PublicVal.i.getHandPais(1);
        var cards: any[] = [];
        var card: any;

        if (handCards) {
            for (var i: number = 0; i < handCards.length; i++) {
                card = handCards[i];
                if (card && card.type == type) {
                    cards.push(card);
                }

                if (length != -1 && cards.length == length) {
                    break;
                }
            }
        }
        return cards;
    }
}