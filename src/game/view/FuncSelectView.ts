/**
 * Created by Administrator on 2016/11/2.
 */
class FuncSelectView extends egret.DisplayObjectContainer {

    icons: egret.Bitmap[];

    face: IGameTapEvent;

    selectCon: egret.DisplayObjectContainer;

    backMask: egret.Shape;

    groupCon: egret.DisplayObjectContainer;

    //gangCon:egret.DisplayObjectContainer;

    constructor() {

        super();

        this.initView();
    }

    initView() {

        this.selectCon = new egret.DisplayObjectContainer;

        this.selectCon.x = 770;
        this.selectCon.y = 505;

        this.icons = [];

        var count: number = 7;

        for (var i: number = 0; i < count; i++) {

            var icon = new egret.Bitmap;

            icon.x = -i * 120;

            this.selectCon.addChild(icon);

            icon.touchEnabled = true;

            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

        }
        this.groupCon = new egret.DisplayObjectContainer();

        this.groupCon.x = 555;
        this.groupCon.y = 478;


        this.backMask = new egret.Shape;
        this.backMask.graphics.beginFill(0, .5);
        this.backMask.graphics.drawRect(0, 0, GSConfig.width, GSConfig.height);
        this.backMask.touchEnabled = true;
        this.backMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgTap, this);

        this.addChild(this.selectCon);
        this.addChild(this.backMask);
        this.addChild(this.groupCon);
        this.backMask.visible = false;

    }

    bgTap() {

        this.clearGroupConView();
    }

    reTexture(bitmap: egret.Bitmap, res: string) {

        bitmap.texture = GameRes.getUI(res);
        bitmap.anchorOffsetX = bitmap.width >> 1;
        bitmap.anchorOffsetY = bitmap.height >> 1;

    }

    //刷新杠牌牌型选择
    updateGroupConViewByGang(group: any) {

        this.clearGroupConView();

        if (group.length == 1) {
            this.face.onGroupSelect(0);
            return;
        }

        this.backMask.visible = true;

        for (var i: number = 0; i < group.length; i++) {
            var pai = group[i].pai;

            var groupView = new egret.DisplayObjectContainer();
            groupView.name = "" + i;
            groupView.touchEnabled = true;
            groupView.y = -100 * i;
            this.groupCon.addChild(groupView);

            groupView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupTap, this);

            for (var j: number = 0; j < pai.length; j++) {
                var o = GSConfig.getPosByIndex(1, 3, j);
                var cardView: CardView = CardView.create(1, 3, pai[j]);
                cardView.posView(o.x, o.y);
                groupView.addChild(cardView);
            }
        }
    }

    //刷新吃牌牌型选择
    updateGroupConViewByChi(group: any[]) {

        this.clearGroupConView();

        if (group.length == 1) {
            this.face.onGroupSelect(0);
            return;
        }

        this.backMask.visible = true;

        for (var i: number = 0; i < group.length; i ++) {
            //var index: number = i / 3 ^ 0;

            var groupView = new egret.DisplayObjectContainer();
            groupView.name = "" + i;
            groupView.touchEnabled = true;
            groupView.y = -100 * i;
            this.groupCon.addChild(groupView);

            groupView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupTap, this);

            var arr: any[] = [group[i].pai[0],group[i].pai[1],group[i].pai[2]];
            var chi: number = arr[1].number;
            arr.sort(function (a, b) {
                if (a.number > b.number)return 1;
                else return -1;
            });

            for (var j: number = 0; j < arr.length; j++) {
                var o = GSConfig.getPosByIndex(1, 3, j);

                var cardView: CardView = CardView.create(1, 3, arr[j]);
                cardView.posView(o.x, o.y);
                groupView.addChild(cardView);

                cardView.enabled = arr[j].number != chi;
            }
        }
    }
    //刷新补蛋列表
    updateGroupConViewByBudan(group: any[]){

        this.clearGroupConView();

        if (group.length == 1) {
            this.face.onGroupSelect(0);
            return;
        }


        this.backMask.visible = true;

        for (var i: number = 0; i < group.length; i ++) {

            var groupView = new egret.DisplayObjectContainer();
            groupView.name = "" + i;
            groupView.touchEnabled = true;
            groupView.y = -100 * i;
            this.groupCon.addChild(groupView);
            groupView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupTap, this);

            var pai = group[i].pai;

            var cardView: CardView = CardView.create(1, 3, pai);

            groupView.addChild(cardView);
        }

    }



    clearGroupConView() {

        while (this.groupCon.numChildren) {

            var group = <egret.DisplayObjectContainer> this.groupCon.removeChildAt(0);
            group.touchEnabled = false;
            group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupTap, this);

            while (group.numChildren) {

                var cardView: CardView = <CardView>group.removeChildAt(0);

                CardView.returnCardView(cardView);
            }
        }
        this.backMask.visible = false;
    }

    //更新功能显示
    updateFuncView(funcSelects: any[]) {

        for (var i: number = 0; i < GSConfig.funcSelects.length; i++) {

            var icon = <egret.Bitmap> this.selectCon.getChildAt(i);

            var obj = funcSelects[i];

            if (obj != null) {

                icon.visible = true;

                //this.reTexture(icon, GSConfig.funcSelects[obj.index].res);
                this.reTexture(icon, GSConfig.funcSelectRes[obj.index]);

                icon.name = "" + i;

            } else {

                icon.visible = false;
            }

        }

    }

    bindInterface(face: IGameTapEvent) {

        this.face = face;

    }

    onGroupTap(e: egret.TouchEvent) {

        var group = e.currentTarget;

        this.face.onGroupSelect(+group.name);

    }

    onTouchTap(e: egret.TouchEvent) {

        var icon = e.currentTarget;

        this.face.onFuncSelect(+icon.name);
    }
}