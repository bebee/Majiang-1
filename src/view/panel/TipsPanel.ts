class TipsPanel extends BasePanel {

    private lab_description: eui.Label;

    public constructor() {
        super();
        this.skinName = "TipsPanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setType(BgViewType.curtain);
        this.bgView.setTitle("msg_title");

        this.lab_description.text = "" +
            "代理加盟咨询   lyqp01　 【微信】\n" +
            "房卡问题咨询   CCTV1V5【公众号】\n" +
            "投诉建议举报   CCTV1V5【公众号】";
    }
}