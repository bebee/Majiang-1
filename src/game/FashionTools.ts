/**
 * Created by Administrator on 2016/11/26.
 */
class FashionTools{

    //自动出牌
    static autoPush()
    {

       /* if(GSConfig.auto) {

            var pai = GSData.i.getCatchPai(1);

            SocketManager.getInstance().getGameConn().send(4, {"args": pai});
        }*/
    }
    //自动过
    static autoPass(){

       /* if(GSConfig.auto) {

            SocketManager.getInstance().getGameConn().send(15, {"args": {"action": 0, "pai": []}});

            GSController.i.hideFuncSelectMenu();


            var pais = GSData.i.getHandPais(1);

            if(pais){

                if(GSConfig.handLens[pais.length]) {

                    FashionTools.autoPush();
                }
            }

        }*/
    }
}