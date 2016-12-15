class SceneManager {
    static dict = {};

    static get layer() {
        return LayerManager.gameLayer().sceneLayer;
    }

    static open(name: string):any {
        if (!name) return;

        var SceneClass: any = egret.getDefinitionByName(name);
        if (!SceneClass) {
            console.log("找不到对应的场景---", name);
            return;
        }

        if (this.dict[name] == null) {
            this.dict[name] = new SceneClass();
        }

        this.layer.removeChildren();

        var scene: BaseGameSprite = this.dict[name];
        this.layer.addChild(scene);

        return scene;
    }

    static close(name: string, destroy: boolean = false) {
        if (!this.dict[name]) return;

        var scene: BaseGameSprite = this.dict[name];

        if (this.layer.contains(scene)) {
            this.layer.removeChild(scene);
        }

        if (destroy) delete this.dict[name];
    }

    static update(name: string): any {
        if (this.dict[name]) this.dict[name].update();
    }

    static find(name: string): any {
        if (!name || !this.dict[name])return null;
        else return this.dict[name];
    }
}