/**
 * GameManager
 * @Author Ace.c
 * @Create 2016-11-29 11:52
 */
class GameManager extends BaseDispatcher {

    private static _i: GameManager;

    static get i(): GameManager {
        return this._i || (this._i = new GameManager());
    }

    timerManager: TimerManager;
    gameEventManager: GameEffectManager;

    constructor() {
        super();
    }

    init() {
        this.timerManager = TimerManager.i;
        this.gameEventManager = new GameEffectManager();
    }

    get layerScene() {
        return GameLayerManager.gameLayer().sceneLayer;
    }

    get layerPanel() {
        return GameLayerManager.gameLayer().panelLayer;
    }
}