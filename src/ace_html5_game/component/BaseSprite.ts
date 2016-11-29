/**
 * BaseSprite
 * @Author Ace.c
 * @Create 2016-09-05 15:43
 */
class BaseSprite extends eui.Component {

    public id:any;
    public data: any;
    public initComplete: boolean = false;

    public constructor() {
        super();
    }

    public childrenCreated(): void {
        super.childrenCreated();

        this.initComplete = true;
    }

    public show(): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
    }

    /**
     * 设置皮肤状态
     */
    public set skinState(value: string) {
        this.currentState = value;
        this.invalidateState();
    }
}