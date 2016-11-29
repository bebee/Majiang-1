/**
 * Created by Administrator on 2015/12/17.
 */
//战斗特效管理器
class EffectManager{

    private static _i:EffectManager;

    public static get i():EffectManager{

        return this._i || (this._i = new EffectManager);
    }

    private movieDefaultProp:any;

    private movieClips:egret.MovieClip[];

    private movieClipDataFactory:egret.MovieClipDataFactory;

    private movieClipDataMap:any;

    //正在播放中的特效
    private playingMovieClips:egret.MovieClip[];

    private eps:any;

    constructor(){


        this.movieClips = [];
        this.movieClipDataMap = {};

        this.playingMovieClips = [];

        this.movieClipDataFactory = new egret.MovieClipDataFactory;

        this.movieDefaultProp = {   x:0,
            y:0,
            scaleX:1,
            scaleY:1,
            anchorOffsetX:0,
            anchorOffsetY:0,
            rotation:0,
            frameRate:12
        };
        this.eps = {};

        this.regEffectsAO();

    }



    //注册特效偏移
    private regEffectsAO(){
        this.regAO("loding", "loding", 0,0,9);
    }


    //获取带属性的特效 id 特效id
    public getPropEffect(id:string):egret.MovieClip{

        var mc:egret.MovieClip = this.getMovieClipFPool();

        if(id == "") return mc;

        this.updateMovieClipData(mc,id);

        return mc;
    }


    //获取元件
    public getMovieClipFPool():egret.MovieClip {

        if (this.movieClips.length) {

            return this.movieClips.shift();

        }
        return new egret.MovieClip;
    }


    //更新
    public updateMovieClipData(mc:egret.MovieClip,name:string){

        var prop:any = this.getAO(name);

        var mcData:egret.MovieClipData = this.getMovieClipData(prop.name);

        mc.movieClipData = mcData;

        (mc.totalFrames > 0 && mcData)&& (mc.frameRate = prop.frame);
        mc.anchorOffsetX = prop.x;
        mc.anchorOffsetY = prop.y;
    }

    private getMovieClipData(res:string):egret.MovieClipData{

        var mcData = this.movieClipDataMap[res];

        if(!mcData){

            var json = this.movieClipDataFactory.mcDataSet = RES.getRes(res+"_json");

            if(json) {

                this.movieClipDataFactory.mcDataSet = json;

                this.movieClipDataFactory.texture = RES.getRes(res+"_png");

            }
            else{

                //自定义加载的资源池子里去获取
                //json = this.movieClipDataFactory.mcDataSet = FightRes.i.getRes(res+"_json");
                //this.movieClipDataFactory.texture = FightRes.i.getRes(res+"_png");

            }

            if(json == null){

                mcData = null;

            }else {

                this.movieClipDataMap[res] = (mcData = this.movieClipDataFactory.generateMovieClipData());
            }
        }
        return mcData;
    }

    removeEffect(mc:egret.MovieClip){

        this.resetMovieClip(mc);

        mc.parent && mc.parent.removeChild(mc);

        this.playingMovieClips.splice(this.playingMovieClips.indexOf(mc),1);

        this.movieClips.push(mc);
    }

    private resetMovieClip(mc:egret.MovieClip){

        for(var o in this.movieDefaultProp){

            mc[o] = this.movieDefaultProp[o];
        }

        mc.gotoAndStop(0);
    }

    //创建特效
    /*
     name : 特效名
     parent:父级容器
     playCount:播放次数
     propObj:属性对象
     callback 回调 thisObj 作用域
     */
    public playEffect(id:string,parent:egret.DisplayObjectContainer,playCount:number = 1,propObj?:any,callback?:Function,thisObj?:any,data?:any) :egret.MovieClip{

        var mc:egret.MovieClip = this.getPropEffect(id);

        this.playingMovieClips.push(mc);

        if (propObj) for (var o in propObj) this.movieDefaultProp.hasOwnProperty(o) && (mc[o] = propObj[o]);

        mc.play(playCount);

        parent.addChild(mc);

        if (playCount == 1) {

            mc.addEventListener(egret.Event.COMPLETE, function(e){

                mc.removeEventListener(egret.Event.COMPLETE,arguments.callee,this);

                this.removeEffect(mc);

                callback == null || callback.call(thisObj,data);

            }, this);
        }

        return mc;
    }

    //注册偏移
    regAO(id:string,name:string,x:number,y:number,frame:number = 12){

        this.eps[id] = {name:name,x:x,y:y,frame:frame};

    }
    getAO(id:string) : any {

        var prpo:any = this.eps[id];

        if(!prpo) throw new Error("没有注册特效相关属性 : " + id);

        return prpo;
    }

}