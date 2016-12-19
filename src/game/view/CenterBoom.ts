/**
 * Created by Administrator on 2016/11/5.
 */
class CenterBoom extends egret.DisplayObjectContainer{

    bg:egret.Bitmap;
    arrow:egret.Bitmap;
    leftView:egret.DisplayObjectContainer;
    rightView:egret.DisplayObjectContainer;

    leftCountText:egret.TextField;
    roundCountText:egret.TextField;

    timeEffect:TimeEffectView;


    constructor(){
        super();
        this.initView();
    }
    initView(){

        this.bg = new egret.Bitmap;
        this.bg.texture = GameRes.getUI("game_bg_time");
        this.bg.anchorOffsetX = this.bg.width >> 1;
        this.bg.anchorOffsetY = this.bg.height >> 1;

        this.addChild(this.bg);

        this.arrow = new egret.Bitmap;
        this.arrow.texture = GameRes.getUI("game_hl_time");

        this.arrow.anchorOffsetX = -18;
        this.arrow.anchorOffsetY = 37;
        this.addChild(this.arrow);
        //左
        this.leftView = new egret.DisplayObjectContainer;

        this.leftView.x = -97;
        this.leftView.y = -10;
        var left_bg = new egret.Bitmap;
        left_bg.texture = GameRes.getUI("bg_001");
        var left_text = new egret.TextField();
        left_text.text = "张";
        left_text.x = 28;
        left_text.size = 22;
        this.leftView.addChild(left_bg);
        this.leftView.addChild(left_text);
        //右
        this.rightView = new egret.DisplayObjectContainer;

        this.rightView.x = 50;
        this.rightView.y = -10;
        var right_bg = new egret.Bitmap;
        right_bg.texture = GameRes.getUI("bg_001");
        right_bg.width *= 2;
        var right_text = new egret.TextField();
        right_text.text = "局";
        right_text.size = 22;
        right_text.x = 50;
        this.rightView.addChild(right_bg);
        this.rightView.addChild(right_text);

        this.leftCountText = new egret.TextField();
        this.leftCountText.x = 2;
        this.leftCountText.y = 3;
        this.leftCountText.text = "99";
        this.leftCountText.size = 18;
        this.leftView.addChild(this.leftCountText);

        this.roundCountText = new egret.TextField();
        this.roundCountText.x = 24;
        this.roundCountText.y = 3;
        this.roundCountText.width = 50;
        this.roundCountText.text = "00/00";
        this.roundCountText.size = 18;
        this.roundCountText.textAlign = "center";
        this.roundCountText.anchorOffsetX = 50 >> 1;
        this.rightView.addChild(this.roundCountText);

        this.addChild(this.leftView);
        this.addChild(this.rightView);


        this.visibleArrow(false);

        egret.Tween.get(this.arrow,{loop:true}).to({alpha:0},300).to({alpha:1},300);

        this.timeEffect = new TimeEffectView(this.shakeCallback);

        GSUpdate.i.addUpdate(this.timeEffect);

        this.addChild(this.timeEffect.view);

    }

    //震动回调
    shakeCallback(){
        Global.phoneVibrate(2000);  //让手机震动

        console.log("----shake----");
    }


    updateLeftCount(left:number){

        this.leftCountText.text = ""+left;

    }
    updateRoundCount(){
        // var a = ((roomRoundCur - 1) /4^0) + 1;
        // var b = roomRoundMax /4 ^ 0;
        // if(a > b) a = b;
        // this.roundCountText.text = a +"/"+ b;
        console.log("==============================");
        console.log(game.roomRoundCur, game.roomRoundMax);
        this.roundCountText.text = game.roomRoundCur +"/"+ game.roomRoundMax;
    }


    //设置箭头方向
    setArrowDir(dir:number){

        if(dir == 0) {
            this.visibleArrow(false);
            return;
        }

        this.visibleArrow(true);

        switch(dir){
            case 1:
                this.arrow.rotation = 90;
                break;
            case 2:
                this.arrow.rotation = 0;
                break;
            case 3:
                this.arrow.rotation = -90;
                break;
            case 4:
                this.arrow.rotation = 180;
                break;
        }
    }
    visibleArrow(bool:boolean){
        this.arrow.visible = bool;
    }

    reset(){
        this.timeEffect.reset()
    }
}