/**
 * 单项选择组
 */
module mui
{
    export class ECheckBox extends eui.Component
    {
        private _group:eui.Group;
        private _radioList:Array<mui.ERadio> = [];

        public radioIndex:number = 0;

        private _gdata:any;
        private _radioNum:number = 2;
        private _rn:string = "check_on_btn";
        private _rf:string = "check_off_btn";

        /**
         * @param gdata     容器格式数据 {layout, width, height, horizontalAlign, verticalAlign, gap}
         * @param radioNum  按钮数量
         * @param rn        按钮选中图片
         * @param rf        按钮未选中图片
         */
        public constructor(gdata:any = null, radioNum:number = 2, rn:string = "check_on_btn", rf:string = "check_off_btn")
        {
            super();

            this.touchEnabled = true;
            this._gdata = gdata;
            this._radioNum = radioNum;
            this._rf = rf;
            this._rn = rn;
        }

        public createChildren():void
        {
            super.createChildren();

            this._group = new eui.Group();

            if(this._gdata)
            {
                this.setGroups(this._gdata);
            }

            this.addChild(this._group);


            for(var i = 0; i < this._radioNum; i++)
            {
                var radio:mui.ERadio = new mui.ERadio(this._rn, this._rf, false);

                radio.name = "" + (i + 1);

                this._radioList.push(radio);

                this._group.addChild(radio);

                radio.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

                if(i == 0)
                {
                    radio.setSelectIndex(1);

                    this.radioIndex = (i+1);
                }
            }
        }

        /**
         * 初始化容器
         * @param data  容器格式数据
         */
        public setGroups(data:any):void
        {
            if(!data) return;

            var _layout = new data["layout"];

            _layout.horizontalAlign = data["horizontalAlign"];

            _layout.verticalAlign = data["verticalAlign"];

            _layout.gap = data["gap"];

            this._group.width = +data["width"];

            this._group.height = +data["height"];

            this._group.layout = _layout;
        }

        private clearRadio():void
        {
            for(var i = 0; i < this._radioList.length; i++)
            {
                var radio:mui.ERadio = this._radioList[i];

                radio.setSelectIndex(0);
            }
        }

        /**
         * 按钮点击
         * @param e
         */
        private onClick(e:egret.TouchEvent):void
        {
            this.clearRadio();

            var radio:mui.ERadio = e.currentTarget;

            if(!radio) return;

            radio.setSelectIndex(1);

            this.radioIndex = +radio.name;
        }
    }
}
