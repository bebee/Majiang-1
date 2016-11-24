
/**
 * Created by Administrator on 2016/10/25.
 */
class Test implements IGame{

    container;

    constructor(container:egret.DisplayObjectContainer){

        this.container = container;

        this.container.addEventListener(egret.Event.ENTER_FRAME,this.update,this);

        this.lastTime = egret.getTimer();

        Card.bindGame(this);

        this.test();
    }

    //起始位，抓牌位间隔
    gPos = {    0:{x:35,y:600,zspc:10},
                1:{x:847,y:441,zspc:10},
                2:{x:744,y:57,zspc:10},
                3:{x:95,y:136,zspc:10}};
    //抓牌位置
    zPos = {    0:{x:0,y:600},
                1:{x:847,y:0},
                2:{x:0,y:57},
                3:{x:95,y:0}
    };


    cards_0:Card[] = [];
    cards_1:Card[] = [];
    cards_2:Card[] = [];
    cards_3:Card[] = [];


    lastTime:number;

    animations:IAnimation[] = [];

    update(){

        var advanceTime : number = egret.getTimer() - this.lastTime;

        if(this.animations.length > 0) {

            for (var i:number = 0; i < this.animations.length; i++) {

                var animation = this.animations[i];

                animation.update(advanceTime);

                if(animation.completed) {

                    this.animations.splice(i,1);

                    i--;
                }

            }
        }

        this.lastTime = egret.getTimer();
    }


    test(){

        var sp = new egret.Shape();
        sp.graphics.beginFill(0x00aaFF);
        sp.graphics.drawRect(0,0,960,640);
        this.container.addChild(sp);

        //35,600
        //0面
        //3明牌，3背面 ，7正面 ,1正面 ,12 池牌 (8个换行)


        this.initPosCards(0,13);
        this.initPosCards(1,13);
        this.initPosCards(2,13);
        this.initPosCards(3,13);


/*        this.animations.push(new ShowAnimation(this.cards_0));
        this.animations.push(new ShowAnimation(this.cards_1));
        this.animations.push(new ShowAnimation(this.cards_2));
        this.animations.push(new ShowAnimation(this.cards_3));*/

        this.catchCard(0);

    }

    catchCard(dir:number){

        switch(dir) {

            case 0:
                var card:Card = Card.create(dir, 1);

                var zpos = this.zPos[dir];

                card.posView(zpos.x, zpos.y);

                card.activateTouch(true);

                this.container.addChild(card.view);

                this.cards_0.push(card);

                card.catch();

                break;
        }
    }

    //初始定位
    initPosCards(dir:number,len:number = 14){

        var pos = this.gPos[dir];

        var i : number;

        var dis:number;

        var depth:number;

        switch(dir){

            case 0:

                for( i = 0; i < 13; i++){

                    var card:Card = Card.create(dir,1);

                    dis = pos.x + card.hSpacing * i;

                    card.posView(dis,pos.y);

                    card.activateTouch(true);

                    this.container.addChild(card.view);

                    this.cards_0.push(card);

                }

                this.zPos[dir].x = pos.x + card.hSpacing * i + pos.zspc;


                break;

            case 1:

                depth = this.container.numChildren;

                for( i = 0; i < 13; i++){

                    var card:Card = Card.create(dir,1);

                    dis = pos.y - card.hSpacing * i;

                    card.posView(pos.x,dis);

                    this.container.addChildAt(card.view,depth);

                    this.cards_1.push(card);

                }

                this.zPos[dir].y = pos.y - card.hSpacing * i + pos.zspc;

                break;
            case 2:

                //depth = this.container.numChildren;

                for( i = 0; i < 13; i++){

                    var card:Card = Card.create(dir,1);

                    dis = pos.x - card.hSpacing * i;

                    card.posView(dis,pos.y);

                    this.container.addChild(card.view);
                    this.cards_2.push(card);
                }

                this.zPos[dir].x = pos.x - card.hSpacing * i + pos.zspc;

                break;

            case 3:

                for( i = 0; i < 13; i++){

                    var card:Card = Card.create(dir,1);

                    dis = pos.y + card.hSpacing * i;

                    card.posView(pos.x,dis);

                    this.container.addChild(card.view);

                    this.cards_3.push(card);
                }

                this.zPos[dir].y = pos.y + card.hSpacing * i + pos.zspc;

                break;


        }

    }

    roundMe:boolean = true;

    onClickCard(card:Card) {

        if(Card.focusCard == null){


            card.moveUp();

            Card.focusCard = card;

        }else{

            if(Card.focusCard == card && this.roundMe){

                //出牌
                console.log("出牌");

                Card.focusCard = null;

                //this.roundMe = false;

                return;
            }


            Card.focusCard.viewByPos();

            if(Card.focusCard == card){

                Card.focusCard = null;

                return;
            };
            card.moveUp();
            Card.focusCard = card;

        }
    }
}