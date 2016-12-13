class PlayerVo extends BaseDataVo {
    //当前平台
    channel: string;
    //code
    code: string;
    //版本号
    version: string;

    //玩家游戏中的唯一标识
    uid: string;
    //玩家的平台开放编号
    openid: string;
    //玩家昵称
    nick: string;
    //玩家性别
    sex: number = 0;
    //玩家头像链接
    pic: string = "";//http://img5.imgtn.bdimg.com/it/u=3367843572,1393769595&fm=21&gp=0.jpg";
    //头像数据
    playerHeadTexture: egret.Texture;
    //玩家IP
    ip: string = "192.168.2.1";
    //实名
    name: string;
    //身份证
    id_no: string;
    //绑定的上线玩家
    agent: number = 0;
    //掉线率
    drop_rate: number;
    //游戏次数
    game_times: number;
    //当前房卡数量
    cur: number;
    //玩家总共拥有过的房卡数量
    zong: number;

    //位置
    pos: number = -1;
    //方向
    dir: number = -1;
    //状态
    status: string = "";

    //房间玩家队列
    playerInfo: any[] = [];

    constructor(data: any = null) {
        super();

        if (data) {
            this.update(data);
        }
    }

    update(data: any) {
        super.update(data);

        this.sex = this.sex == GameGender.Male ? GameGender.Male : GameGender.Female;
        this.dir = this.pos != -1 ? GSData.i.getDir(this.pos) : -1;
    }
}