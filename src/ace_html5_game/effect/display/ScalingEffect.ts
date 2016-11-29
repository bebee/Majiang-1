/**
 * 缩放特效
 * @Author Ace.c
 * @Create 2016-11-19 14:29
 */
class ScalingEffect {

    static play(display, type: ScalingEffectType = 1, delay: number = 1000) {
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
}

/**
 * 缩放特效类型
 */
enum ScalingEffectType {
    enlarge, enlargeAndFade,
    narrow
}