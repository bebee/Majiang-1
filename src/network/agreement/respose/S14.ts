/**
 * 解散房间投票
 */
class S14 {
    public parseData(obj: any) {
        if (!obj) return;

        if (+obj.code != 0) return;

        game.dissolution = new DissolutionVo();
        game.dissolution.vote = obj.data.vote;
        game.dissolution.timestamp = obj.timestamp;

        var dialog: DissolutionPanel = StackManager.findDialog(DissolutionPanel, "DissolutionPanel");

        if (dialog) {
            if (!LayerManager.gameLayer().panelLayer.contains(dialog)) {
                dialog.show();
            }

            dialog.refresh();
        }
    }
}