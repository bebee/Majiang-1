/**
 * Created by Administrator on 2016/11/12.
 */
class GSHeadIcon extends egret.DisplayObjectContainer{

    constructor(){
        super();
        this.initView();
    }
    headIcon:egret.DisplayObjectContainer;

    nullImg:egret.Bitmap;

    headImg:eui.Image;

    offlineImg:egret.Bitmap;

    headIconMask:egret.Shape;

    head_kuang:egret.Bitmap;

    //房主
    roomOwn_kuang:egret.Bitmap;
    //庄家
    zhuangIcon:egret.Bitmap;

    killIcon:egret.Bitmap;




    pic:string;

    iconTexture:egret.Texture;

    initView(){
        this.headIcon = new egret.DisplayObjectContainer;

        this.nullImg = new egret.Bitmap(GameRes.getUI('game_head_null'));
        this.nullImg.anchorOffsetX = this.nullImg.width >> 1;
        this.nullImg.anchorOffsetY = (this.nullImg.height >> 1) + 1;

        this.headImg = new eui.Image();
        this.headImg.width = 100;
        this.headImg.height = 100;
        this.headImg.anchorOffsetX = 50;
        this.headImg.anchorOffsetY = 50;
        this.headImg.scaleX = this.headImg.scaleY = .78;

        this.offlineImg = new egret.Bitmap(GameRes.getUI("game_head_lixian"));
        this.offlineImg.anchorOffsetX = (this.offlineImg.width >> 1)+1;
        this.offlineImg.anchorOffsetY = this.offlineImg.height >> 1;

        this.headIcon.addChild(this.nullImg);
        this.headIcon.addChild(this.headImg);
        this.headIcon.addChild(this.offlineImg);

        this.headIconMask = new egret.Shape;
        this.headIconMask.graphics.beginFill(0);
        this.headIconMask.graphics.drawRoundRect(0,0,72,72,30,30);
        this.headIconMask.anchorOffsetX = this.headIconMask.anchorOffsetY = 36;

        this.headIcon.mask = this.headIconMask;

        this.head_kuang = new egret.Bitmap(RES.getRes("head_kuang_bg"));
        this.head_kuang.anchorOffsetX = (this.head_kuang.width >> 1) + 1.5;
        this.head_kuang.anchorOffsetY = (this.head_kuang.height >> 1)+0.5;

        this.roomOwn_kuang = new egret.Bitmap(GameRes.getUI('game_head_room'));
        this.roomOwn_kuang.anchorOffsetX = (this.roomOwn_kuang.width >> 1) - 3.5;
        this.roomOwn_kuang.anchorOffsetY = (this.roomOwn_kuang.height >> 1) + 3.5;

        this.zhuangIcon = new egret.Bitmap(GameRes.getUI("game_zhuang"));
        this.zhuangIcon.anchorOffsetX = this.zhuangIcon.width >> 1 + 1;
        this.zhuangIcon.anchorOffsetY = this.zhuangIcon.height >> 1;
        this.zhuangIcon.x = -40;
        this.zhuangIcon.y = -40;


        this.killIcon = new egret.Bitmap(GameRes.getUI("JS_close"));


        this.killIcon.anchorOffsetX = this.killIcon.width >> 1;
        this.killIcon.anchorOffsetY = this.killIcon.height >> 1;
        this.killIcon.scaleX = this.killIcon.scaleY = .9;
        this.killIcon.x = 38;
        this.killIcon.y = -38;



        this.addChild(this.headIcon);
        this.addChild(this.headIconMask);
        this.addChild(this.head_kuang);
        this.addChild(this.roomOwn_kuang);
        this.addChild(this.zhuangIcon);
        this.addChild(this.killIcon);

        this.nullIcon();

        this.killIcon.visible = false;

    }
    nullIcon(){
        this.offlineImg.visible = false;
        this.zhuangIcon.visible = false;
        this.roomOwn_kuang.visible = false;
        this.iconTexture = null;
        this.pic = "";
        this.headImg.source = "";
        this.killIcon.visible = false;
    }

    setHeadPic(pic:string){

        if(this.pic != pic){

            this.pic = pic;

            this.setHeadImg(null);

            RES.getResByUrl(this.pic,(t)=>{

                if(t){
                    this.iconTexture = t;
                    this.setHeadImg(t);
                }
            },this,RES.ResourceItem.TYPE_IMAGE);

        }else{
            this.setHeadImg(this.iconTexture);
        }
    }
    setHeadImg(source: string | egret.Texture){

        this.headImg.source = source;
    }

    visibleRoomOwn(boo:boolean){
        this.roomOwn_kuang.visible = boo;

    }
    visibleZhuang(boo:boolean){
        this.zhuangIcon.visible = boo;

    }

    reset(){

        this.offlineImg.visible = false;
        //this.resize();

    }

}