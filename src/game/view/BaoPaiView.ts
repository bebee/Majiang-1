/**
 * Created by Administrator on 2016/11/12.
 */
class BaoPaiView extends egret.DisplayObjectContainer{

    constructor(){
        super();
        this.initView();
    }

    bg:egret.Bitmap;

    baoText:egret.Bitmap;

    cardView:CardView;

    initView(){

        this.bg = new egret.Bitmap(GameRes.getUI("game_bao_bg"));

        this.baoText = new egret.Bitmap(GameRes.getUI("game_baopai"));

        this.bg.anchorOffsetX = this.bg.width >> 1;
        this.bg.anchorOffsetY= this.bg.height >> 1;

        this.baoText.anchorOffsetX = this.baoText.width >> 1;
        this.baoText.anchorOffsetY = this.baoText.height >> 1;

        this.baoText.y = 35;

        this.addChild(this.bg);

        this.addChild(this.baoText);

        this.cardView = CardView.create(1,3,null);

        this.cardView.posView(0,-12);
        this.cardView.scaleX = this.cardView.scaleY = .75;
        this.addChild(this.cardView);

    }
    updatePai(pai:any){

        if(pai == null){

            this.cardView.visible = false;
        }else{

            this.cardView.visible = true;
        }

        this.cardView.changePai(pai);
    }


}