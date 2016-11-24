/**
 * Created by Administrator on 2016/11/22.
 */
class FuncEffectView extends egret.DisplayObjectContainer{

    back:egret.Bitmap;
    top:egret.Bitmap;

    constructor(){
        super();
        this.initView();
    }
    initView(){

        this.back = new egret.Bitmap;
        this.top = new egret.Bitmap;

        this.addChild(this.back);
        this.addChild(this.top);

        this.back.visible = this.top.visible = false;

    }
    reset(){
        this.back.visible = false;
        this.back.scaleX = this.back.scaleY = 1;
        this.top.visible = false;
        this.top.scaleX = this.top.scaleY = 1;
        this.top.alpha = 1;
    }
    play(texture:any,dispear:boolean = true){


        this.back.texture = texture;
        this.top.texture = texture;

        this.back.anchorOffsetX = this.top.anchorOffsetX = this.back.width >> 1;
        this.back.anchorOffsetY = this.top.anchorOffsetY = this.back.height >> 1;


        this.back.visible = true;
        this.back.scaleX = this.back.scaleY = 3;
        egret.Tween.get(this.back).to({scaleX:1,scaleY:1},300,egret.Ease.backIn).call(_=>{
            this.top.visible = true;
            egret.Tween.get(this.top).to({scaleX:3,scaleY:3,alpha:0},500).call(_=>{if(dispear) this.reset();},this);
        },this);
    }

}