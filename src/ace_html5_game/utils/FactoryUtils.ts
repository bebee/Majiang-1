/**
 * 工厂工具
 * @Author Ace
 * @Create 2016-09-04 14:34
 */
class FactoryUtils {

    /**
     * 获取一个Label
     */
    public static getLabel(align: string = "left", color: number = 0xffffff, bold: boolean = false, multiline: boolean = true, wordWrap: boolean = true): eui.Label {
        var label: eui.Label = new eui.Label();
        label.textAlign = align;
        label.textColor = color;
        label.bold = bold;
        label.multiline = multiline;
        label.wordWrap = wordWrap;
        return label;
    }

    /**
     * 获取一个TextField
     */
    public static getTextfield(align: string = "left", color: number = 0xffffff, bold: boolean = false): egret.TextField {
        var tf: egret.TextField = new egret.TextField();
        tf.textAlign = align;
        tf.textColor = color;
        tf.bold = bold;
        tf.multiline = true;
        tf.wordWrap = true;
        return tf;
    }

    /**
     * 获取一个MovieClip
     */
    public static getMovieclip(name: string): egret.MovieClip {
        var RJson = RES.getRes(name + "_json");
        var RImg = RES.getRes(name + "_img");
        if (RJson && RImg) {
            var factory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RJson, RImg);
            return new egret.MovieClip(factory.generateMovieClipData());
        }
        else {
            return null;
        }
    }
}