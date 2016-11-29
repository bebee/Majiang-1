/**
 * GameColor
 * @Author Ace.c
 * @Create 2016-11-18 11:10
 */
enum GameColor {
    White = 0xFFFFFF,
    Green = 0x00e500,
    Blue = 0x1a94d7,
    Purple = 0xe938f2,
    Golden = 0xFFD700,
    Yellow = 0xffff00,
    Pink = 0xFF3030,
    Red = 0xf11300,
    Black = 0x2e2d2d
}

/**
 * 获取品质颜色
 * @param quality
 * @returns {GameColor}
 */
var getQualityColor:Function = function(quality: GameQuality): GameColor {
    var color: GameColor;
    switch (quality) {
        case GameQuality.Green:
            color = GameColor.Green;
            break;
        case GameQuality.Blue:
            color = GameColor.Blue;
            break;
        case GameQuality.Purple:
            color = GameColor.Purple;
            break;
        case GameQuality.Golden:
            color = GameColor.Golden;
            break;
        default :
            color = GameColor.White;
            break;
    }
    return color;
};