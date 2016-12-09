/**
 * BaseSprite
 * @Author Ace.c
 * @Create 2016-09-05 15:43
 */
class BaseSprite extends eui.Component {

    id: any;
    data: any;
    initComplete: boolean = false;

    constructor() {
        super();
    }

    childrenCreated(): void {
        super.childrenCreated();

        this.initComplete = true;
    }

    show(): void {
        this.visible = true;
    }

    hide(): void {
        this.visible = false;
    }

    /**
     * 设置皮肤状态
     * @param value
     */
    set skinState(value: string) {
        this.currentState = value;
        this.invalidateState();
    }
}