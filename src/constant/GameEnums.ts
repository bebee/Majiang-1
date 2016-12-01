/**
 * @Author Ace.c
 * @Create 2016-11-30 10:08
 */

/**
 * 游戏状态
 * 开始-断线重连-洗牌-换牌-牌局开始-分张-自己胡牌-牌局结束-结束
 */
enum GameState {
    start = 1, reconnect, shuffle, change, gamestart, fen, win, gameover, over
}

/**
 * 卡牌类型
 * 1万 2条 3筒 4中发白
 */
enum CardType {
    wan, tiao, tong, zi
}