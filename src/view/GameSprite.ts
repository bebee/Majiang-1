/**
 * GameSprite
 * @Author Ace.c
 * @Create 2016-09-05 15:52
 */
class GameSprite extends BaseSprite {
    public gameManager: GameManager;

    public constructor() {
        super();
        this.gameManager = game.manager;
    }
}