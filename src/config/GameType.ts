/**
 * 游戏类型
 */
enum GameType {
    baicheng = 1, sichuan = 100
}

/**
 * 状态
 */
enum StateType {
    ready = 1, continue, shuffle, gamestart, ting, fen, win, gameover, over, replay
}

/**
 * 游戏状态
 */
enum GameStatus {
    unknow, changeThree, missing, gamestart
}

/**
 * 方向
 */
enum DirType {
    bottom = 1, right, top, left
}

/**
 * 卡牌类型
 * 1万 2条 3筒 4中发白
 */
enum CardType {
    unknow, wan = 1, tiao, tong, zi
}

/**
 * 换三张类型
 */
enum ChangeThreeType {
    clockwise = 1,
    anti_clockwise,
    other
}

/**
 * 升牌类型
 */
enum CardRaiseMode {
    funcmenu, changeThree
}

/**
 * 中断类型
 */
enum InterruptType {
    chi, peng, minggang, angang, ting, hu, gangshangkaihua, yipaoduoxiang, hujiaozhuanyi
}

/**
 * 游戏玩法
 */
enum PlayType {
    xuezhandaodi = 17, xueliuchenghe, sanren_2 = 20, sanren_3, siren_2
}

/**
 * 游戏规则
 */
enum GameRule {
    jiawu = 1, qingyise, kouting, jihujipiao, zangang, shoubayi, beikaobei, zerenzhi,
    zimojiadi = 9, zimojiafan, dianganghua_pao, dianganghua_zimo, huansanzhang, yaojiujiangdui, menqingzhongzhang, tiandihu,
    fengding = 19, paizhang = 23, kaertiao = 24
}