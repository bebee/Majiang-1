/**
 * CheckUtils
 * @Author Ace.c
 * @Create 2016-11-29 13:59
 */
class CheckUtils {

    /**
     * 检查输入字符串是否符合正整数格式
     * @param str
     * @returns {boolean}
     */
    static isNumber(str: string): boolean {
        var regExp = new RegExp("/^[0-9]+$/");
        return str.search(regExp) != -1;
    }

    /**
     * 检查输入对象的值是否符合整数格式
     * @param str
     * @returns {boolean}
     */
    static isInt(str: string): boolean {
        var regExp = new RegExp("/^[-]{0,1}[0-9]{1,}$/");
        return regExp.test(str);
    }

    /**
     * 检查输入字符串是否符合金额格式,格式定义为带小数的正数，小数点后最多三位
     * @param str
     * @returns {boolean}
     */
    static isMoney(str: string): boolean {
        var regExp = new RegExp("/^[0-9]+[\.][0-9]{0,3}$/");
        return regExp.test(str);
    }

    /**
     * 检查输入的电话号码格式是否正确
     * @param str
     * @returns {boolean}
     */
    static isPhone(str: string): boolean {
        var regExp = str.length > 9 ? new RegExp("/^[0][1-9]{2,3}-[0-9]{5,10}$/") : new RegExp("/^[1-9]{1}[0-9]{5,8}$/");
        return regExp.test(str);
    }

    /**
     * 检查输入手机号码是否正确
     * @param str
     * @returns {boolean}
     */
    static isMobilePhone(str: string): boolean {
        var regExp = new RegExp("/^1[3|4|5|7|8][0-9]\d{4,8}$/");
        return regExp.test(str);
    }

    /**
     * 校验ip地址的格式
     * @param str
     * @returns {boolean}
     */
    static isIP(str: string): boolean {
        var regExp = new RegExp("/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g");//匹配IP地址的正则表达式
        return regExp.test(str) && Number(RegExp.$1) < 256 && Number(RegExp.$2) < 256 && Number(RegExp.$3) < 256 && Number(RegExp.$4) < 256;
    }

    /**
     * 检查输入的Email信箱格式是否正确
     * @param str
     * @returns {boolean}
     */
    static isEmail(str: string): boolean {
        var regExp = new RegExp("/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/");
        return regExp.test(str);
    }
}