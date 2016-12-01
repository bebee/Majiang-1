/**
 * MissingEffect
 * @Author Ace.c
 * @Create 2016-12-01 13:58
 */
class MissingEffect {

    private static select: MissingSelect;

    static play() {
        if (!this.select) {
            this.select = new MissingSelect();
        }
        this.select.show();
    }
}