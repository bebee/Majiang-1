import rules = GameConfig.rules;
/**
 * GameRuleVo
 * @Author Ace.c
 * @Create 2016-12-06 17:05
 */
class GameRuleVo extends BaseVo {

    law: GamePlayType = GamePlayType.xueliuchenghe;
    ju: number = 4;
    rate: GameRate = GameRate.rate_2;
    rules: any[];
}