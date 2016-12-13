/**
 * 回放
 */
class S21 {
    public parseData(obj: any) {
        //回放数据
        console.log("回放数据:", obj);

        if (+obj.code == 0) {
            var dialog: RecordPanel = StackManager.findDialog(RecordPanel, "RecordPanel");
            dialog.hide();
        }

        Replayer.i.parseData(obj.data);
    }
}