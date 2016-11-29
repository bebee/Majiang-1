/**
 * HashMap
 * @Author Ace.c
 * @Create 2016-11-18 11:33
 */
class HashMap {
    private keys: string[];
    private contents: any;

    public constructor() {
        this.keys = [];
        this.contents = {};
    }

    /**
     * 添加键值对
     * @param key
     * @param value
     */
    public put(key: string, value: any): void {
        if (!this.contents.hasOwnProperty(key)) {
            this.keys.push(key);
        }
        this.contents[key] = value;
    }

    /**
     * 删除值
     * @param key
     * @returns {any}
     */
    public remove(key: string): any {
        if (this.contents.hasOwnProperty(key)) {
            var obj: any = this.contents[key];
            delete this.contents[key];
            this.delKey(key);
            return obj;
        } else {
            return null;
        }
    }

    /**
     * 获取值
     * @param key
     * @returns {any}
     */
    public getValue(key: string): any {
        if (this.contents.hasOwnProperty(key)) {
            return this.contents[key];
        } else {
            return null;
        }
    }

    /**
     * 删除键
     * @param key
     */
    private delKey(key: string): void {
        for (var i in this.keys) {
            if (this.keys[i] == key) {
                this.keys.splice(parseInt(i), 1);
            }
        }
    }

    /**
     * 检测是否含有指定键
     * @param key
     * @returns {boolean}
     */
    public has(key: string): boolean {
        return this.contents.hasOwnProperty(key);
    }

    /**
     * 获取长度
     * @returns {number}
     */
    public getSize(): number {
        return this.keys.length;
    }

    /**
     * 获取所有键的队列
     * @returns {string[]}
     */
    public getKeys(): Array<string> {
        return this.keys.concat();
    }
}