/**
* 面板弹出管理类
*/
class PopUpUtils {

	static darkSprite: egret.Sprite;

	/**
	 * 添加面板方法
	 * panel            面板
	 * dark                背景是否变黑
	 * popUpWidth        指定弹窗宽度，定位使用
	 * popUpHeight        指定弹窗高度，定位使用
	 * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
	 */
	static addPopUp(panel, dark: boolean = false, popUpWidth: number = 0, popUpHeight: number = 0, effectType: number = 0, isAlert: boolean = false): void {
		//判断是否包含panel
		if (LayerManager.gameLayer().panelLayer.contains(panel)) {
			return;
		}
		panel.scaleX = 1;
		panel.scaleY = 1;
		panel.x = 0;
		panel.y = 0;
		panel.alpha = 1;

		if (dark) {
			if (!PopUpUtils.darkSprite) {
				PopUpUtils.darkSprite = new egret.Sprite();
				PopUpUtils.darkSprite.graphics.clear();
				PopUpUtils.darkSprite.graphics.beginFill(0x000000, 0.6);
				PopUpUtils.darkSprite.graphics.drawRect(0, 0, game.stageWidth, game.stageHeight);
				PopUpUtils.darkSprite.graphics.endFill();
				PopUpUtils.darkSprite.width = game.stageWidth;
				PopUpUtils.darkSprite.height = game.stageHeight;
			}

			if (!LayerManager.gameLayer().maskLayer.contains(PopUpUtils.darkSprite)) {
				LayerManager.gameLayer().maskLayer.addChild(PopUpUtils.darkSprite);
			}

			PopUpUtils.darkSprite.touchEnabled = true;
			PopUpUtils.darkSprite.visible = true;

		}

		LayerManager.gameLayer().panelLayer.addChild(panel);
		game.topPanel = panel;

		if (popUpWidth != 0) {
			panel.x = game.stageWidth / 2 - popUpWidth / 2;
			panel.y = game.stageHeight / 2 - popUpHeight / 2;
		}
		else {
			popUpWidth = panel.width;
			popUpHeight = panel.height;
		}

		//以下是弹窗动画
		var leftX: number = game.stageWidth / 2 - popUpWidth / 2;
		var upY: number = game.stageHeight / 2 - popUpHeight / 2;

		switch (effectType) {
			case 0:
				break;
			case 1:
				panel.alpha = 1;
				panel.scaleX = 0.5;
				panel.scaleY = 0.5;
				panel.x = panel.x + popUpWidth / 4;
				panel.y = panel.y + popUpHeight / 4;
				egret.Tween.get(panel).to({
					alpha: 1,
					scaleX: 1,
					scaleY: 1,
					x: panel.x - popUpWidth / 4,
					y: panel.y - popUpHeight / 4
				}, 300, egret.Ease.backOut);
				break;
			case 2:
				panel.alpha = 0;
				panel.scaleX = 0.5;
				panel.scaleY = 0.5;
				panel.x = panel.x + popUpWidth / 4;
				panel.y = panel.y + popUpHeight / 4;
				egret.Tween.get(panel).to({
					alpha: 1,
					scaleX: 1,
					scaleY: 1,
					x: panel.x - popUpWidth / 4,
					y: panel.y - popUpHeight / 4
				}, 600, egret.Ease.elasticOut);
				break;
			case 3:
				if (isAlert) {
					panel.x = -popUpWidth;
					egret.Tween.get(panel).to({x: leftX}, 500, egret.Ease.cubicOut);
				}
				else {
					panel.x = -popUpWidth;
					egret.Tween.get(panel).to({x: 0}, 500, egret.Ease.cubicOut);
				}
				break;
			case 4:
				if (isAlert) {
					panel.x = popUpWidth;
					egret.Tween.get(panel).to({x: leftX}, 500, egret.Ease.cubicOut);
				}
				else {
					panel.x = popUpWidth;
					egret.Tween.get(panel).to({x: 0}, 500, egret.Ease.cubicOut);
				}
				break;
			case 5:
				if (isAlert) {
					panel.y = -popUpHeight;
					egret.Tween.get(panel).to({y: upY}, 500, egret.Ease.cubicOut);
				}
				else {
					panel.y = -popUpHeight;
					egret.Tween.get(panel).to({y: 0}, 500, egret.Ease.cubicOut);
				}
				break;
			case 6:
				if (isAlert) {
					panel.y = game.stageHeight;
					egret.Tween.get(panel).to({y: upY}, 500, egret.Ease.cubicOut);
				}
				else {
					panel.y = popUpHeight;
					egret.Tween.get(panel).to({y: 0}, 500, egret.Ease.cubicOut);
				}
				break;
			default:
				break;
		}

	}

	/**
	 * 移除面板方法
	 * panel            面板
	 * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
	 */
	static removePopUp(panel, effectType: number = 0): void {
		var my = this;

		function close() {
			//判断是否包含panel
			if (LayerManager.gameLayer().panelLayer.contains(panel)) {
				LayerManager.gameLayer().panelLayer.removeChild(panel);
			}

			var onComplete: Function = function () {
				if (LayerManager.gameLayer().maskLayer.contains(PopUpUtils.darkSprite)) {
					LayerManager.gameLayer().maskLayer.removeChild(PopUpUtils.darkSprite);
					PopUpUtils.darkSprite.alpha = 1;
				}
			};

			if (LayerManager.gameLayer().panelLayer.numChildren <= 0 && PopUpUtils.darkSprite) {
				egret.Tween.get(PopUpUtils.darkSprite).to({alpha: 0}, 100).call(onComplete, my);
			}
		}

		//以下是弹窗动画
		switch (effectType) {
			case 0:
				break;
			case 1:
				egret.Tween.get(panel).to({
					alpha: 0,
					scaleX: 0,
					scaleY: 0,
					x: panel.x + panel.width / 2,
					y: panel.y + panel.height / 2
				}, 200).call(close, this);
				break;
			case 2:
				break;
			case 3:
				egret.Tween.get(panel).to({x: panel.width}, 500, egret.Ease.cubicOut).call(close, my);
				break;
			case 4:
				egret.Tween.get(panel).to({x: -panel.width}, 500, egret.Ease.cubicOut).call(close, my);
				break;
			case 5:
				egret.Tween.get(panel).to({y: panel.height}, 500, egret.Ease.cubicOut).call(close, my);
				break;
			case 6:
				egret.Tween.get(panel).to({y: -panel.height}, 500, egret.Ease.cubicOut).call(close, my);
				break;
			default:
				break;
		}
	}
}