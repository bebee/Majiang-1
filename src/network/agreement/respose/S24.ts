/**
 * 同步房卡数量
 */
class S24
{
    public parseData(obj:any)
    {
        if(obj.data)
        {
            gameData.player.update(obj.data);

            var game:MainScene = SceneManager.find("MainScene");

            if(game) game.update();
        }
    }
}