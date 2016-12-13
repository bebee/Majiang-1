/**
 * 心跳
 */
class S19
{
    public parseData(obj:any)
    {
        var dialog:RecordPanel = StackManager.findDialog(RecordPanel, "RecordPanel");

        if(dialog && LayerManager.gameLayer().panelLayer.contains(dialog))
        {
            dialog.obj = obj.data;
            
            dialog.refreshList();
        }
    }
}