/**
 * HupaiquView
 * @Author Ace.c
 * @Create 2016-12-01 14:33
 */
class HupaiquView extends egret.DisplayObjectContainer {

    private cardRules: any = {
        1: {1: {x: 15, y: 20}, 2: {x: 45, y: 20}, 3: {x: 15, y: 60}, 4: {x: 45, y: 60}},
        2: {1: {x: 21, y: 39}, 2: {x: 21, y: 14}, 3: {x: 64, y: 39}, 4: {x: 64, y: 14}},
        3: {1: {x: 15, y: 20}, 2: {x: 45, y: 20}, 3: {x: 15, y: 60}, 4: {x: 45, y: 60}},
        4: {1: {x: 64, y: 14}, 2: {x: 64, y: 39}, 3: {x: 21, y: 14}, 4: {x: 21, y: 39}},
    };

    private haloRules: any = {
        1: {}
    };

    private layNum: number = 4;

    private halo: egret.Bitmap;
    private container: egret.DisplayObjectContainer;
    private dir: number;

    public constructor(dir: number) {
        super();

        this.dir = dir;

        this.halo = new egret.Bitmap();
        this.halo.texture = RES.getRes("game_show_kuang");
        this.halo.anchorOffsetX = 8;
        this.halo.anchorOffsetY = 8;
        this.addChild(this.halo);

        egret.Tween.get(this.halo, {loop: true}).to({alpha: 0.3}, 500).to({alpha: 1}, 500);

        this.container = new egret.DisplayObjectContainer();
        this.addChild(this.container);

        this.clean();
    }

    public addCardView(pai:any) {
        if (!pai)return;

        var card: CardView = CardView.create(this.dir, 4, pai);

        switch (this.dir) {
            case 1:
                this.autoDir1(card);
                break;
            case 2:
                this.autoDir2(card);
                break;
            case 3:
                this.autoDir3(card);
                break;
            case 4:
                this.autoDir4(card);
                break;
        }

        this.resize();
    }

    private autoDir1(card: CardView) {
        card.x = this.getPosition().x;
        card.y = this.getPosition().y - this.getLay() * 12;
        this.container.addChild(card);
    }

    private autoDir2(card: CardView) {
        card.x = this.getPosition().x;
        card.y = this.getPosition().y - this.getLay() * 12;
        this.getSite() % 2 == 1 ? this.container.addChild(card) : this.container.addChildAt(card, this.getLay() * this.layNum);
    }

    private autoDir3(card: CardView) {
        card.x = this.getPosition().x;
        card.y = this.getPosition().y - this.getLay() * 12;
        this.container.addChild(card);
    }

    private autoDir4(card: CardView) {
        card.x = this.getPosition().x;
        card.y = this.getPosition().y - this.getLay() * 12;
        this.container.addChild(card);
    }

    private resize(): any {
        switch (this.container.numChildren) {
            case 1:
                this.halo.width = this.dir == 1 || this.dir == 3 ? 48 : 59;
                this.halo.height = this.dir == 1 || this.dir == 3 ? 64 : 50;
                break;
            case 2:
                this.halo.width = this.dir == 1 || this.dir == 3 ? 78 : 59;
                this.halo.height = this.dir == 1 || this.dir == 3 ? 64 : 74;
                break;
            case 3:
                this.halo.width = this.dir == 1 || this.dir == 3 ? 78 : 102;
                this.halo.height = this.dir == 1 || this.dir == 3 ? 104 : 74;
                break;
            case 4:
                this.halo.width = this.dir == 1 || this.dir == 3 ? 78 : 102;
                this.halo.height = this.dir == 1 || this.dir == 3 ? 104 : 74;
                break;
        }

        this.halo.x = 0;
        this.halo.y = 0;

        switch (this.dir) {
            case 2:
                this.halo.y = this.container.numChildren == 1 ? 25 : 0;
                break;
            case 4:
                this.halo.x = this.container.numChildren <= 2 ? 43 : 0;
                break;
        }

        switch (this.dir) {
            case 1:
                this.x = 620;
                this.y = 420;
                break;
            case 2:
                this.x = 735;
                this.y = 150;
                break;
            case 3:
                this.x = 280;
                this.y = 120;
                break;
            case 4:
                this.x = 140;
                this.y = 415;
                break;
        }

        this.visible = this.container.numChildren == 0 ? false : true;
    }

    private getLay(): number {
        return Math.floor(this.container.numChildren / this.layNum);
    }

    private getSite(): number {
        return this.container.numChildren % this.layNum + 1;
    }

    private getPosition(): any {
        return this.cardRules[this.dir][this.getSite()];
    }

    public clean() {
        this.container.removeChildren();

        this.visible = this.container.numChildren == 0 ? false : true;
    }
}