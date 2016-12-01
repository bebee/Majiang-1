/**
 * GameManager
 * @Author Ace.c
 * @Create 2016-11-29 11:52
 */
class GameManager {


    public constructor() {
        // Acekit.i.dispatchEvent(EffectEvent.ChangeThree, ChangeThreeType.other);
        // Acekit.i.dispatchEvent(EffectEvent.Chupai, [dir, pai]);
        // Acekit.i.dispatchEvent(EffectEvent.ChupaiTips, [dir, CardView]);
        // Acekit.i.dispatchEvent(EffectEvent.RaiseCards, RaiseCardsType.changeThree);
    }

    static init(stage) {
        Acekit.i.init(stage);
        Acekit.i.addEventListener(EffectEvent.ChangeThree, this.onChangeThree, this);
        Acekit.i.addEventListener(EffectEvent.Chupai, this.onChupai, this);
        Acekit.i.addEventListener(EffectEvent.ChupaiTips, this.onChupaiTips, this);
        Acekit.i.addEventListener(EffectEvent.RaiseCards, this.onRaiseCards, this);
    }

    private static onChangeThree(type: ChangeThreeType) {
        if (type != undefined) {
            ChangeThreeEffect.play(type);
        }
        else {
            ChangeThreeEffect.stop();
        }
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
        if (arr && arr.length == 2) {
            ChupaiTipsEffect.play(arr[1], (arr[0] == 1 || arr[0] == 3) ? 2 : 0);
        }
        else {
            ChupaiTipsEffect.stop();
        }
    }

    private static onRaiseCards(type: RaiseCardsType) {
        if (type != undefined) {
            RaiseCardsEffect.play(type);
        }
        else {
            RaiseCardsEffect.stop();
        }
    }
}