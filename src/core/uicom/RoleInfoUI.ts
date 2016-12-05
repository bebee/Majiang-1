class RoleInfoUI extends eui.Component {
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);

        this.skinName = "RoleInfoSkin";

        this.touchChildren = true;
    }

    public _name: eui.Label;

    public _id: eui.Label;

    public _ip: eui.Label;

    public _rate: eui.Label;

    onComplete() {

    }

    createChildren() {
        super.createChildren();
    }
}