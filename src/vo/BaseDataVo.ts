/**
 * BaseDataVo
 * @Author Ace.c
 * @Create 2016-12-05 17:01
 */
class BaseDataVo extends BaseVo {

    gameManager: GameManager;

    public constructor() {
        super();

        this.gameManager = GameManager.i;
    }
}