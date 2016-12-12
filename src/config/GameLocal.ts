/**
 * GameLocal
 * @Author Ace.c
 * @Create 2016-12-12 19:36
 */
class GameLocal {

    //登录Code
    static loginCode: string = "loginCode";
    //登录AccessCode
    static loginAccessCode: string = "loginAccessCode";

    //风格
    static style: string = "style";
    //颜色
    static color: string = "color";

    //音乐
    static music: string = "music";
    //音乐音量
    static musicVolume: string = "musicVolume";
    //音效
    static sound: string = "sound";
    //音效音量
    static soundVolume: string = "soundVolume";

    //读取数据
    static getData(key: string): string {
        return egret.localStorage.getItem(game.gameKey + key);
    }

    //储存数据
    static setData(key: string, value: any): void {
        egret.localStorage.setItem(game.gameKey + key, value);
    }
}