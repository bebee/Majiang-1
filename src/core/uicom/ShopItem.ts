class ShopItem extends eui.Component
{
    private data:any;

    public constructor(some:any)
    {
        super();

        this.skinName = "ShopItemSkin";

        this.touchChildren = true;

        this.data = some;

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
    }

    //private _eff:eui.Image;

    private _labels:eui.Label;

    private _icon:eui.Image;

    onComplete()
    {

    }

    createChildren()
    {
        super.createChildren();


        if(!this.data) return;

        this._icon.source = this.data["icon"];
        this._labels.text = "￥ " + this.data["rmb"];

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    private onClick():void
    {
       
    }

    public PlayStopEff(p:boolean = true):void
    {
        // if(p)
        // {
        //     this.addEventListener(egret.Event.ENTER_FRAME, this.onEff, this);
        // }
        // else
        // {
        //     this.removeEventListener(egret.Event.ENTER_FRAME, this.onEff, this);
        //
        //     this._eff.rotation = 0;
        // }

    }

    private onEff(e:egret.Event):void
    {
        //this._eff.rotation += 2;
    }
}
