# 四川麻将


# 规则

%%自摸加底
-define(Choice_Rule_Zimojiadi,9).
%%自摸加番
-define(Choice_Rule_Zimojiafan,10).
%%点杠花（点炮）
-define(Choice_Rule_Dianganghua_Pao,11).
%%点杠花（自摸）
-define(Choice_Rule_Zerenzhi_Mo,12).
%%换三张
-define(Choice_Rule_Huansanzhang,13).
%%幺九将对
-define(Choice_Rule_Yaojiujiangdui,14).
%%门清中张
-define(Choice_Rule_Menqingzhongzhang,15).
%%天地胡
-define(Choice_Rule_Tiandihu,16).
%%血战到底
-define(Choice_Rule_Xuezhan,17).
%%血流成河
-define(Choice_Rule_Xueliu,18).
%%封顶
-define(Choice_Rule_Fengding,19).
%%三人两房
-define(Choice_Rule_Sanrenliangfang,20).
%%三人三房
-define(Choice_Rule_Sanrensanfang,21).
%%四人两房
-define(Choice_Rule_Sirenliangfang,22).


# 传输协议定义

-define(Action_Room_Login,1).%登录
-define(Action_Room_Create,2).%创建房间
-define(Action_Room_Join,3).%加入房间
-define(Action_Room_Play,4).%打牌
-define(Action_Room_Resume,5).%断线重连
-define(Action_Room_Dismiss,6).%解散房间
-define(Action_User_Bind_Agent,7).%绑定代理
-define(Action_Room_Presence,8).%房间 出席信息同步
-define(Action_Room_Notice,9).%通知事件
[
    -define(Event_Type_Start,1).%通知房主开启游戏
    -define(Event_Type_Turn,2).%轮到谁
    -define(Event_Type_Interrupt,3).%触发中断
    -define(Event_Type_Interrupt_Other,4).%别人触发中断
    -define(Event_Type_Bu_Rob,5).%补杠被劫
    -define(Event_Type_Bu_Rob_Pre,6).%我要补杠,有人能截啊
    -define(Event_Type_Huansanzhang,7).%换三张
    -define(Event_Type_Dingque,8).%定缺
    -define(Event_Type_Huansanzhang_Other,9).%有人提交了换三张
]
-define(Action_Room_Start,10).%开启游戏
-define(Action_Room_Pai,11).%同步牌信息
[
    -define(Pai_Change_Init,100).%初始化手牌
    -define(Pai_Change_Zhua,200).%抓牌
    -define(Pai_Change_Bao,300).%换宝
    -define(Pai_Change_Change_Three,301).%换3张
    -define(Pai_Change_Change_Lack,302).%定缺
]
-define(Action_Room_Leave,12).%离开房间
-define(Action_Room_Finish,13).%游戏结束
-define(Action_Room_Dismiss_Vote,14).%解散房间投票
-define(Action_Room_Interrupt_Deal,15).%处理中断
-define(Action_Room_Settlement,16).%局结算
-define(Action_Room_Continue,17).%再来一局
-define(Action_Active_Check,18).%客户端 活跃 检测
-define(Action_Record_Get_ALL,19).%获取战绩列表
-define(Action_Record_Get_Detail,20).%获取战绩详细列表
-define(Action_Record_Get_Playback,21).%获取回放信息
-define(Action_Room_Kick,22).%踢人
-define(Action_Room_BeKick,23).%被踢人
-define(Action_Card_Update,24).%卡数变化
-define(Action_Msg_Broadcast,25).%牌桌 消息广播
-define(Action_Msg_Broadcast_All,26).%所有消息广播


# --------------------

-define(Interrupt_Chi,1).
-define(Interrupt_Cha,2).
-define(Interrupt_Gang,3).
-define(Interrupt_Ting,4).
-define(Interrupt_Xi,5).
-define(Interrupt_Hu_Zhuang,6).%%庄家
-define(Interrupt_Hu_Zimo,7).%%自摸
-define(Interrupt_Hu_zhanli,8).%%站立
-define(Interrupt_Hu_Daiji,9).%%带鸡
-define(Interrupt_Hu_Jahu,10).%%夹胡
-define(Interrupt_Hu_Shuangpiao,11).%%双飘
-define(Interrupt_Hu_Danpiao,12).%%单飘
-define(Interrupt_Hu_Mobao,13).%%摸宝
-define(Interrupt_Hu_Baozhongbao,14).%%宝中宝
-define(Interrupt_Hu_Tongbao,15).%%通宝
-define(Interrupt_Hu_Menqing,16).%%门清
-define(Interrupt_Hu_Dianpao,17).%%点炮
-define(Interrupt_Hu_Qingyise,18).%%清一色
-define(Interrupt_Hu_Gangkai,19).%%杠开
-define(Interrupt_Hu_Anjiao,20).%%暗叫
-define(Interrupt_Hu_Hdly,21).%%海底捞月
-define(Interrupt_Gang_Yaojiu,22).%%幺九杠
-define(Interrupt_Gang_Xuanfeng,23).%%旋风杠
-define(Interrupt_Gang_an,24).%%暗杠
-define(Interrupt_Gang_Ming,25).%%明杠
-define(Interrupt_Gang_ZFB,26).%%中发白杠
-define(Interrupt_Gang_Yaojiu_Bu,27).%%幺九杠补
-define(Interrupt_Gang_ZFB_Bu,28).%%中发白杠补
-define(Interrupt_Hu_Tian,29).%%天胡
-define(Interrupt_Hu_Jiawu,30).%%夹五
-define(Interrupt_Hu_Qidui,31).%%七对
-define(Interrupt_Hu_Qidui_Long,32).%%七对 的 龙
-define(Interrupt_Hu_Jiang,33).%%将
-define(Interrupt_Hu_Zhongzhang,34).%%中张
-define(Interrupt_Huansanzhang,35).%%换三张
-define(Interrupt_Hu_Jingoudiao,36).%%金钩吊
-define(Interrupt_Hu_Di,37).%%地胡
-define(Interrupt_Hu_QuanYJ,38).%%全幺九
-define(Interrupt_Gang_Guoshou,39).%%过手杠
-define(Interrupt_Hu_Yipaoduoxiang,40).%%一炮多响
-define(Interrupt_Hu_Gangpao,41).%%杠上炮(呼叫转移)
-define(Interrupt_Hu_JiangQidui,42).%%将七对
-define(Interrupt_Hu_LongQidui,43).%%龙七对
-define(Interrupt_Hu_Qianggang,44).%%抢杠胡
-define(Interrupt_Hu_Dianpao_Rcv,45).%%接炮
-define(Interrupt_Hu_Gen,46).%%根儿
-define(Interrupt_Hu_Chadajiao,47).%%查大叫
-define(Interrupt_Hu_Kaertiao,48).%%卡二条
-define(Interrupt_Hu,99).
-define(Interrupt_Jiang,999).
-define(Interrupt_Dingque,9999).
