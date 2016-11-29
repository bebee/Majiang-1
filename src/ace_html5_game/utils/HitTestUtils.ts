/**
 * HitTestUtils
 * @Author Ace.c
 * @Create 2016-11-18 12:00
 */
class HitTestUtils {

    /**
     * 显示区域碰撞检测
     * @param o1
     * @param o2
     * @returns {boolean}
     */
    public static rectTest(o1: egret.DisplayObject, o2: egret.DisplayObject): boolean {
        if (!o1 || !o2) return false;

        var p1: egret.Point = o1.localToGlobal(0, 0);
        var r1: egret.Rectangle = o1.getBounds();
        r1.x = p1.x + 1;
        r1.y = p1.y + 1;
        r1.width -= 2;
        r1.height -= 2;

        var p2: egret.Point = o2.localToGlobal(0, 0);
        var r2: egret.Rectangle = o2.getBounds();
        r2.x = p2.x + 1;
        r2.y = p2.y + 1;
        r2.width -= 2;
        r2.height -= 2;

        return r1.intersects(r2);
    }
}