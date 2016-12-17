
class SocketManager {

    private core_conn: SocketHandler;
    private game_conn: SocketHandler;

    public Agree: any = {};

    static instance: SocketManager;

    constructor() {
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new SocketManager();
        }

        return this.instance;
    }

    getCoreConn() {
        if (!this.core_conn) {
            this.core_conn = new SocketHandler(gameConfig.address_center["ip"], gameConfig.address_center["port"], 1);
        }

        if (!this.core_conn.isConnected()) {
            this.core_conn.createConn();
        }

        return this.core_conn;
    }

    getGameConn() {
        if (!this.game_conn) {
            if (game.user) {
                if (game.ip && game.port) {
                    this.game_conn = new SocketHandler(game.ip, game.port, 2);
                }
                else {
                    this.game_conn = new SocketHandler(gameConfig.address_test["ip"], gameConfig.address_test["port"], 2);
                }
            }
            else {
                this.game_conn = new SocketHandler(gameConfig.address_game["ip"], gameConfig.address_game["port"], 2);
            }

        }

        if (!this.game_conn.isConnected()) {
            this.game_conn.createConn();
        }

        return this.game_conn;
    }

    clean(type) {
        switch (type) {
            case 1:
                if (this.core_conn) this.core_conn.clean();
                this.core_conn = null;
                break;
            case 2:
                if (this.game_conn) this.game_conn.clean();
                this.game_conn = null;
                break;
        }
    }

}