
/**
 * Gender
 * @Author Ace.c
 * @Create 2016-11-18 11:06
 */
enum Gender {
    unknow, female = 0, male
}

/**
 * Language
 * @Author Ace.c
 * @Create 2016-11-18 11:05
 */
enum Language {
    All, Chinese, English, German, Japanese, French, Italian,
    Dutch, Korean, Spanish, Russian, Portuguese, Romanian, Thai
}

/**
 * Color
 * @Author Ace.c
 * @Create 2016-11-18 11:10
 */
enum Color {
    white = 0xFFFFFF,//白色
    milkWhite = 0xfbf1af,//乳白色
    grayWhite = 0xceb6a2,//灰白色
    yellow = 0xffff00,//金黄色
    lightYellow = 0xffd375,//淡黄色
    orangeYellow = 0xff9900,//橘黄色
    red = 0xf11300,//红色
    green = 0x00e500,//绿色
    blue = 0x1a94d7,//蓝色
    grayBlue = 0x2f5177,//墨蓝色
    purple = 0xe938f2,//紫色
    pink = 0xFF3030,//粉色
    black = 0x2e2d2d,//黑色
    golden = 0xFFD700 //金色
}

/**
 * GameQuality
 * @Author Ace.c
 * @Create 2016-11-18 11:09
 */
enum Quality {
    White = 0,
    Green,
    Blue,
    Purple,
    Golden
}

/**
 * 获取品质颜色
 * @param quality
 * @returns {Color}
 */
var getQualityColor:Function = function(quality: Quality): Color {
    var color: Color;
    switch (quality) {
        case Quality.Green:
            color = Color.green;
            break;
        case Quality.Blue:
            color = Color.blue;
            break;
        case Quality.Purple:
            color = Color.purple;
            break;
        case Quality.Golden:
            color = Color.golden;
            break;
        default :
            color = Color.white;
            break;
    }
    return color;
};