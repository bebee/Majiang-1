/**
 * ResultItemView
 * @Author Ace.c
 * @Create 2016-12-10 19:04
 */
class ResultItemView extends GameSprite {

    private headGroup: eui.Group;
    private lab_nick: eui.Label;
    private lab_description: eui.Label;
    private paiGroup: eui.Group;
    private lab_fan: eui.Label;
    private lab_hu: eui.Label;
    private lab_gang: eui.Label;

    constructor() {
        super();

        this.skinName = "ResultItemViewSkin";
    }

    childrenCreated() {
        super.childrenCreated();
    }
}