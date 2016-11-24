/**
 * 主要用于跨域加载图片.
 */
module mui
{
    export class EImage extends egret.Bitmap
    {
        private _src:string=null;
        private _comp:boolean=false;

        public constructor(url?: string)
        {
            super();

            if(url!=null)
            {
                this.load(url);
            }
        }
        public get src():string
        {
            return this._src;
        }
        public set src(s:string)
        {
            this.load(s);
        }

        private static $(obj:any):mui.EImage
        {
            var img:mui.EImage = obj["$"];

            delete obj["$"];obj.onload=null;obj.onerror=null;

            return img;
        }
        private onLoadBack(img:any, url:string):void
        {
            if(url==this._src)
            {
                if (img)
                {
                    var tt:egret.Texture = new egret.Texture();

                    tt._setBitmapData(img);

                    this.texture = tt;
                }
                else
                {
                    this.texture = null;
                }

                this._comp = true;
            }
        }
        public load(url:string):void
        {
            if(this._src==url && this._comp)return;

            this._src = url;

            if(url!=null && url.length>0)
            {
                this._comp = false;

                //RES.getResByUrl(url, this.onLoadBack, this, "image");

                var img:HTMLImageElement = new Image();

                img["$"] = this;

                img.onload = function()
                {
                    EImage.$(this).onLoadBack(this, this.src);
                };

                img.onerror = function()
                {
                    EImage.$(this).onLoadBack(this, this.src);
                };

                img.src = url;
            }
            else
            {
                this.texture = null;

                this._comp = true;
            }
        }
        public size(w:number,h:number):void
        {
            this.width = w;

            this.height = h;
        }
        public move(x:number,y:number):void
        {
            this.x=x;

            this.y=y;
        }

        /**
         * 异步加载图片
         * @param url   图片地址
         * @param compFunc  {Function} 回调函数。示例：compFunc(egret.Bitmap,url:string):void。
         * @param thisObject
         * @returns {egret.Bitmap}
         */
        public static loadAsync(url:string, compFunc:Function=null, thisObject:any=null):egret.Bitmap
        {
            var img:HTMLImageElement = new Image();

            var bmp:egret.Bitmap = new egret.Bitmap();

            img["$"] = bmp;

            img.onload = function()
            {
                var p:egret.Bitmap = this["$"];

                delete this["$"];this.onload=null;this.onerror=null;

                var t:egret.Texture = new egret.Texture();

                t._setBitmapData(this);

                p.texture = t;

                if(compFunc!=null)
                {
                    compFunc.apply(thisObject, [p]);
                    // compFunc(p);
                }
            };
            img.onerror = function()
            {
                var p:egret.Bitmap = this["$"];

                delete this["$"];this.onload=null;this.onerror=null;

                p.texture = null;

                if(compFunc!=null)
                {
                    compFunc.apply(thisObject, null);
                }
            };

            img.src = url;

            return bmp;
        }

    }
}