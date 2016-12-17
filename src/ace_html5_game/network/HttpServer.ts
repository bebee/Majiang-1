/**
 * HttpServer
 * @Author Ace.c
 * @Create 2016-12-17 10:26
 */
class HttpServer {

    /**
     * 拉取数据
     * @param url 连接地址
     * @param callback 回调函数
     * @param thisObj 回调指针
     * @param param 拉取参数
     * @param method 拉取方式
     */
    static pull(url: string, callback: Function, thisObj: any, param?: string, method: string = egret.URLRequestMethod.POST): void {

        var loader: egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;

        var request: egret.URLRequest = new egret.URLRequest(url);
        request.method = method;

        if (param) {
            request.data = new egret.URLVariables(param);
        }

        loader.addEventListener(egret.Event.COMPLETE, function (event: egret.Event) {
            var loader: egret.URLLoader = <egret.URLLoader>event.target;
            var data: egret.URLVariables = loader.data;
            var obj: any = JSON.parse(data.toString());
            callback.call(thisObj, obj);
        }, this);

        loader.load(request);
    }
}