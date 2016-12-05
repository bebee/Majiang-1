/**
 * 回放
 */
class S21
{
    public parseData(obj:any)
    {
        //回放数据
        console.log("回放数据:",obj);

        if(+obj.code == 0)
        {
            var dialog:RecordDialog = StackManager.findDialog(RecordDialog, "RecordDialog");
            dialog.close();
        }

        Replayer.i.parseData(obj.data);
    }
}