/**
 * ChupaiTipsEffect
 * @Author Ace.c
 * @Create 2016-11-28 16:13
 */
class ChupaiTipsEffect {

    static mark: egret.Bitmap;

    static play(cardView: CardView, offx: number = 0, offy: number = 0) {
        if (!this.mark) {
            this.mark = new egret.Bitmap(RES.getRes("game_mark"));
            this.mark.anchorOffsetX = this.mark.width >> 1;
            this.mark.anchorOffsetY = this.mark.height;
            GSController.i.gsView.addChild(this.mark);
        }

        egret.Tween.removeTweens(this.mark);

        this.mark.x = cardView.pos.x + offx;
        this.mark.y = cardView.pos.y + offy;

        egret.Tween.get(this.mark, {loop: true})
            .to({y: this.mark.y - 20, scaleX: 1, scaleY: 1}, 300, egret.Ease.sineOut)
            .to({y: this.mark.y, scaleX: 1.2, scaleY: .8}, 300, egret.Ease.sineIn);

        this.mark.visible = true;
    }

    static stop() {
        if (this.mark) {
            this.mark.visible = false;
        }
    }
}