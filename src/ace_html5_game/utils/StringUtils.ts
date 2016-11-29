/**
 * 字符串处理工具
 * @Author Ace.c
 * @Time 2016-08-09 10:22
 */
class StringUtils {

    /**
     * 获取字符长度
     * @returns {number}
     */
    public static getCharLength(text: string): number {
        var len: number = 0;
        for (var i: number = 0; i < text.length; i++) {
            if (text.charCodeAt(i) >= 0 && text.charCodeAt(i) <= 128) {
                len += 1;
            }
            else {
                len += 2;
            }
        }
        return len;
    }

    /**
     * 获取时间字符串
     * @returns {string} 00d00h00m00s
     */
    public static getTimeStr(sec: number): string {
        sec = sec < 0 ? 0 : sec;
        var d: number = Math.floor(sec / 86400);
        var h: number = Math.floor(sec % 86400 / 3600);
        var m: number = Math.floor(sec % 3600 / 60);
        var s: number = Math.floor(sec % 60);
        var str: string = "";
        if (d > 0) str += (d < 10 ? "0" + d : d) + "d";
        if (h > 0) str += (h < 10 ? "0" + h : h) + "h";
        if (m > 0) str += (m < 10 ? "0" + m : m) + "m";
        if (s > 0) str += (s < 10 ? "0" + s : s) + "s";
        return str;
    }

    /**
     * 获取时间字符串2
     * @returns {string} 00:00:00
     */
    public static getTimeStr2(sec: number): string {
        sec = sec < 0 ? 0 : sec;
        var h: number = Math.floor(sec / 3600);
        var m: number = Math.floor(sec % 3600 / 60);
        var s: number = Math.floor(sec % 60);
        return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }

    /**
     * 获取年月日, 通过时间戳
     * @returns {string} YYYY-MM-DD
     */
    public static getYTDByTimestamp(timestamp: number): string {
        timestamp = timestamp < 0 ? 0 : timestamp;

        var date: Date = new Date();
        date.setTime(timestamp);

        var Y: number = date.getFullYear();
        var M: number = date.getMonth() + 1;
        var D: number = date.getDate();
        return Y + "-" + (M < 10 ? "0" + M : M) + "-" + (D < 10 ? "0" + D : D);
    }

    /**
     * 获取时分秒, 通过时间戳
     * @returns {string} 00:00:00
     */
    public static getHMSByTimestamp(timestamp:number):string {
        timestamp = timestamp < 0 ? 0 : timestamp;

        var date: Date = new Date();
        date.setTime(timestamp);

        var h: number = date.getHours();
        var m: number = date.getMinutes();
        var s: number = date.getSeconds();
        return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }

    /**
     * 获取url参数
     * @param name
     * @returns {string}
     */
    public static getUrlParams(name: string) {
        var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
        var m = location.href.match(r);
        return decodeURIComponent(!m ? "" : m[2]);
    }

    /**
     * 获得值字符串
     * @returns {string} 格式:1,000,000
     */
    public static getValueStr(value: number): string {
        var arr: string[] = value.toString().split("");
        var str: string = "";
        var len: number = arr.length;
        for (var i: number = 1; i <= len; i++) {
            str = arr.pop() + str;
            if (i % 3 == 0 && i != len) {
                str = "," + str;
            }
        }
        return str;
    }

    /**
     * 获得值字符串
     * @param value
     * @returns {string} 格式:1.00k
     */
    public static getValueStr2(value: number): string {
        var str: string = "";
        var len: number = String(Math.floor(value)).length;

        if (len < 4) {
            str = String(Math.round(value));
        }
        else if (len < 7) {
            str = String(Math.floor(value / 100) / 10) + "K";
        }
        else if (len < 10) {
            str = String(Math.floor(value / 100000) / 10) + "M";
        }
        else if (len < 13) {
            str = String(Math.floor(value / 100000000) / 10) + "B";
        }
        else {
            str = String(Math.floor(value / 100000000000) / 10) + "T";
        }
        return str;
    }

    // /**
    //  * 替换字符串内参数
    //  * @returns {string}
    //  */
    // public static replace(str: string, params:any[]): string {
    //     // var reg: RegExp = new RegExp('\{[0-9]\}');
    //     // return str.replace(reg, rep);
    // }

    /**
     * 替换字符串
     * @returns {string}
     */
    public static replace(str: string, rep: string): string {
        var reg: RegExp = new RegExp('\{[0-9]\}');
        return str.replace(reg, rep);
    }

    /**
     * 替换非法字符
     * @returns {string}
     */
    public static replaceDirtyWords(str: string): string {
        return DirtyUtils.replace(str);
    }

    /**
     * 检索非法字符
     * @returns {boolean}
     */
    public static searchDirtyWords(str: string): boolean {
        return DirtyUtils.search(str);
    }

    /**
     * 删除空格
     * @returns {string}
     */
    public static deleteSpace(str: string): string {
        var arr: string[] = str.split("");
        while (arr.indexOf(" ") != -1) {
            arr.splice(arr.indexOf(" "), 1);
        }
        return arr.join("");
    }
}