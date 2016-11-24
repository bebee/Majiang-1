/**
 * 解散房间投票
 */
class S14
{
    public parseData(obj:any)
    {
        if(!obj) return;

        var vote = obj.data.vote;

        var dialog:DissolutionDialog = StackManager.findDialog(DissolutionDialog, "DissolutionDialog");

        if(dialog)
        {
            for(var k in vote)
            {
                dialog.plist[k] = vote[k];
            }

            if(GameLayerManager.gameLayer().panelLayer.contains(dialog))
            {
                dialog.refresh();
            }
            else
            {
                dialog.show();
                dialog.refresh();
                //dialog.showMsgDialog();
            }

        }
    }
}