/**
 * Acekit
 * @Author Ace.c
 * @Create 2016-11-29 11:25
 */
class acekit {

    static stage: egret.Stage;

    static init(stage) {
        this.stage = stage;
    }

    static get width() {
        return this.stage ? this.stage.stageWidth : 0;
    }

    static get height() {
        return this.stage ? this.stage.stageHeight : 0;
    }

    static contains(display): boolean {
        return this.stage && this.stage.contains(display);
    }

    static addChild(display) {
        this.stage && this.stage.addChild(display);
    }

    static removeChild(display) {
        this.contains(display) && this.stage.removeChild(display);
    }
}