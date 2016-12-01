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

    /*显示类型 标准/精致
     * */
    static setViewType(type:number){
        if(type == 1) {
            GSConfig.posRulePlus[1] = GSConfig.posRule[1];
            GSConfig.handPosPlus[1] = GSConfig.handPos[1];
        }else{
            GSConfig.posRulePlus[1] = GSConfig.posRule[5];
            GSConfig.handPosPlus[1] = GSConfig.handPos[5];
        }

        GSController.i.updateHandViewSize();

    }
}