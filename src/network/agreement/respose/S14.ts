/**
 * 解散房间投票
 */
class S14
{
    public parseData(obj:any)
    {
        if(!obj) return;

        var vote = obj.data.vote;

        var time:number = +obj.data.timestamp;

        var dialog:DissolutionDialog = StackManager.findDialog(DissolutionDialog, "DissolutionDialog");

        if(dialog)
        {
            Heart.getInstance().dissolutionTime = (time + 300) - (Date.now() / 1000);

            console.log((time + 300), (Date.now() / 1000));
            
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
            }

        }
    }
}