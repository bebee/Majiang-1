/**
 * 登陆请求
 */
class _1
{
    public writeData(obj:any)
    {
        if(!obj)
        {
            if(GameConfig.users)
            {
                obj = {
                    "channel":"test",
                    "openid":"" + GameConfig.users,
                    "openkey":"123456788",
                    "nick":"" + GameConfig.users,
                    "pic":"" + GlobalData.getInstance().player.pic,
                    "sex":"0"
                };
            }
            else
            {
                obj = {
                    "channel":"" + GameConfig.platformType(),
                    "length":GameConfig.code.length,
                    "code":GameConfig.code
                };
            }
        }

        return JSON.stringify(obj);
    }
}