/**
 * 详情
 */
class S20
{
    public parseData(obj:any)
    {
        console.log(obj.data);

        var dialog:RecordDialog = StackManager.findDialog(RecordDialog, "RecordDialog");

        if(dialog && GameLayerManager.gameLayer().panelLayer.contains(dialog))
        {
            dialog.xobj = obj.data;

            dialog.refreshXList();
        }
    }
}