  /**
    * 游戏特效汇总
    * 使用方法如：EffectUtils.rotationEffect()
    */

module EffectUtils {

    // 存储旋转对象
    var rotationArr:Array<any> = [];
    //对象旋转特效
    //obj   旋转对象
    //time  旋转一周用时，毫秒
    export function rotationEffect(obj, time:number = 1000):void
    {
        if(this.rotationArr == null)
        {
            this.rotationArr = [];
        }
        if(this.rotationArr[obj.hashCode])
        {
            return;
        }
        if((this.rotationArr[obj.hashCode] == null)||!this.rotationArr[obj.hashCode])
        {
            this.rotationArr[obj.hashCode] = true;
        }

        var my = this;

        var _w:number = obj.width;
        var _h:number = obj.height;

        obj.anchorOffsetX = _w * 0.5;
        obj.anchorOffsetY = _h * 0.5;

        obj.x += _w * 0.5;
        obj.y += _h * 0.5;

        var onComplete1:Function = function()
        {
            if(my.rotationArr[obj.hashCode]&&(obj != null))
            {
                obj.rotation = 0;

                egret.Tween.get(obj).to({rotation:360},time).call(onComplete1, my);
            }
        };

        onComplete1();
    }

    //取消对象旋转
    //obj    旋转对象
    export function removeRotationEffect(obj):void
    {
        if(this.rotationArr == null)
        {
            this.rotationArr = [];
        }
        this.rotationArr[obj.hashCode] = false;
    }

    //对象闪烁特效
    //obj         闪烁对象
    //interval    闪烁总工时间
    export function blinkEffect(obj,interval:number = 1000):void
    {
        new BitmapBlink(obj,interval); 
    }


    //抖动对象特效
    // 1：抖动  2：震动
    export function shakeScreen(effectType:number = 1):void
    {
        var panel = gameConfig.curPanel;

        var shakeNum = 40;

        var oldX:number = panel.x;

        var oldY:number = panel.y;

        if(effectType == 1)
        {
            egret.Tween.get(panel).to({x:panel.x - 10},shakeNum); 

            egret.setTimeout(function ()
            {
                egret.Tween.get(panel).to({x:panel.x + 20},shakeNum);

            }, this, shakeNum*2);

            egret.setTimeout(function ()
            {
                egret.Tween.get(panel).to({x:panel.x - 20},shakeNum);

            }, this, shakeNum*3);

            egret.setTimeout(function ()
            {
                egret.Tween.get(panel).to({x:panel.x + 20},shakeNum);

            }, this, shakeNum*4);

            egret.setTimeout(function ()
            {
                egret.Tween.get(panel).to({x:oldX},shakeNum);

            }, this, shakeNum*5);      
        }
        else
        {
            egret.Tween.get(panel).to({x:panel.x - 10,y:panel.y},shakeNum); 

            egret.setTimeout(function ()
            {
                egret.Tween.get(panel).to({x:panel.x + 20,y:panel.y},shakeNum);

            }, this, shakeNum*2);

            egret.setTimeout(function ()
            {
                egret.Tween.get(panel).to({x:panel.x,y:panel.y + 15},shakeNum);

            }, this, shakeNum*3);

            egret.setTimeout(function ()
            {
                egret.Tween.get(panel).to({x:panel.x,y:panel.y - 20},shakeNum);

            }, this, shakeNum*4);

            egret.setTimeout(function ()
            {
                egret.Tween.get(panel).to({x:panel.x,y:panel.y + 10},shakeNum);

            }, this, shakeNum*5);

            egret.setTimeout(function ()
            {
                egret.Tween.get(panel).to({x:oldX,y:oldY},shakeNum);

            }, this, shakeNum*6);
        }
    }

    /**
    * str             提示内容
    * effectType      动画类型 1：从下到上弹出 2：从左至右弹出 3：从右至左弹出 4：从中间弹出渐渐消失 5：从大变小 等等
    * isWarning       是否是警告，警告是红色
    */
    export function showTips(str:string = "",effectType:number = 1,isWarning:boolean = false):void
    {
        switch (effectType)
        {
            case 1:
            {
                TipsUtils.showTipsDownToUp(str,isWarning);
                break;
            }
            case 2:
            {
                TipsUtils.showTipsLeftOrRight(str,isWarning,true);
                break;
            }
            case 3:
            {
                TipsUtils.showTipsLeftOrRight(str,isWarning,false);
                break;
            }
            case 4:
            {
                TipsUtils.showTipsFromCenter(str,isWarning);
                break;
            }
            case 5:
            {
                TipsUtils.showTipsBigToSmall(str,isWarning);
                break;
            }
            default:
            {
                TipsUtils.showTipsBigToSmall(str,isWarning);
                break;
            }
        }

    }    

    //========================== a lot of effect will coming! ============================
   
    var isPlayEffectPlay:Boolean = false; 
    /**
    * 给显示对象增加特效
    * obj           对象
    * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
    */
    export function playEffect(obj,cartoonType:number = 1):void
    {
        var my = this;

        if(my.isPlayEffectPlay)
        {
            return;
        }

        my.isPlayEffectPlay = true;

        var onComplete2:Function = function()
        {
            my.isPlayEffectPlay = false;
        };

        var onComplete1:Function = function()
        {
            if(cartoonType == 1)
            {
                egret.Tween.get(obj).to({scaleX:1,scaleY:1,x:obj.x - obj.width/4,y:obj.y - obj.height/4},500,egret.Ease.elasticOut).call(onComplete2,my);
            }
            else if(cartoonType == 2)
            {
                egret.Tween.get(obj).to({scaleX:1,scaleY:1,x:obj.x - obj.width/4,y:obj.y - obj.height/4},500,egret.Ease.backOut).call(onComplete2,my);
            }
            else if(cartoonType == 3)
            {
                egret.Tween.get(obj).to({scaleX:1,scaleY:1,x:obj.x - obj.width/4,y:obj.y - obj.height/4},100).call(onComplete2,my);
            }
        };

        egret.Tween.get(obj).to({scaleX:0.5,scaleY:0.5,x:obj.x + obj.width/4,y:obj.y + obj.height/4},100,egret.Ease.sineIn).call(onComplete1,this);                    
    }    


    /**
    * 给显示对象增加持续放大特效
    * obj           对象
    */
    export function playScaleEffect(obj):void
    {
        var onComplete1:Function = function()
        {
            if(obj != null)
            {
                var onComplete2:Function = function()
                {
                    obj.scaleX = 1;
                    obj.scaleY = 1;
                    egret.Tween.get(obj).to({ alpha:1}, 1000).call(onComplete1,self);
                };

                obj.alpha = 1;

                egret.Tween.get(obj).to({ scaleX:1.5,scaleY:1.5,alpha:0}, 1000).call(onComplete2,self);
            }
        };  

        onComplete1();

    }  


    /**
    * 显示对象摇头特效
    * obj           对象
    * time          浮动时间 毫秒
    * space         摇头幅度
    * todo          多个对象摇头
    * 注意：需要将对象的注册点位置：0.5,1
    */    
    export function rockObj(obj,time,space:number = 20):void
    {
        var onComplete1:Function = function()
        {
            if(obj != null)
            {
                var onComplete2:Function = function()
                {
                    egret.Tween.get(obj).to({rotation:-space},time).call(onComplete1,this);
                };

                egret.Tween.get(obj).to({rotation:space},time).call(onComplete2,this);
            }
        };

        onComplete1();
    }

    /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */    
    export function typerEffect(obj,content:string = "",interval:number = 200):void
    {
        var strArr:Array<any> = content.split("");

        var len:number = strArr.length;

        for (var i = 0; i < len; i++)
        {
            egret.setTimeout(function ()
            {
                obj.appendText(strArr[Number(this)]);

            }, i, interval*i);
        }
    }
}