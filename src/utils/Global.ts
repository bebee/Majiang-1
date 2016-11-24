/**
* 游戏公用方法汇总
*/

module Global
{
	//等待界面，主要用在通讯等待展示
	export var waitPanel:WaitPanel;

	//喇叭界面
	export var hornPanel:HornPanel;

	/**
	* 录音图片
	*/
	export var _voiceImg:eui.Image;

	/**
	 * 分享图片
	 */
	export var share_img:eui.Image;

	export var share_sprite:egret.Sprite;

	export function showPao(some:any):void
	{
		var my = this;

		var chatid:number = +some.id;

		var uid = some.uid;

		var chat_pao:ChatPao = new ChatPao();

		var d:ChatDialog = StackManager.findDialog(ChatDialog, "ChatDialog");

		var chatlist:any = d.chat;

		var layer = GameLayerManager.gameLayer().mainLayer;

		layer.addChild(chat_pao);

		chat_pao._txt.text = chatlist[chatid].text;

		var player = GSData.i.roomPlayerMap[uid];
		var head = GSConfig.headTargetPos[player.dir];

		var _x:number = head.x;
		var _y:number = head.y;

		switch (+player.dir)
		{
			case 1:
				_y -= 120;
				_x -= 30;
				chat_pao._biao.x= 21;
				break;
			case 2:
				chat_pao._biao.x= 301;
				_x -= 306;
				_y -= 120;
				break;
			case 3:
				chat_pao._biao.x= 301;
				_y -= 70;
				_x -= 366;
				break;
			case 4:
				_y -= 120;
				_x -= 30;
				chat_pao._biao.x= 21;
				break;
		}

		chat_pao.x = _x;
		chat_pao.y = _y;

		function hideThis()
		{
			if(chat_pao && layer.contains(chat_pao))
			{
				layer.removeChild(chat_pao);

				chat_pao = null;
			}
		}

		egret.setTimeout(hideThis, my, 3000);
	}

	export function showShare(b:boolean = false)
	{
		var panel = GameLayerManager.gameLayer().loadLayer;

		if(b)
		{
			if(!this.share_img) this.share_img = new eui.Image();
			if(!this.share_sprite) this.share_sprite = new egret.Sprite();

			this.share_img.source = "share_img";

			panel.addChild(share_sprite);
			panel.addChild(share_img);

			this.share_sprite.graphics.clear();
			this.share_sprite.graphics.beginFill(0x0, 0.8);
			this.share_sprite.graphics.drawRect(0,0,GameConfig.curWidth(), GameConfig.curHeight());
			this.share_sprite.graphics.endFill();

			this.share_img.right = 0;
			this.share_img.bottom = 20;

		}
		else
		{
			if(this.share_img && panel.contains(this.share_img)) panel.removeChild(this.share_img);

			if(this.share_sprite && panel.contains(this.share_sprite))
			{
				this.share_sprite.graphics.clear();
				panel.removeChild(this.share_sprite);
			}
		}

	}

	//显示等待界面
	export function showWaritPanel(): void
	{
		if(Global.waitPanel && GameLayerManager.gameLayer().maskLayer.contains(Global.waitPanel)) return;

		Global.waitPanel = new WaitPanel(1);

		GameLayerManager.gameLayer().maskLayer.removeChildren();

		GameLayerManager.gameLayer().maskLayer.addChild(Global.waitPanel);
	}

	//移除界面
	export function hideWaritPanel(): void
	{
		if((Global.waitPanel != null) && GameLayerManager.gameLayer().maskLayer.contains(Global.waitPanel))
		{
			GameLayerManager.gameLayer().maskLayer.removeChild(Global.waitPanel);
		}
	}

	//获取html文本
	export function getTextFlow(str:string): egret.ITextElement[]
	{
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
	export function  getGlowFilter(cl:number = 0x33CCFF, ap:number = 0.8, bx:number = 35, by:number = 35, st:number = 2, qu:number = egret.BitmapFilterQuality.HIGH, inn:boolean = false, kn:boolean = false)
	{
		return [new egret.GlowFilter(cl, ap, bx, by, st, qu, inn, kn)];
	}

	/**
	* 创建一个颜色转换滤镜（图片变灰）
	* @returns {egret.ColorMatrixFilter[]}
	*/
	export function  getColorFlilter()
	{
		//颜色矩阵数组
		var colorMatrix = [
		0.3,0.6,0,0,0,
		0.3,0.6,0,0,0,
		0.3,0.6,0,0,0,
		0,0,0,1,0
		];

		return [new egret.ColorMatrixFilter(colorMatrix)];
	}

	/**
	* 创建一个模糊滤镜
	* @param dx 水平模糊量
	* @param dy 垂直模糊量
	* @returns {egret.BlurFilter[]}
	*/
	export function  getBlurFliter(dx:number = 1,dy:number = 1)
	{
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
	export function  getDropShadowFilter(di:number = 6, an:number = 45, co:number = 0x000000, al:number = 0.7, bx:number = 16, by:number = 16, st:number = 0.65, qu:number = egret.BitmapFilterQuality.LOW, inn:boolean = false, kn:boolean = false)
	{

		return [new egret.DropShadowFilter(di, an, co, al, bx, by, st, qu, inn, kn)];
	}

	/**
	* 显示喇叭界面
	*/
	export function showHorn(size:number = 20, color:number = 0xffffff):void
	{
		if(!Global.hornPanel) Global.hornPanel = new HornPanel();

		var group:eui.Group = GameLayerManager.gameLayer().hornGroup;

		if(group)
		{
			if(group.contains(Global.hornPanel)) return;

			var gameScene:GameMainScene = SceneManager.find("GameMainScene");

			if(!gameScene) return;

			if(!GameLayerManager.gameLayer().sceneLayer.contains(gameScene) || !GameLayerManager.gameLayer().sceneLayer.visible)
			{
				group.top = 20;
			}
			else
			{
				group.top = 120;
			}

			Global.hornPanel.playEff(group, size, color);
		}
	}


	/**
	* 显示录音
	*/
	export function showVoice():void
	{
		if(!this._voiceImg) this._voiceImg = new eui.Image();

		this._voiceImg.source = "voice_icon";

		this._voiceImg.horizontalCenter = 0;

		this._voiceImg.verticalCenter = 0;

		GameLayerManager.gameLayer().effectLayer.addChild(this._voiceImg);
	}

	/**
	* 关闭录音
	*/
	export function hideVoice():void
	{
		this.voiceStop = true;

		if(!this._voiceImg) return;

		if(GameLayerManager.gameLayer().effectLayer.contains(this._voiceImg))
		{
			GameLayerManager.gameLayer().effectLayer.removeChild(this._voiceImg);
		}
	}
}