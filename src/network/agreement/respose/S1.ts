/**
 * 登陆返回
 */
class S1
{
    public parseData(obj:any)
    {
        if(!obj) return;

        if(obj["data"])
        {
            GlobalData.getInstance().sendLogin = false;
            
            GlobalData.getInstance().connCount = 0;
            
            GlobalData.getInstance().player.update(obj["data"]);

            SceneManager.find("LoginScene").onIn();
        }
    }
}