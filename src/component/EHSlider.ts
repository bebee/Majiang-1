/**
 * 滑动选择器（左右）
 */
module mui {
    export class EHSlider extends eui.HSlider {

        public track: eui.Image;
        public thumb: eui.Image;
        public scale: eui.Image;

        constructor() {
            super();

            this.skinName = "EHSliderSkin";
        }

        childrenCreated() {
            super.childrenCreated();

            this.onChanging();

            this.addEventListener(egret.Event.COMPLETE, this.onChanging, this);
            this.addEventListener(eui.UIEvent.CHANGE, this.onChanging, this);
        }

        private onChanging() {
            this.scale.width = (this.width - this.scale.x * 2) * (this.value / this.maximum);
        }

        set enable(value: boolean) {
            this.scale.source = value ? "setting_progressbar1" : "setting_progressbar2";
            this.onChanging();
        }
    }
}