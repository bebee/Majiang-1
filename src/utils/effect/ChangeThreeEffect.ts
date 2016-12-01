/**
 * 换三张类型
 */
enum ChangeThreeType {
    anti_clockwise,
    clockwise,
    other
}

/**
 * ChangeThreeEffect
 * @Author Ace.c
 * @Create 2016-11-30 16:19
 */
class ChangeThreeEffect {
    private static animation: ChangeThreeAnimation;

    static play(type: ChangeThreeType) {

        if (!this.animation) {
            this.animation = new ChangeThreeAnimation();
        }

        this.animation.setType(type);
        this.animation.show();
    }

    static stop() {
        this.animation && this.animation.hide();
    }
}