/**
 * BaseEffect
 * @Author Ace.c
 * @Create 2016-11-19 14:39
 */
class BaseEffect {

    private callback: Function = null;

    public call(callback: Function) {
        this.callback = callback;
    }

    public complete() {
        this.callback && this.callback();
    }
}