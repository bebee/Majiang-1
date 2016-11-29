/**
 * BaseCharVo
 * @Author Ace
 * @Create 2016-09-04 14:34
 */
class BaseCharVo extends BaseVo {
    //昵称
    public nick: string;
    //头像
    public portrait: string;
    //联盟简称
    public short_name: string;


    public update(data: any): void {
        super.update(data);

        if (this.portrait == "default") {
            this.portrait = "1001";
        }
    }
}