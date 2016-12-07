/**
 * GameCore
 * @Author Ace.c
 * @Create 2016-12-05 16:08
 */
class game {

    static stage: egret.Stage;

    static gameType:GameType = GameType.sichuan;

    //管理
    static manager: GameManager = GameManager.i;

    //规则
    static ruleVo: GameRuleVo;
    //换三张
    static changeThreeVo: ChangeThreeVo;

    //当前状态
    static status: GameStatus = GameStatus.gamestart;
    //当前状态是否完成
    static statusComplete: boolean = false;

    //全部玩家的缺门记录
    static allQue: any = {};

    //确定的缺门
    static que: CardType;

    static init(stage) {

        acekit.init(stage);

        this.stage = stage;

        this.manager.init();

        game.ruleVo = new GameRuleVo();
        game.changeThreeVo = new ChangeThreeVo();
    }
}