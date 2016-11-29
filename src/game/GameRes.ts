/**
 * Created by Administrator on 2016/10/29.
 */
class GameRes{

    static uiSheet:SpriteSheet;

    static cardSheet:SpriteSheet;

    static getUI(name:string){

        // GameRes.uiSheet || (GameRes.uiSheet = RES.getRes("gameui_json"));
        //
        // return GameRes.uiSheet.getTexture(name) ;
        return RES.getRes(name);
    }

    static getCard(name:string){

        // GameRes.cardSheet || (GameRes.cardSheet = RES.getRes("card"));
        //
        // return GameRes.cardSheet.getTexture(name) ;

        return RES.getRes(name);
    }

    static createCenterButton(ancX:number,ancY:number,x:number,y:number,res:string,text:string = "",textSize:number = 24, tx:number = 0, ty:number = 0){

        var con:egret.DisplayObjectContainer = new egret.DisplayObjectContainer;
        con.anchorOffsetX = ancX;
        con.anchorOffsetY= ancY;
        var button:mui.EButton = new mui.EButton(res,text,textSize);
        button.x = x;
        button.y = y;
        button.textField.horizontalCenter = tx;
        button.textField.verticalCenter = ty;
        con.addChild(button);
        return con;
    }

}