/**
 * Created by Administrator on 2016/10/29.
 */
class GameRes{

    static uiSheet:SpriteSheet;

    static cardSheet:SpriteSheet;

    static getUI(name:string){

        GameRes.uiSheet || (GameRes.uiSheet = RES.getRes("gameui_json"));

        return GameRes.uiSheet.getTexture(name) ;

    }

    static getCard(name:string){

        GameRes.cardSheet || (GameRes.cardSheet = RES.getRes("card"));

        return GameRes.cardSheet.getTexture(name) ;

    }

    static createCenterButton(ancX:number,ancY:number,x:number,y:number,res:string,text:string = "",textSize:number = 24, tx:number = 0, ty:number = 0){

        var con:egret.DisplayObjectContainer = new egret.DisplayObjectContainer;
        con.anchorOffsetX = ancX;
        con.anchorOffsetY= ancY;
        var button:mui.EButton = new mui.EButton(res,text,textSize);
        button.x = x;
        button.y = y;
        if(text!="") {
            button.textField.horizontalCenter = tx;
            button.textField.verticalCenter = ty;
        }
        con.addChild(button);
        return con;
    }

    static createCenterBitmap(res:string){

        var bitmap : egret.Bitmap = new egret.Bitmap(GameRes.getUI(res));
        bitmap.anchorOffsetX = bitmap.width >> 1;
        bitmap.anchorOffsetY = bitmap.height >> 1;
        return bitmap;
    }

}