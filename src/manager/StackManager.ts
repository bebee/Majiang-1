/**弹出界面管理**/
module StackManager {
    export var dict = {};

    export var delayed = {};

    export function closeDialog(dialogName: string, all: boolean = false) {
        if (all) {
            for (var key in this.dict) {
                if (this.dict[key]) {
                    this.dict[key].hide();
                }
            }
        }
        else {
            if (this.dict[dialogName]) {
                if (LayerManager.gameLayer().panelLayer.contains(this.dict[dialogName])) this.dict[dialogName].hide();
            }
        }
    }

    /**
     * 延迟执行
     * @param dialogClass
     * @param dialogName
     * @param listener
     * @param thisObject
     */
    export function delayedDialog(dialogClass: any, dialogName: string, listener: string, thisObject: any) {
        StackManager.delayed[dialogName] = {meth: listener, my: thisObject};

        StackManager.open(dialogClass, dialogName);
    }

    /**
     * @param dialogClass 界面类
     * @param dialogName 界面name {key}
     */
    export function open(dialogClass: any, dialogName: string, callback: Function = null) {
        if (this.dict[dialogName] == null) {
            var dialog = new dialogClass();
            dialog.show();
            StackManager.dict[dialogName] = dialog;
        }
        else {
            this.dict[dialogName].show();
            if (callback) callback(this.dict[dialogName]);
        }
    }

    export function Update(_class: any, _className: string, isOnlyShow: boolean = true): void {
        if (_class && _className) {
            if (this.dict[_className]) {
                if (isOnlyShow && !this.dict[_className].showing) return;

                this.dict[_className].onUpdate();
            }
        }
    }

    export function findDialog(_class: any, _className: string, isNew: boolean = true): any {
        if (_class && _className) {
            if (this.dict[_className]) {
                return this.dict[_className];
            }
            else if (isNew) {
                this.dict[_className] = new _class();
                return this.dict[_className];
            }
        }
        return null;
    }
}