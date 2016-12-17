/**
 * DisplayEffect
 * @Author Ace.c
 * @Time 2016-08-09 13:47
 */
class DisplayEffect {

    /**
     * 闪烁特效
     * @param display 旋转对象
     * @param type 类型
     * @param delay 间隔(单位:毫秒)
     */
    static twinkle(display, type: number = 1, delay: number = 1000) {
        if (display == null) return;

        switch (type) {
            case 1://循环闪烁
                egret.Tween.get(display, {loop: true}).to({alpha: 0.5}, delay).to({alpha: 1.0}, delay / 2);
                break;
        }
    }

    /**
     * 缩放特效
     * @param display 旋转对象
     * @param type 类型
     * @param delay 间隔(单位:毫秒)
     */
    static scaling(display, type: number = 1, delay: number = 1000) {
        if (display == null) return;

        switch (type) {
            case 1://放大0.5倍-迅速还原
                egret.Tween.get(display)
                    .to({scaleX: 1.5, scaleY: 1.5}, delay)
                    .to({scaleX: 1.0, scaleY: 1.0}, 50);
                break;
            case 2://缩小0.5倍-迅速还原
                egret.Tween.get(display)
                    .to({scaleX: 0.5, scaleY: 0.5}, delay)
                    .to({scaleX: 1.0, scaleY: 1.0}, 50);
                break;
        }
    }

    /**
     * 旋转特效
     * @param display 旋转对象
     * @param type 类型
     * @param delay 间隔(单位:毫秒)
     */
    static turning(display, type: number = 1, delay: number = 1000) {
        if (display == null) return;

        switch (type) {
            case 1://循环旋转-360°
                egret.Tween.get(display, {loop: true}).to({rotation: 360}, delay).call(function () {
                    this.rotation = 0;
                }, display);
                break;
        }
    }

    /**
     * 浮动特效
     * @param display
     * @param type 类型
     * @param delay 间隔(单位:毫秒)
     * @param spacing 间距(单位:像素)
     */
    static floating(display, type: number = 1, delay: number = 50, spacing: number = 50) {
        if (display == null) return;

        switch (type) {
            case 1://循环浮动-向上返回
                egret.Tween.get(display, {loop: true}).to({y: display.y + spacing}, delay).to({y: display.y - spacing}, delay);
                break;
            case 2:
                break;
        }
    }

    /**
     * 摇动特效
     * @param display
     * @param type 类型
     * @param delay 间隔(单位:毫秒)
     * @param spacing 间距(单位:角度)
     * @param loop 是否循环
     */
    static shaking(display, type: number = 1, delay: number = 50, spacing: number = 20, loop: boolean = true) {
        if (display == null) return;

        switch (type) {
            case 1://循环摇动
                egret.Tween.get(display, {loop: loop}).to({rotation: spacing}, delay).to({rotation: -spacing}, delay);
                break;
            case 2://抖动
                var oldX: number = display.x;
                egret.Tween.get(display, {loop: loop})
                    .to({x: display.x - 10}, delay)
                    .to({x: display.x + 20}, delay)
                    .to({x: display.x - 20}, delay)
                    .to({x: display.x + 20}, delay)
                    .to({x: oldX}, delay);
                break;
            case 3://震动
                var oldX: number = display.x;
                var oldY: number = display.y;
                egret.Tween.get(display, {loop: loop})
                    .to({x: display.x - 10, y: display.y}, delay)
                    .to({x: display.x + 20, y: display.y}, delay)
                    .to({x: display.x, y: display.y + 15}, delay)
                    .to({x: display.x, y: display.y - 20}, delay)
                    .to({x: display.x, y: display.y + 10}, delay)
                    .to({x: oldX, y: oldY}, delay);
                break;
        }
    }
}