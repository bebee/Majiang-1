/**
 * 游戏音效播放管理
 */
module GameSound {
    /**
     * 音效对象池
     * @type {{}}
     */
    export var SoundDict = {};

    /**
     * 加载过的资源
     */
    export var loadList = {};

    /**
     * 音效音量
     * @type {number}
     * @private
     */
    export var _volume: number = 1;

    /**
     * @param name  音乐文件名
     * @param loops  播放次数<= 0循环播放，>0播放该次数,默认为1
     * @param startTime 开始播放的时间 默认是0
     * @constructor
     */
    export function PlaySound(name: string, loops: number = 1, startTime: number = 0) {
        var _switch: number = +gameLocal.getData(gameLocal.sound);
        if (_switch == 0) return;

        var SoundDict = GameSound.SoundDict;

        var sound: egret.Sound;
        var channel: egret.SoundChannel;

        if (!SoundDict[name]) {
            sound = RES.getRes("" + name);

            if (!sound) {
                if (!GameSound.loadList[name]) GameSound.loadMusic(name);
                return;
            }
        }
        else {
            sound = SoundDict[name]["s"];
            channel = SoundDict[name]["c"];
        }

        channel = sound.play(startTime, loops);

        channel.volume = GameSound._volume / 100;

        SoundDict[name] = {"s": sound, "c": channel};
    }

    /**
     * 关闭所有在播放的音效
     * @constructor
     */
    export function CloseAllSound(): void {
        var SoundDict = GameSound.SoundDict;

        for (var name in SoundDict) {
            var channel: egret.SoundChannel = SoundDict[name]["c"];

            if (channel) channel.stop();
        }
    }

    /**
     * 关闭一个在播放额音效
     * @param name
     * @constructor
     */
    export function CloseSound(name: string): void {

        if (!SoundDict[name]) return;

        var channel: egret.SoundChannel = SoundDict[name]["c"];

        if (channel) channel.stop();
    }

    /**
     * 加载一个音效
     * @param name
     */
    export function loadMusic(name: string): void {
        GameSound.loadList[name] = name;

        if (RES.hasRes(name)) {
            RES.getResAsync(name, function () {
                GameSound.PlaySound(name);
            }, this);
        }
    }

    /**
     * 设置音效音量
     * @param volume
     */
    export function setSoundVolume(volume: number = 0): void {
        GameSound._volume = volume;

        var SoundDict = GameSound.SoundDict;

        for (var name in SoundDict) {
            var channel: egret.SoundChannel = SoundDict[name]["c"];

            if (channel && channel.position > 0) {
                channel.volume = volume / 100;
            }
        }
    }
}