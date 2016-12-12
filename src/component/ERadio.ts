/**
 * 选择按钮
 */
module mui
{
    export class ERadio extends eui.Component
    {
        private bgimg:eui.Image;

        private onImg:string = "";

        private offImg:string = "";

        public selectIndex:number = 0;

        /**
         * @param oni  选中显示图片
         * @param offi 未选中显示图片
         * @param canclick 是否有点击事件
         */
        public constructor(oni:string = "check_on_btn", offi:string = "check_off_btn", canclick:boolean = true)
        {
            super();

            this.onImg = oni;

            this.offImg = offi;

            this.touchEnabled = true;

            if(canclick) this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        public createChildren():void
        {
            super.createChildren();

            this.onSelect();
        }

        private onTouch(e:egret.TouchEvent):void
        {
            if(this.selectIndex == 0) this.selectIndex = 1;
            else this.selectIndex = 0;

            this.onSelect();
        }

        private onSelect():void
        {
            if(!this.bgimg)
            {
                this.bgimg = new eui.Image();

                if(!this.contains(this.bgimg)) this.addChild(this.bgimg);
            }

            if(this.selectIndex == 0)
            {
                this.bgimg.source = this.offImg;
            }
            else
            {
                this.bgimg.source = this.onImg;
            }


            // var dialog:CreateDialog = StackManager.findDialog(CreateDialog, "CreateDialog");
            //
            // if(dialog && LayerManager.gameLayer().panelLayer.contains(dialog))
            // {
            //     dialog.refreshText();
            // }
        }

        public setSelectIndex(index:number = 0):void
        {
            this.selectIndex = index;

            this.onSelect();
        }
    }
}
