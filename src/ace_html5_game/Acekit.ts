/**
 * Acekit
 * @Author Ace.c
 * @Create 2016-11-29 11:25
 */
class Acekit extends BaseDispatcher {

    private static _i: Acekit;

    static get i(): Acekit {
        !this._i && (this._i = new Acekit());

        return this._i;
    }

    public constructor() {
        super();
    }

    public stage: egret.Stage;

    public init(stage) {
        this.stage = stage;
    }

    public get width() {
        return this.stage ? this.stage.stageWidth : 0;
    }

    public get height() {
        return this.stage ? this.stage.stageHeight : 0;
    }

    public contains(display): boolean {
        return this.stage && this.stage.contains(display);
    }

    public addChild(display) {
        this.stage && this.stage.addChild(display);
    }

    public removeChild(display) {
        this.contains(display) && this.stage.removeChild(display);
    }
}