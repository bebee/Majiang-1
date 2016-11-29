/**
 * BaseDispatcher
 * @Author Ace.c
 * @Create 2016-11-29 11:26
 */
class BaseDispatcher {

    protected callbacks: any = {};

    /**
     * 注册事件
     */
    public addEventListener(type: any, callback: Function, thisObj: any): void {
        if (this.checkCallbackIsExist(type, callback, thisObj)) {
            return;
        }

        var list: any[] = this.getCallbackList(type);
        list.push({"callback": callback, "thisObj": thisObj});
    }

    /**
     * 移除事件
     */
    public delEventListener(type: any, callback: Function, thisObj: any): void {
        if (!this.checkCallbackIsExist(type, callback, thisObj)) {
            return;
        }

        var list: any[] = this.getCallbackList(type);
        var temp: any;
        for (var i: number = 0; i < list.length; i++) {
            temp = list[i];
            if (temp["callback"] == callback && temp["thisObj"] == thisObj) {
                list.splice(i, 1);
                break;
            }
        }
    }

    /**
     * 广播事件
     */
    public dispatchEvent(type: any, args?: any): void {
        var list: any[] = this.getCallbackList(type);
        var temp: any;
        for (var i: number = 0; i < list.length; i++) {
            temp = list[i];
            temp["callback"].call(temp["thisObj"], args);
        }
    }

    /**
     * 获取回调列表
     * @returns {Function[]}
     */
    protected getCallbackList(type: any): Function[] {
        var list: any[] = [];
        if (this.callbacks.hasOwnProperty(type)) {
            list = this.callbacks[type];
        }
        else {
            this.callbacks[type] = list;
        }
        return list;
    }

    /**
     * 检测回调函数是否已经存在
     * @returns {boolean}
     */
    protected checkCallbackIsExist(type: any, callback: Function, thisObj: any): boolean {
        var isExist: boolean = false;
        var list: any[] = this.getCallbackList(type);
        var temp: any;
        for (var i: number = 0; i < list.length; i++) {
            temp = list[i];
            if (temp["callback"] == callback && temp["thisObj"] == thisObj) {
                isExist = true;
                break;
            }
        }
        return isExist;
    }
}