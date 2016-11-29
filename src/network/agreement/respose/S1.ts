/**
 * 登陆返回
 */
class S1
{
    private uidlist = {
        10001:"yes",
        10002:"yes",
        10003:"yes",
        10004:"yes"
    };

    public parseData(obj:any)
    {
        if(!obj) return;

        if(obj["data"])
        {
            // if(!this.uidlist[obj.data.uid])
            // {
            //     location.href = "http://mj.h5sd.com/test/test.html";
            //     return;
            // }

            GlobalData.getInstance().sendLogin = false;

            GlobalData.getInstance().connCount = 0;
            
            GlobalData.getInstance().connCount = 0;
            
            GlobalData.getInstance().player.update(obj["data"]);

            SceneManager.find("LoadingScene").onIn();
        }
    }
}