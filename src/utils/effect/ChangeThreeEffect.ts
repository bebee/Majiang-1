/**
 * 换三张类型
 */
enum ChangeThreeType {
    select,
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
    private static select: ChangeThreeSelect;
    private static animation: ChangeThreeAnimation;

    static play(type: ChangeThreeType) {
        switch (type) {
            case ChangeThreeType.select:
                if (!this.select) {
                    this.select = new ChangeThreeSelect();
                }
                this.select.show();
                break;
            default:
                if (!this.animation) {
                    this.animation = new ChangeThreeAnimation();
                }
                this.animation.setType(type);
                this.animation.show();
                break;
        }
    }

    static stop() {
        this.animation && this.animation.hide();
    }
}