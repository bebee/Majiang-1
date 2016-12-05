/**
 * GameCore
 * @Author Ace.c
 * @Create 2016-12-05 16:08
 */
class gameCore {

    static gameManager: GameManager = GameManager.i;

    static changeThreeVo: ChangeThreeVo = new ChangeThreeVo();

    static init(stage) {

        acekit.init(stage);

        this.gameManager.init();
    }
}