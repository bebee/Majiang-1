class StackManager {
    static dict = {};

    static delayed = {};

    static closeDialog(dialogName: string, all: boolean = false) {
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

    static delayedDialog(dialogClass: any, dialogName: string, listener: string, thisObject: any) {
        StackManager.delayed[dialogName] = {meth: listener, my: thisObject};

        StackManager.open(dialogClass, dialogName);
    }

    static open(dialogClass: any, dialogName: string, callback: Function = null) {
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

    static Update(_class: any, _className: string, isOnlyShow: boolean = true): void {
        if (_class && _className) {
            if (this.dict[_className]) {
                if (isOnlyShow && !this.dict[_className].showing) return;

                this.dict[_className].onUpdate();
            }
        }
    }

    static findDialog(_class: any, _className: string, isNew: boolean = true): any {
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