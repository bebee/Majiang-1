/**
 * DirtyUtils
 * @Author Ace.c
 * @Time 2016-08-09 13:47
 */
class DirtyUtils {

    /**
     * 替换非法字符
     * @param str
     * @returns {string}
     */
    public static replace(str: string): string {
        var index: number = 0;
        var repStr: string;
        while (index < GameDirty.config.length) {
            if (str.indexOf(GameDirty.config[index]) != -1) {
                repStr = "";
                for (var i: number = 0; i < GameDirty.config[index].length; i++) {
                    repStr += "*";
                }
                str = str.replace(GameDirty.config[index], repStr);
                continue;
            }
            index++;
        }
        return str;
    }

    /**
     * 检索非法字符
     * @param str
     * @returns {boolean}
     */
    public static search(str: string): boolean {
        var index: number = 0;
        while (index < GameDirty.config.length) {
            if (str.indexOf(GameDirty.config[index]) != -1) {
                return true;
            }
            index++;
        }
        return false
    }
}