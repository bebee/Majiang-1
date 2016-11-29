/**
 * BaseVo
 * @Author Ace.c
 * @Create 2016-09-07 16:00
 */
class BaseVo {

    public constructor(key: any = null, value: any = null) {
        this.setData(key, value);
    }

    /**
     * 获取
     */
    public getData(key: any): any {
        return this[key];
    }

    /**
     * 添加
     */
    public setData(key: any, value: any): any {
        this[key] = value;
        return this;
    }

    /**
     * 更新数
     */
    public update(data: any): void {
        if (!data) return;

        for (var key in data) {
            this.setData(key, data[key]);
        }
    }
}