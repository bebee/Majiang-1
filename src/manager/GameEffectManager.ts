/**
 * GameEffectManager
 * @Author Ace.c
 * @Create 2016-12-05 16:00
 */
class GameEffectManager extends BaseManager {

    private changeThreeSelect: ChangeThreeSelect;
    private changeThreeAnimation: ChangeThreeAnimation;

    private missingSelect: MissingSelect;

    public constructor() {
        super();
    }


    init() {
        super.init();

        this.changeThreeSelect = new ChangeThreeSelect();
        this.changeThreeAnimation = new ChangeThreeAnimation();

        this.missingSelect = new MissingSelect();

        this.gameManager.addEventListener(GameEvent.CleanAll, this.onCleanAll, this);
        this.gameManager.addEventListener(GameEvent.ChangeThree, this.onChangeThree, this);
        this.gameManager.addEventListener(GameEvent.ChangeThreeSys, this.onChangeThreeSys, this);
        this.gameManager.addEventListener(GameEvent.ChangeThreeComplete, this.onChangeThreeComplete, this);
        this.gameManager.addEventListener(GameEvent.CardMissComfirm, this.onCardMissComfirm, this);
        this.gameManager.addEventListener(GameEvent.CardRaise, this.onCardRaise, this);
        this.gameManager.addEventListener(GameEvent.CardThrow, this.onCardThrow, this);
        this.gameManager.addEventListener(GameEvent.CardThrowTips, this.onCardThrowTips, this);

    }

    private onCleanAll() {
        this.changeThreeSelect.hide();
        this.changeThreeAnimation.hide();

        this.missingSelect.hide();

        GSController.i.gsView.updateState();
    }

    private onChangeThree() {
        GSController.i.gsView.updateState();

        this.changeThreeSelect.show();
        this.onCardRaise(CardRaiseMode.changeThree);
    }

    private onChangeThreeSys(dir: number) {
    }

    private onChangeThreeComplete(type: ChangeThreeType) {
        this.changeThreeAnimation.setType(type);
        this.changeThreeAnimation.show();
    }

    private onCardRaise(type: CardRaiseMode) {
        if (type != undefined) {
            CardRaiseEffect.play(type);
        }
        else {
            CardRaiseEffect.stop();
        }
    }

    private onCardMissComfirm() {
        this.missingSelect.show();
    }

    private onCardThrow(arr: any[]) {
        if (arr && arr.length == 2) {
            ChupaiEffect.play(arr[0], arr[1]);
        }
        else {
            ChupaiEffect.stop(true);
        }
    }

    private onCardThrowTips(arr: any[]) {
        if (arr && arr.length == 2) {
            ChupaiTipsEffect.play(arr[1], (arr[0] == 1 || arr[0] == 3) ? 2 : 0);
        }
        else {
            ChupaiTipsEffect.stop();
        }
    }
}