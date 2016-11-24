class HttpHandler
{
    constructor()
    {

    }

    public static sendMsgCallBack(URL:string, param:string, callback:Function, method:string, thisObj:any):void
    {

        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request:egret.URLRequest = new egret.URLRequest(URL);
        request.method = method;
        request.method = method;
        request.data = new egret.URLVariables(param);
        loader.load(request);

        loader.addEventListener(egret.Event.COMPLETE, function(event:egret.Event)
        {
            var loader:egret.URLLoader = <egret.URLLoader>event.target;
            var data:egret.URLVariables = loader.data;
            var obj:any = JSON.parse(data.toString());
            callback.call(thisObj, obj);
        }, this);
    }
}