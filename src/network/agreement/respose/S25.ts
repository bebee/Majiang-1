/**
 * 广播消息
 */
class S25 {
    public parseData(obj: any) {

        //console.log("25 广播消息", obj);

        if (obj.data.message) {
            var some = obj.data.message;
            var type: number = +some.type;

            switch (type) {
                case 1:  //同步聊天
                    var chat = some.chat;
                    var clickey: number = +chat.id;
                    var sex: number = +chat.sex;
                    Global.showPao(chat);
                    GameSound.PlaySound("chat_" + sex + "_" + clickey);
                    break;
                case 2:     //语音聊天
                    var voice = some.voice;
                    var serverid = voice.id;
                    Weixin.downloadVoice(serverid);
                    break;
                case 3: //牌局开始判断
                    //
                    GSDataProxy.i.S2C_RoundReadyAll();

                    break;
                case 4:  //聊天表情
                    Global.showExpression(some.expression);
                    break;
            }
        }
    }
}