import SpriteSheet = egret.SpriteSheet;
/**
 * Created by Administrator on 2016/10/21.
 */


class Card implements IShow{




    static game:IGame;

    static bindGame(game:IGame){

        Card.game = game;

    }



    //获取方位对象
    static getDirObj(dir:number){

        //return Card.posRule[dir];

    }
    //通过 方位，状态 ，获取信息对象
    /*static getRule(dir:number,state:number):Rule{

        //return Card.posRule[dir][state];

    }*/

    static pool:Card[] = [];

    static sheet:SpriteSheet;

    static getCard(){

           if(Card.pool.length){

                return Card.pool.shift();
           }

        return new Card();
    }

    static returnCard(card:Card){

        card.reset();

        Card.pool.push(card);
    }

    //dir : 方位 自己开始逆时针 0,1,2,3
    //state: 状态 0:背面 1:正面 2:明牌 3:池中牌

    static create(dir:number = 0,state:number = 0,style:string = "") {

        if (!Card.sheet) Card.sheet = RES.getRes("card");

        //更改成对象池
        var card = Card.getCard();

        card.dir = dir;
        card.state = state;
        card.style = style;
        card.reDraw();

        return card;

    }
    //被选中的
    static focusCard:Card;


    id:number;

    view:CardView;

    dir:number;
    state:number;

    style:string;

    bg_res:string;
    up_res:string;

    pRule:Rule;

    up_visible : boolean;

    hSpacing:number;
    vSpacing:number;

    pos:egret.Point = new egret.Point;

    //激活
    activate:boolean;

    constructor(){

        this.reset();

        //this.view = new CardView(this);

        this.view.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);

    }


    activateTouch(bool:boolean){

        this.view.touchEnabled = bool;
    }

    onTouchTap(){

        if(this.activate) {

            Card.game.onClickCard(this);
        }
    }


    posView(x:number,y:number){
        this.pos.x = x;
        this.pos.y = y;
        this.viewByPos();
    }

    //移出
    moveUp(){

        this.upView(this.pos.x,this.pos.y - 20);

    }
    viewByPos(){

        this.upView(this.pos.x,this.pos.y);
    }

    upView(x:number,y:number){
        this.view.x = x;
        this.view.y = y;
    }


    //改变状态
    changeState(state:number){

        if(state == this.state) return;

        this.state = state;

        this.reDraw();

    }

    reDraw(){

        var pdir = this.dir == 3 ? 1 : this.dir;
        var pstate = this.state == 3 ? 2 : this.state;

        this.bg_res = `M_${pdir}_${pstate}`;

        this.up_res = 'W_7';

        //var pObj:any = Card.getDirObj(this.dir);

        //this.pRule = Card.getRule(this.dir,this.state);


        this.hSpacing = this.pRule.spacH;
        this.vSpacing = this.pRule.spacV;


        this.up_visible = this.pRule.showTop;

        this.view.reDraw();


    }

    hide() {

        this.view.visible = false;

    }

    show() {

        this.view.visible = true;

        this.moveUp();

        egret.Tween.get(this.view).to({y:this.pos.y},100).call(this.activated,this);

    }

    //抓牌
    catch(){

        this.upView(this.pos.x + 50 , this.pos.y - 100);

        this.view.rotation = 90;

        egret.Tween.get(this.view).to({rotation:0,x:this.pos.x,y:this.pos.y},200).call(this.activated,this);

    }

    activated(){

        this.activate = true;

    }


    reset(){

        if(this.view) {
            this.view.anchorOffsetX = this.view.anchorOffsetY = 0;
            this.view.scaleX = this.view.scaleY = 1;
            egret.Tween.removeTweens(this.view);
        }

        this.up_visible = false;

        this.activate = false;

    }

}