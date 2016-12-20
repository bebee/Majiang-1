/**
 * 登陆请求
 */
class _1 {
    public writeData(obj: any) {
        if (!obj) {
            if (game.user) {
                obj = {
                    "channel": "test",
                    "openid": "" + game.user,
                    "openkey": "123456788",
                    "nick": "" + game.user,
                    "pic": "" + game.player.pic,
                    "sex": "0"
                };
            }
            else {
                obj = {
                    "channel": "" + Universal.platformType(),
                    "length": gameConfig.code.length,
                    "code": gameConfig.code
                };
            }
        }

        return JSON.stringify(obj);
    }
}