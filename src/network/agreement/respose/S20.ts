/**
 * 详情
 */
class S20
{
    public parseData(obj:any)
    {
        var dialog:RecordDialog = StackManager.findDialog(RecordDialog, "RecordDialog");

        if(dialog && LayerManager.gameLayer().panelLayer.contains(dialog))
        {
            dialog.xobj = obj.data;

            dialog.refreshXList();
        }
    }
}