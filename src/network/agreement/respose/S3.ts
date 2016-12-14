/**
 * 加入房间返回
 */
class S3 {
    public parseData(obj: any) {
        if (!obj || !obj.hasOwnProperty("data")) return;

        if (obj.code != 0) {
            return;
        }

        console.log("加入房子返回", obj);
        StackManager.closeDialog("JoininPanel");
    }
}