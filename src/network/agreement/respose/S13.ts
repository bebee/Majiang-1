/**
 * 游戏结束
 */
class S13
{
    public parseData(obj:any)
    {
        if(!obj) return;

        console.log("game over", obj);

        GSController.i.jiesuanData = obj.data;

        var dialog:DissolutionDialog = StackManager.findDialog(DissolutionDialog, "DissolutionDialog");

        if(dialog && GameLayerManager.gameLayer().panelLayer.contains(dialog))
        {
            GSController.i.closeResultView();
            GSController.i.closeGSView();
            GSController.i.visibleTwoFuncButton(false, false);
            GSController.i.showTitleView(GSController.i.jiesuanData);
            dialog.clear();
        }
    }
}