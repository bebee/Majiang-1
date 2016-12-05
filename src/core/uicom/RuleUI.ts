class RuleUI extends eui.Component {
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);

        this.skinName = "RuleSkin";

        this.touchChildren = true;
    }

    public _group: eui.Group;

    public _scroller: eui.Scroller;

    onComplete() {

    }

    createChildren() {
        super.createChildren();
    }
}