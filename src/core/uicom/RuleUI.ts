class RuleUI extends eui.Component {

    private btn_xueliu: eui.Button;
    private btn_xuezhan: eui.Button;
    scroller: eui.Scroller;
    group: eui.Group;

    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);

        this.skinName = "RuleSkin";

        this.touchChildren = true;
    }

    onComplete() {

    }

    createChildren() {
        super.createChildren();
    }
}