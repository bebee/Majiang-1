/**
 * GameManager
 * @Author Ace.c
 * @Create 2016-11-29 11:52
 */
class GameManager extends BaseDispatcher {

    private static _i: GameManager;

    static get i(): GameManager {
        !this._i && (this._i = new GameManager());
        return this._i;
    }

    gameEventManager: GameEffectManager;

    public constructor() {
        super();
    }

    init() {
        this.gameEventManager = new GameEffectManager();
    }
}