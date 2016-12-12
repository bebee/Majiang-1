/**
 * 解散房间投票
 */
class S14
{
    public parseData(obj:any)
    {
        if(!obj) return;

        if(+obj.code != 0) return;

        var vote = obj.data.vote;

        var dialog:DissolutionDialog = StackManager.findDialog(DissolutionDialog, "DissolutionDialog");

        if(dialog)
        {
            for(var k in vote)
            {
                dialog.plist[k] = vote[k];
            }

            if(LayerManager.gameLayer().panelLayer.contains(dialog))
            {
                dialog.refresh();
            }
            else
            {
                dialog.show();
                dialog.refresh();
            }

        }
    }
}