/**
 * GradientEffect
 * @Author Ace.c
 * @Create 2016-11-19 14:33
 */
class GradientEffect extends BaseEffect {

    public fadeIn(display, delay = 1000) {
        egret.Tween.get(display).to({alpha: 1}, delay).call(this.complete, this);
        return this;
    }

    public fadeOut(display, delay = 1000) {
        egret.Tween.get(display).to({alpha: 0}, delay).call(this.complete, this);
        return this;
    }
}