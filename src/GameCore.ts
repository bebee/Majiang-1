/**
 * GameCore
 * @Author Ace.c
 * @Create 2016-12-05 16:08
 */
class game {

    static stage: egret.Stage;

    //管理
    static manager: GameManager = GameManager.i;

    //规则
    static ruleVo: GameRuleVo;
    //换三张
    static changeThreeVo: ChangeThreeVo;

    static init(stage) {

        acekit.init(stage);

        this.stage = stage;

        this.manager.init();

        game.ruleVo = new GameRuleVo();
        game.changeThreeVo = new ChangeThreeVo();
    }
}