/**
 * GameEventManager
 * @Author Ace.c
 * @Create 2016-12-05 16:00
 */
class GameEventManager extends BaseManager {


    public constructor() {
        super();
        // Acekit.i.dispatchEvent(EffectEvent.ChangeThree, ChangeThreeType.other);
        // Acekit.i.dispatchEvent(EffectEvent.Missing);
        // Acekit.i.dispatchEvent(EffectEvent.Chupai, [dir, pai]);
        // Acekit.i.dispatchEvent(EffectEvent.ChupaiTips, [dir, CardView]);
        // Acekit.i.dispatchEvent(EffectEvent.RaiseCards, RaiseCardsType.changeThree);
    }


    init() {
        super.init();

        this.gameManager.addEventListener(EffectEvent.ChangeThree, this.onChangeThree, this);
        this.gameManager.addEventListener(EffectEvent.Missing, this.onMissing, this);
        this.gameManager.addEventListener(EffectEvent.Chupai, this.onChupai, this);
        this.gameManager.addEventListener(EffectEvent.ChupaiTips, this.onChupaiTips, this);
        this.gameManager.addEventListener(EffectEvent.RaiseCards, this.onRaiseCards, this);

    }

    private onChangeThree(type: ChangeThreeType) {
        if (type != undefined) {
            ChangeThreeEffect.play(type);
        }
        else {
            ChangeThreeEffect.stop();
        }
    }

    private onMissing() {
        MissingEffect.play();
    }

    private onChupai(arr: any[]) {
        if (arr && arr.length == 2) {
            ChupaiEffect.play(arr[0], arr[1]);
        }
        else {
            ChupaiEffect.stop(true);
        }
    }

    private onChupaiTips(arr: any[]) {
        if (arr && arr.length == 2) {
            ChupaiTipsEffect.play(arr[1], (arr[0] == 1 || arr[0] == 3) ? 2 : 0);
        }
        else {
            ChupaiTipsEffect.stop();
        }
    }

    private onRaiseCards(type: RaiseCardsType) {
        if (type != undefined) {
            RaiseCardsEffect.play(type);
        }
        else {
            RaiseCardsEffect.stop();
        }
    }
}