/**
 * 详情
 */
class S20
{
    public parseData(obj:any)
    {
        var dialog:RecordPanel = StackManager.findDialog(RecordPanel, "RecordPanel");

        if(dialog && LayerManager.gameLayer().panelLayer.contains(dialog))
        {
            dialog.xobj = obj.data;

            dialog.refreshXList();
        }
    }
}