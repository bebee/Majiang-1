/**
 * GameEffectManager
 * @Author Ace.c
 * @Create 2016-12-05 16:00
 */
class GameEffectManager extends BaseManager {

    private changeThreeView: ChangeThreeView;
    private changeThreeAnimation: ChangeThreeAnimation;
    private queView: QueView;
    private rainingView: RainingView;
    private windyView: WindyView;
    private gangshangkaihuaView: GangshangkaihuaView;
    private hujiaozhuanyiView: HujiaozhuanyiView;

    public constructor() {
        super();
    }


    init() {
        super.init();

        this.changeThreeView = new ChangeThreeView();
        this.changeThreeAnimation = new ChangeThreeAnimation();
        this.queView = new QueView();
        this.rainingView = new RainingView();
        this.windyView = new WindyView();
        this.hujiaozhuanyiView = new HujiaozhuanyiView();
        this.gangshangkaihuaView = new GangshangkaihuaView();

        this.gameManager.addEventListener(GameEvent.CleanAll, this.onCleanAll, this);
        this.gameManager.addEventListener(GameEvent.ChangeThree, this.onChangeThree, this);
        this.gameManager.addEventListener(GameEvent.ChangeThreeSys, this.onChangeThreeSys, this);
        this.gameManager.addEventListener(GameEvent.ChangeThreeComplete, this.onChangeThreeComplete, this);
        this.gameManager.addEventListener(GameEvent.CardMissComfirm, this.onCardMissComfirm, this);
        this.gameManager.addEventListener(GameEvent.CardRaise, this.onCardRaise, this);
        this.gameManager.addEventListener(GameEvent.CardThrow, this.onCardThrow, this);
        this.gameManager.addEventListener(GameEvent.CardThrowTips, this.onCardThrowTips, this);
        this.gameManager.addEventListener(GameEvent.Windy, this.onWindy, this);
        this.gameManager.addEventListener(GameEvent.Raining, this.onRaining, this);
        this.gameManager.addEventListener(GameEvent.Hujiaozhuanyi, this.onHujiaozhuanyi, this);
        this.gameManager.addEventListener(GameEvent.Gangshangkaihua, this.onGangshangkaihua, this);

    }

    private onGangshangkaihua(dir: DirType) {
        this.gangshangkaihuaView.play(dir);
    }

    private onHujiaozhuanyi(dir: DirType, dir_0: DirType) {
        this.hujiaozhuanyiView.play(dir, dir_0);
    }

    private onRaining(dir: DirType) {
        this.rainingView.play(dir);
    }

    private onWindy(dir: DirType) {
        this.windyView.play(dir);
    }

    private onCleanAll() {
        this.changeThreeView.hide();
        this.changeThreeAnimation.hide();

        this.queView.hide();

        GSController.i.gsView.updateState();
    }

    private onChangeThree() {
        GSController.i.gsView.updateState();

        this.changeThreeView.show();
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
        this.queView.show();
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