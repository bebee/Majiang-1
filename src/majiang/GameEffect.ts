/**
 * GameEffect
 * @Author Ace.c
 * @Create 2016-11-28 15:16
 */
class GameEffect {

    static play(type: GameEffectType, ...args) {
        switch (type) {
            case GameEffectType.chupai:
                if (args.length == 2) {
                    Chupai.play(args[0], args[1]);
                }
                break;
        }
    }

    static stop(type: GameEffectType) {
        switch (type) {
            case GameEffectType.chupai:
                Chupai.stop(true);
                break;
        }
    }
}

enum GameEffectType {
    chupai
}