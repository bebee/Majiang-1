/**
 * Created by Administrator on 2016/10/29.
 */
class RoomPlayer {
    channel: string;
    ip: string;
    nick: string;
    openid: string;
    pic: string;
    pos: number;
    status: string;
    uid: string;
    sex: string;
    //
    dir: number;


    constructor(obj: any) {
        for (var prop in obj) {
            this[prop] = obj[prop];
        }
    }
}