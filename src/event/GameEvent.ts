/**
 * GameEvent
 * @Author Ace.c
 * @Create 2016-11-28 15:56
 */
class GameEvent {

    /**
     * 出牌事件
     * @type {string}
     */
    static ChupaiEvent: string = "ChupaiEvent";

    /**
     * 出牌提示事件
     * @type {string}
     */
    static ChupaiTipsEvent: string = "ChupaiTipsEvent";

    /**
     * 升起卡牌事件
     * @type {string}
     */
    static RaiseCardsEvent: string = "RaiseCardsEvent";


    static init() {
        GameDispatcher.ins.addEventListener(GameEvent.ChupaiEvent, this.onChupai, this);
        GameDispatcher.ins.addEventListener(GameEvent.ChupaiTipsEvent, this.onChupaiTips, this);
        GameDispatcher.ins.addEventListener(GameEvent.RaiseCardsEvent, this.onRaiseCards, this);
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
}