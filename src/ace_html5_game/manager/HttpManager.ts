class HttpManager extends GameDispatcher {

    private static _instance: HttpManager;

    public static getInstance(): HttpManager {
        if (!this._instance) {
            this._instance = new HttpManager();
        }
        return this._instance;
    }

    public constructor() {
        super();
    }

    public send(url: string, param: any, callback: Function = null, thisObj: any = null, method: string = egret.HttpMethod.POST): void {
        if (!url || url == "") {
            return;
        }

        console.log("SendUrl ===> " + url);
        console.log("SendData ===> " + JSON.stringify(param));

        var variables: egret.URLVariables = new egret.URLVariables();
        variables.variables = param;

        var request: egret.URLRequest = new egret.URLRequest(url);
        request.method = method;
        request.data = variables;

        var loader: egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.load(request);

        loader.addEventListener(egret.Event.COMPLETE, function (event: egret.Event) {
            var loader: egret.URLLoader = <egret.URLLoader>event.target;
            console.log("ReadData <=== " + loader.data);

            var data: any = JSON.parse(loader.data.toString());

            if (callback) {
                if (thisObj) {
                    callback.call(thisObj, data);
                }
                else {
                    callback(data);
                }
            }
        }, this);
    }
}