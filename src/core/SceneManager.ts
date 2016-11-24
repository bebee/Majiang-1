/**场景**/
module SceneManager
{
    export var dict = {};


    export function close(sceneName:string, destroy:boolean = false)
    {
        if(!this.dict[sceneName]) return;

        if(GameLayerManager.gameLayer().sceneLayer.contains(this.dict[sceneName]))
        {
            GameLayerManager.gameLayer().sceneLayer.removeChild(this.dict[sceneName]);
        }

        if(destroy) delete this.dict[sceneName];
    }

    export function open(sceneClass:any, sceneName:string)
    {
        GameLayerManager.gameLayer().sceneLayer.removeChildren();

        if (this.dict[sceneName] == null)
        {
            this.dict[sceneName] = new sceneClass();

            GameLayerManager.gameLayer().sceneLayer.addChild(this.dict[sceneName]);
        }
        else
        {
            if(!GameLayerManager.gameLayer().sceneLayer.contains(this.dict[sceneName]))
            {
                GameLayerManager.gameLayer().sceneLayer.addChild(this.dict[sceneName]);
            }
        }
    }

    export function find(sceneName:string):any
    {
        if(sceneName && this.dict[sceneName])
        {
            return this.dict[sceneName];
        }

        return null;
    }

    export function update(sceneName:string):any
    {
        if(this.dict[sceneName]) this.dict[sceneName].update();
    }
}