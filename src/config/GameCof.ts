/**
 * GameCof
 * @Author Ace.c
 * @Create 2016-12-09 12:00
 */
class GameCof {


    /**
     * 游戏名字
     * @param type
     * @returns {string}
     */
    static getGameName(type: GameType): string {
        var key: string;
        switch (type) {
            case GameType.baicheng:
                key = "白城麻将";
                break;
            case GameType.sichuan:
                key = "四川麻将";
                break;
        }

        return key;
    }
}