/**
 * Created by Administrator on 2016/11/8.
 */
//结算界面
class GSResultView extends egret.DisplayObjectContainer{
    po = [144,244,340,440];
    bg:egret.Shape;
    shareButton:mui.EButton;
    continueButton:mui.EButton;
    face : IGameTapEvent;

    //胜利失败的logo容器
    logoCon:egret.DisplayObjectContainer;

    winTop:egret.Bitmap;
    winBG:egret.Bitmap;
    loseTop:egret.Bitmap;
    loseBG:egret.Bitmap;
    liujuTop:egret.Bitmap;

    drawShape:egret.Shape;

    personItems : PersonItem[];

    baoPaiView:BaoPaiView;

    constructor(){
        super();
        this.initView();
    }
    //绑定回调接口
    bindInterface(face:IGameTapEvent){

        this.face = face;

    }
    initView(){
        this.bg = new egret.Shape;
        this.bg.graphics.beginFill(0,.3);
        this.bg.graphics.drawRect(0,0,GSConfig.width,450);
        this.bg.y = (GSConfig.height - 450) >> 1;
        this.addChild(this.bg);
        //230.327,425
        this.createLine(230);
        this.createLine(327);
        this.createLine(425);

        this.createLogCon(GSConfig.width >>1,76);


        this.shareButton = new mui.EButton("JS_share_button","分　享");
        this.shareButton.x = 220;
        this.shareButton.y = 550;
        this.shareButton.textField.verticalCenter = -8;

        this.continueButton = new mui.EButton("JS_continue_button","继续游戏");
        this.continueButton.x = 585;
        this.continueButton.y = 550;
        this.continueButton.textField.verticalCenter = -8;

        this.addChild(this.shareButton);
        this.addChild(this.continueButton);

        this.shareButton.addEventListener(egret.TouchEvent.TOUCH_TAP,_=>{this.face.onShareGame();},this);
        this.continueButton.addEventListener(egret.TouchEvent.TOUCH_TAP,_=>{this.face.onContinue();},this);

        //this.showLogo(1);

        //组牌

        this.personItems = [];

        for(var i:number= 0;i<4;i++){

            var personItem = new PersonItem();

            personItem.y = this.po[i];

            this.addChild(personItem);

            this.personItems.push(personItem);

        }
        this.baoPaiView = new BaoPaiView;
        this.baoPaiView.x = 910;
        this.baoPaiView.y = 167;
        this.addChild(this.baoPaiView);
    }

    updateBaoPai(pai:any){

        this.baoPaiView.updatePai(pai);
    }


    update(){

        this.showLogo(GSData.i.resultType);

        var persons = GSData.i.result.person;

        var pai = GSData.i.result.hupai.pai;

        for(var i:number = 0;i < persons.length;i++){

            var person = persons[i];

            var personItem:PersonItem = this.personItems[i];

            var person_pos = person.pos;

            var dir:number = GSData.i.getDir(person_pos);

            personItem.headIcon.setHeadPic(person.pic);

            personItem.headIcon.visibleRoomOwn((GSData.i.roomOwnFlag >> dir & 1) == 1);

            personItem.headIcon.visibleZhuang(GSData.i.result.zhuang == person_pos);

            if(GSData.i.result.hupaiPos == person_pos){

                personItem.updateHuLogo(1);
/*

                if(!GSData.i.result.dianPaoPos){

                    for(var k:number = 0 ;k < person.left.length;k++){

                        if(person.left[k].number == pai.number && person.left[k].type == pai.type)
                        {
                            person.left.splice(k,1);

                            break;
                        }
                    }
                    person.left.push(pai);
                }
*/

                personItem.updatePai(person);

                //personItem.addHuPai(pai);

            }else if(GSData.i.result.dianPaoPos == person_pos){

                personItem.updatePai(person);

                personItem.updateHuLogo(2);
            }else{

                personItem.updatePai(person);

                personItem.updateHuLogo(0);
            }
        }
    }


    createLogCon(x:number,y:number){

        this.logoCon = new egret.DisplayObjectContainer();
        this.logoCon.x = x;
        this.logoCon.y = y;

        this.winTop = new egret.Bitmap(GameRes.getUI("JS_win"));
        this.winBG = new egret.Bitmap(GameRes.getUI("JS_win_bg"));
        this.loseTop = new egret.Bitmap(GameRes.getUI("JS_lose"));
        this.loseBG = new egret.Bitmap(GameRes.getUI("JS_lose_bg"));
        this.liujuTop = new egret.Bitmap(GameRes.getUI("JS_liuju"));

        this.winTop.anchorOffsetX = 142;
        this.winTop.anchorOffsetY = 40;

        this.winBG.anchorOffsetX = 216;
        this.winBG.anchorOffsetY =220;

        this.loseTop.anchorOffsetX =142;
        this.loseTop.anchorOffsetY =60;

        this.loseBG.anchorOffsetX = 215;
        this.loseBG.anchorOffsetY = 224;

        this.liujuTop.anchorOffsetX = 146;
        this.liujuTop.anchorOffsetY = 58;

        this.logoCon.addChild(this.winBG);
        this.logoCon.addChild(this.loseBG);
        this.logoCon.addChild(this.winTop);
        this.logoCon.addChild(this.loseTop);
        this.logoCon.addChild(this.liujuTop);
        this.addChild(this.logoCon);
        //this.drawLine(this.logoCon);

    }

    drawLine(obj:any){
        this.drawShape.graphics.lineStyle(2,0xFF0000);
        this.drawShape.graphics.drawRect(obj.x,obj.y,obj.width,obj.height);
    }


    createLine(y:number){

        var line:egret.Bitmap =new  egret.Bitmap;
        line.texture = GameRes.getUI("JS_dot");
        line.width = GSConfig.width;
        line.y = y;
        this.addChild(line);

    }

    showLogo(type:number){

        switch(type){
            case 1://胜利
                this.winTop.visible = true;
                this.winBG.visible = true;
                this.loseTop.visible = false;
                this.loseBG.visible = false;
                this.liujuTop.visible = false;
                GameSound.PlaySound("sound_win");
                break;
            case 2://失败
                this.winTop.visible = false;
                this.winBG.visible = false;
                this.loseTop.visible = true;
                this.loseBG.visible = true;
                this.liujuTop.visible = false;
                GameSound.PlaySound("sound_lost");
                break;
            case 3://流局
                this.winTop.visible = false;
                this.winBG.visible = false;
                this.loseTop.visible = false;
                this.loseBG.visible = true;
                this.liujuTop.visible = true;
                GameSound.PlaySound("sound_huang");
                break;
        }
    }
    clear(){

        for(var i:number = 0;i<this.personItems.length;i++){

            var personItem:PersonItem = this.personItems[i];

            personItem.clear();
        }
    }
}