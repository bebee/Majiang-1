class RankUI extends eui.Component {
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);

        this.skinName = "RankSkin";

        this.touchChildren = true;
    }

    onComplete() {

    }

    createChildren() {
        super.createChildren();
    }
}