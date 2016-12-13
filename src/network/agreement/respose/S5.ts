/**
 * 断线重连
 */
class S5 {
    public parseData(obj: any) {
        if (!obj) return;

        console.log("断线重连", obj);
        //
        GSController.i.exit();

        GSDataProxy.i.S2C_RebackData(obj.data);
    }
}