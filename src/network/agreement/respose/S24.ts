/**
 * 同步房卡数量
 */
class S24 {
    public parseData(obj: any) {
        if (obj.data) {
            game.player.update(obj.data);

            var main: MainScene = SceneManager.find("MainScene");

            if (main) main.update();
        }
    }
}