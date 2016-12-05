/**
 * BaseManager
 * @Author Ace.c
 * @Create 2016-12-05 15:55
 */
class BaseManager extends BaseDispatcher {

    gameManager: GameManager;

    public constructor() {
        super();

        this.gameManager = GameManager.i;

        this.init();
    }

    init() {

    }
}