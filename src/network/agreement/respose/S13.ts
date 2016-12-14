/**
 * 游戏结束
 */
class S13 {
    public parseData(obj: any) {
        if (!obj || !obj.hasOwnProperty("data")) return;

        console.log("游戏结束！  ", obj);

        GSController.i.jiesuanData = obj.data;

        var dialog: DissolutionPanel = StackManager.findDialog(DissolutionPanel, "DissolutionPanel");

        if (dialog && LayerManager.gameLayer().panelLayer.contains(dialog)) {
            GSController.i.closeResultView();
            GSController.i.closeGSView();
            GSController.i.showTitleView(GSController.i.jiesuanData);
            game.dissolution = null;
        }

        game.cleanRoom();
    }
}