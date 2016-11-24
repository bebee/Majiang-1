/**
 * 滑动选择器（左右）
 */
module mui
{
    export class EHSlider extends eui.HSlider
    {
        public _strack:string = "";

        public _sthumb:string = "";

        public _shap:string = "";

        private maxNum:number = 10;

        private minNum:number = 0;

        /**
         * @param max  可滑动最大值
         * @param min  可滑动最小是
         * @param trs  滑动条背景
         * @param ths  滑动条按钮
         * @param tps  滑动条进度图
         */
        public constructor(max:number = 10, min:number = 0,trs:string = "setting_progressbar_bg", ths:string = "radio_btn", tps:string = "setting_progressbar1")
        {
            super();

            this.skinName = "EHSliderSkin";

            this._strack = trs;

            this._sthumb = ths;

            this._shap = tps;

            this.maxNum = max;

            this.minNum = min;
        }

        public track:eui.Image;

        public thumb:eui.Image;

        public shap:eui.Image;

        public createChildren():void
        {
            super.createChildren();

            this.setTrack();
            this.setThumb();
            this.setShap();
            this.setMax();
            this.setMin();
        }

        public changeShap():void
        {
            var v:number = this.value;
            var n:number = this.maximum;
            var w:number = this.width;

            var nw:number = 0;
            if(v == 0) nw = 0;
            else if(v == n) nw = w - 5;
            else
            {
                nw = (v / n) * w;
            }

            this.shap.width = nw;
        }

        public setTrack(t:string = this._strack):void
        {
            if(this.track)
            {
                this.track.source = t;
            }
            else
            {
                this._strack = t;
            }
        }

        public setThumb(t:string = this._sthumb):void
        {
            if(this.thumb)
            {
                this.thumb.source = t;
            }
            else
            {
                this._sthumb = t;
            }
        }

        public setShap(t:string = this._shap):void
        {
            if(this.shap)
            {
                this.shap.source = t;
            }
            else
            {
                this._shap = t;
            }
        }

        public setMax(n:number = this.maxNum):void
        {
            this.maximum = this.maxNum = n;
        }

        public setMin(n:number = this.minNum):void
        {
            this.minimum = this.minNum = n;
        }
    }
}