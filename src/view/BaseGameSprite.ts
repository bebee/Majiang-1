/**
 * BaseGameSprite
 * @Author Ace.c
 * @Create 2016-09-05 15:52
 */
class BaseGameSprite extends BaseSprite {
    manager: GameManager;

    constructor() {
        super();
        this.manager = game.manager;
    }
}