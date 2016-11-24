/**
 * 绑定玩家
 */
class _7
{
    public writeData(obj:any)
    {

        if(!obj)
        {
            obj = {"sequence":7, "args":{}};
        }

        return JSON.stringify(obj);
    }
}