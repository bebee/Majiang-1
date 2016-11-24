/**
 * 同步房卡数量
 */
class S24
{
    public parseData(obj:any)
    {
        if(obj.data)
        {
            GlobalData.getInstance().player.update(obj.data);

            var game:GameMainScene = SceneManager.find("GameMainScene");

            if(game) game.update();
        }
    }
}