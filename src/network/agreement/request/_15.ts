/**
 * 中断处理
 */
class _15
{
    public writeData(obj:any)
    {
        if(obj["action"])
        {
            console.log(obj["action"]);

            if(obj["pai"]) console.log(obj["pai"]);
        }

        return JSON.stringify(obj);
    }
}