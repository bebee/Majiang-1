/**
* 游戏公用方法汇总
*/
class Global {
	//等待界面，主要用在通讯等待展示
	static waitPanel: WaitPanel;

	//喇叭界面
	static hornPanel: HornView;

	/**
	 * 录音图片
	 */
	static _voiceImg: eui.Image;

	/**
	 * 分享图片
	 */
	static share_img: eui.Image;
	static share_sprite: egret.Sprite;

	/**
	 * IP相同提醒
	 */
	static ipwarmGroup: eui.Group;
	static ipwarmSprite: egret.Sprite;
	static ipwarmLabel: eui.Label;
	static ipwarmisshow: boolean = false;

	/**
	 * 掉线处理
	 */
	static reLogin(): void {
		var count: number = game.connectCount;

		switch (count) {
			case 0:
				Global.sendLoad();
				break;
			case 1:
				game.askPanel.showMsg(function (r) {
					Global.sendLoad();
				}, "您已经掉线，请点击确定重连！");
				break;
			default:
				game.player.code = null;
				Global.sendLoad();
				break;
		}
	}

	/**
	 * 掉线后发送重新登录消息  或者  重新拉取授权
	 */
	static sendLoad() {
		var p = game.player;

		if (p.code) {
			SocketManager.getInstance().getGameConn().send(1, {"uid": p.uid, "code": p.code, "length": p.code.length});
			game.connectCount++;
		}
		else {
			var count: number = +gameLocal.getData(gameLocal.loginAccessCode);

			if (count < 2) {
				Weixin.getAccessCode(gameConfig.appid, gameConfig.clientUrl, game.roomid);
				count++;
				gameLocal.setData(gameLocal.loginAccessCode, count);
			}
			else {
				game.askPanel.showMsg(function (r) {
					NativeApi.setLocalData("getAccessCode", 0);
					Weixin.closeWindow();
				}, "登录失败，请退出游戏重试！\n\n(请检查是否在其他设备登录)");
			}
		}
	}

	/**
	 * 手机震动
	 * @param num 震动时间
	 */
	static phoneVibrate(num: number = 2000): void {
		if (navigator.vibrate) {
			navigator.vibrate(num);
		}
	}

	/**
	 * 显示IP相同提示
	 * @param arr
	 */
	static showIP(arr: Array<any> = []): void {
		if (this.ipwarmisshow) return;

		if (!arr || arr.length <= 0) return;

		var isT: boolean = false;

		for (var i = 0; i < arr.length; i++) {
			var pi = arr[i];

			if (!pi) continue;

			for (var j = 0; j < arr.length; j++) {
				var pj = arr[j];

				if (!pj) continue;

				if (+pi.uid == +pj.uid) continue;

				if (pi.ip == pj.ip) {
					isT = true;
					break;
				}
			}

			if (isT) break;
		}

		if (!isT) return;


		this.ipwarmisshow = true;
		if (!this.ipwarmGroup) {
			this.ipwarmGroup = new eui.Group();
			this.ipwarmGroup.width = game.stageWidth;
			this.ipwarmGroup.height = 50;
			this.ipwarmGroup.touchEnabled = false;
			this.ipwarmGroup.touchChildren = false;
		}

		if (!this.ipwarmSprite) {
			this.ipwarmSprite = new egret.Sprite();
			this.ipwarmSprite.graphics.clear();
			this.ipwarmSprite.graphics.beginFill(0x0, 0.5);
			this.ipwarmSprite.graphics.drawRoundRect(0, 0, this.ipwarmGroup.width, this.ipwarmGroup.height, 30, 30);
			this.ipwarmSprite.graphics.endFill();
			this.ipwarmGroup.addChild(this.ipwarmSprite);
		}

		if (!this.ipwarmLabel) {
			this.ipwarmLabel = new eui.Label();
			this.ipwarmLabel.horizontalCenter = 0;
			this.ipwarmLabel.verticalCenter = 0;
			this.ipwarmLabel.textAlign = "center";
			this.ipwarmLabel.size = 20;
			this.ipwarmLabel.fontFamily = gameConfig.FontFamily;
			this.ipwarmLabel.text = "注意：有玩家IP地址相同，请点击玩家头像查看";
			this.ipwarmGroup.addChild(this.ipwarmLabel);
		}

		var group = LayerManager.gameLayer();
		group.addChild(this.ipwarmGroup);
		this.ipwarmGroup.y = game.stageHeight;

		var my = this;
		egret.Tween.get(my.ipwarmGroup, {loop: false}).to({y: game.stageHeight - my.ipwarmGroup.height + 5}, 1000).to({}, 5000).to({y: game.stageHeight}, 1000).call(function () {
			group.removeChild(my.ipwarmGroup);
			my.ipwarmisshow = false;
		}, my);
	}

	/**
	 * 聊天表情
	 * @param some
	 */
	static showExpression(some: any): void {
		var my = this;

		var chatid: number = +some.id;

		var uid = some.uid;

		var chat_pao: ChatExpression = new ChatExpression();

		var layer = LayerManager.gameLayer().mainLayer;

		layer.addChild(chat_pao);


		var player = game.roomPlayers[uid];
		var head = GSConfig.headTargetPos[player.dir];

		var _x: number = head.x;
		var _y: number = head.y;

		switch (+player.dir) {
			case 1:
				_x += 40;
				_y -= 40;
				break;
			case 2:
				_x -= 120;
				_y -= 40;
				break;
			case 3:
				_x -= 120;
				_y -= 40;
				break;
			case 4:
				_x += 40;
				_y -= 40;
				break;
		}

		chat_pao.x = _x;
		chat_pao.y = _y;

		chat_pao.plays(chatid);

		function hideThis() {
			if (chat_pao && layer.contains(chat_pao)) {
				chat_pao.stop();

				layer.removeChild(chat_pao);

				chat_pao = null;
			}
		}

		egret.setTimeout(hideThis, my, 3000);
	}

	/**
	 * 显示聊天气泡
	 * @param some
	 */
	static showPao(some: any): void {
		var my = this;

		var chatid: number = +some.id;

		var uid = some.uid;

		var chat_pao: ChatPao = new ChatPao();

		var chatlist: any = gameConfig.chat;

		var layer = LayerManager.gameLayer().mainLayer;

		layer.addChild(chat_pao);

		for (var idk in chatlist) {
			var idkdata = chatlist[idk];

			if (+idkdata.id == +chatid) {
				chat_pao._txt.text = idkdata.text;
				break;
			}
		}

		var player = game.roomPlayers[uid];
		var head = GSConfig.headTargetPos[player.dir];

		var _x: number = head.x;
		var _y: number = head.y;

		switch (+player.dir) {
			case 1:
				chat_pao._biao.x = 21;
				_x += 10;
				_y -= 80;
				break;
			case 2:
				chat_pao._biao.x = 301;
				_x -= 266;
				_y -= 80;
				break;
			case 3:
				chat_pao._biao.x = 301;
				_x -= 326;
				_y -= 10;
				break;
			case 4:
				_x += 10;
				_y -= 80;
				chat_pao._biao.x = 21;
				break;
		}

		chat_pao.x = _x;
		chat_pao.y = _y;

		function hideThis() {
			if (chat_pao && layer.contains(chat_pao)) {
				layer.removeChild(chat_pao);

				chat_pao = null;
			}
		}

		egret.setTimeout(hideThis, my, 3000);
	}

	static showShare(b: boolean = false) {
		var panel = LayerManager.gameLayer().loadLayer;

		if (b) {
			if (!this.share_img) this.share_img = new eui.Image();
			if (!this.share_sprite) this.share_sprite = new egret.Sprite();

			this.share_img.source = "share_img";

			panel.addChild(this.share_sprite);
			panel.addChild(this.share_img);

			this.share_sprite.graphics.clear();
			this.share_sprite.graphics.beginFill(0x0, 0.8);
			this.share_sprite.graphics.drawRect(0, 0, game.stageWidth, game.stageHeight);
			this.share_sprite.graphics.endFill();

			this.share_img.right = 0;
			this.share_img.bottom = 20;

		}
		else {
			if (this.share_img && panel.contains(this.share_img)) panel.removeChild(this.share_img);

			if (this.share_sprite && panel.contains(this.share_sprite)) {
				this.share_sprite.graphics.clear();
				panel.removeChild(this.share_sprite);
			}
		}

	}

	//显示等待界面
	static showWaritPanel(): void {
		if (Global.waitPanel && LayerManager.gameLayer().maskLayer.contains(Global.waitPanel)) return;

		Global.waitPanel = new WaitPanel(1);

		LayerManager.gameLayer().maskLayer.removeChildren();

		LayerManager.gameLayer().maskLayer.addChild(Global.waitPanel);
	}

	//移除界面
	static hideWaritPanel(): void {
		if ((Global.waitPanel != null) && LayerManager.gameLayer().maskLayer.contains(Global.waitPanel)) {
			LayerManager.gameLayer().maskLayer.removeChild(Global.waitPanel);
		}
	}

	//获取html文本
	static getTextFlow(str: string): egret.ITextElement[] {
		var styleParser = new egret.HtmlTextParser();

		return styleParser.parser(str);
	}

	/**
	 * 创建一个发光滤镜
	 * @param cl 光晕的颜色，十六进制，不包含透明度
	 * @param ap 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%
	 * @param bx 水平模糊量。有效值为 0 到 255.0（浮点）
	 * @param by 垂直模糊量。有效值为 0 到 255.0（浮点）
	 * @param st 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
	 * @param qu 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现(LOW,HIGH,MEDIUM)
	 * @param inn 指定发光是否为内侧发光，暂未实现
	 * @param kn 指定对象是否具有挖空效果，暂未实现
	 * @returns {egret.GlowFilter[]}
	 */
	static getGlowFilter(cl: number = 0x33CCFF, ap: number = 0.8, bx: number = 35, by: number = 35, st: number = 2, qu: number = egret.BitmapFilterQuality.HIGH, inn: boolean = false, kn: boolean = false) {
		return [new egret.GlowFilter(cl, ap, bx, by, st, qu, inn, kn)];
	}

	/**
	 * 创建一个颜色转换滤镜（图片变灰）
	 * @returns {egret.ColorMatrixFilter[]}
	 */
	static getColorFlilter() {
		//颜色矩阵数组
		var colorMatrix = [
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0, 0, 0, 1, 0
		];

		return [new egret.ColorMatrixFilter(colorMatrix)];
	}

	/**
	 * 创建一个模糊滤镜
	 * @param dx 水平模糊量
	 * @param dy 垂直模糊量
	 * @returns {egret.BlurFilter[]}
	 */
	static getBlurFliter(dx: number = 1, dy: number = 1) {
		return [new egret.BlurFilter(dx, dy)];
	}

	/**
	 *创建一个投影滤镜
	 * @param di 阴影的偏移距离，以像素为单位
	 * @param an 阴影的角度，0 到 360 度
	 * @param co 阴影的颜色，不包含透明度
	 * @param al 光晕的颜色透明度，是对 color 参数的透明度设定
	 * @param bx 水平模糊量。有效值为 0 到 255.0（浮点）
	 * @param by 垂直模糊量。有效值为 0 到 255.0（浮点）
	 * @param st 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
	 * @param qu 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现(LOW,HIGH,MEDIUM)
	 * @param inn 指定发光是否为内侧发光，暂未实现
	 * @param kn 指定对象是否具有挖空效果，暂未实现
	 * @returns {egret.DropShadowFilter[]}
	 */
	static getDropShadowFilter(di: number = 6, an: number = 45, co: number = 0x000000, al: number = 0.7, bx: number = 16, by: number = 16, st: number = 0.65, qu: number = egret.BitmapFilterQuality.LOW, inn: boolean = false, kn: boolean = false) {

		return [new egret.DropShadowFilter(di, an, co, al, bx, by, st, qu, inn, kn)];
	}

	/**
	 * 显示喇叭界面
	 */
	static showHorn(size: number = 20, color: number = 0xffffff): void {
		if (!Global.hornPanel) Global.hornPanel = new HornView();

		var group: eui.Group = LayerManager.gameLayer().hornGroup;

		if (group) {
			if (group.contains(Global.hornPanel)) return;

			var gameScene: MainScene = SceneManager.find("MainScene");

			if (!gameScene) return;

			if (!LayerManager.gameLayer().sceneLayer.contains(gameScene) || !LayerManager.gameLayer().sceneLayer.visible) {
				group.top = 20;
			}
			else {
				group.top = 120;
			}

			Global.hornPanel.playEff(group, size, color);
		}
	}


	/**
	 * 显示录音
	 */
	static showVoice(): void {
		if (!this._voiceImg) this._voiceImg = new eui.Image();

		this._voiceImg.source = "voice_icon";

		this._voiceImg.horizontalCenter = 0;

		this._voiceImg.verticalCenter = 0;

		LayerManager.gameLayer().effectLayer.addChild(this._voiceImg);
	}

	/**
	 * 关闭录音
	 */
	static hideVoice(): void {
		// this.voiceStop = true;

		if (!this._voiceImg) return;

		if (LayerManager.gameLayer().effectLayer.contains(this._voiceImg)) {
			LayerManager.gameLayer().effectLayer.removeChild(this._voiceImg);
		}
	}

	/**
	 * 根据秒获得时间字符串
	 * @param seconds
	 * @returns {string}
	 */
	static getStringBySeconds(millisecond: number): string {

		if (!(millisecond >= 1000)) return "00:00:00";
		var seconds: number = Math.floor(millisecond / 1000);

		var hour: number = Math.floor(seconds / 3600);

		var minutes: number = Math.floor(seconds / 60);

		var sec: number = Math.floor(seconds % 60);

		minutes %= 60;

		var s: string = "";

		if (hour < 10) {
			s += "0";
		}

		if (hour > 24) {
			var day = 0;
			day = Math.floor(hour / 24);
			hour -= day * 24;
			s += day + "天 ";
		}

		s += hour.toString() + ":";

		if (minutes < 10) {
			s += "0";
		}

		s += minutes.toString() + ":";

		if (sec < 10) {
			s += "0";
		}

		s += sec.toString();

		return s;
	}
}