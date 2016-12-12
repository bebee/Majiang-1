/**
 * 心跳
 */
class S19
{
    public parseData(obj:any)
    {
        var dialog:RecordDialog = StackManager.findDialog(RecordDialog, "RecordDialog");

        if(dialog && LayerManager.gameLayer().panelLayer.contains(dialog))
        {
            dialog.obj = obj.data;
            
            dialog.refreshList();
        }
    }
}