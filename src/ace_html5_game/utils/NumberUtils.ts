/**
 * NumberUtils
 * @Author Ace.c
 * @Create 2016-11-18 12:04
 */
class NumberUtils {

    /**
     * 获取区间随机数
     * @param min
     * @param max
     * @returns {number}
     */
    public static getRandom(min: number, max: number) {
        return Math.floor(min + Math.random() * (max - min));
    }

    /**
     * 获取时间对应的秒数
     * @param time
     * @param value
     * @returns {number}
     */
    public static getSeconds(time: GameTime, value: number) {
        var sec: number = 0;
        switch (time) {
            case GameTime.Year:
                sec = value * 60 * 60 * 24 * 365;
                break;
            case GameTime.Month:
                sec = value * 60 * 60 * 24 * 30;
                break;
            case GameTime.Day:
                sec = value * 60 * 60 * 24;
                break;
            case GameTime.Hour:
                sec = value * 60 * 60;
                break;
            case GameTime.Minute:
                sec = value * 60;
                break;
            case GameTime.Second:
                sec = value;
                break;
        }
        return sec;
    }
}