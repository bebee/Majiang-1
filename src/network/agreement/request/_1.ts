/**
 * 登陆请求
 */
class _1 {
    public writeData(obj: any) {
        if (!obj) {
            if (gameConfig.users) {
                obj = {
                    "channel": "test",
                    "openid": "" + gameConfig.users,
                    "openkey": "123456788",
                    "nick": "" + gameConfig.users,
                    "pic": "" + gameData.player.pic,
                    "sex": "0"
                };
            }
            else {
                obj = {
                    "channel": "" + gameConfig.platformType(),
                    "length": gameConfig.code.length,
                    "code": gameConfig.code
                };
            }
        }

        return JSON.stringify(obj);
    }
}