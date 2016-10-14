$(function() {
	//A、B玩家头像
	var playersHeadA = $("#playersHeadA");
	var playersHeadB = $("#playersHeadB");
	//获取支持按钮
	var supportA = $("#supportA");
	var supportB = $("#supportB");

	//创建A玩家的用户信息
	var playAInfoObject = {
		headurl: null,
		name: null,
		lv: null,
		rateOfWin: null,
		totalGames: null,
		gamesOfWin: null,
		winningStreak: null,
		lastTenGame: null,
		gold: null,
	}
	var playBInfoObject = {
		headurl: null,
		name: null,
		lv: null,
		rateOfWin: null,
		totalGames: null,
		gamesOfWin: null,
		winningStreak: null,
		lastTenGame: null,
		gold: null,
	}

	//ajax加载访问后台，缓存A玩家和B玩家的信息
	$.ajax({
		type: "get",
		url: "#",
		async: true,
		success: function(data) {
			playAInfoObject = {
				headurl: "img/bb.png",
				name: "Armstrong",
				lv: "LV25",
				rateOfWin: "90%",
				totalGames: "42",
				gamesOfWin: "30",
				winningStreak: "6",
				lastTenGame: [true, false, true, true, true, true, false, true, true, false],
				gold: 1532444,
			}
			playBInfoObject = {
					headurl: "img/aa.png",
					name: "Brmstrong",
					lv: "LV30",
					rateOfWin: "80%",
					totalGames: "40",
					gamesOfWin: "30",
					winningStreak: "5",
					lastTenGame: [true, true, true, false, true, true, false, false, true, true],
					gold: 1352475,
				}
				//获取到玩家信息后调用
			main(playAInfoObject, playBInfoObject);
		}
	});

	function main(playAInfoObject, playBInfoObject) {

		//获取到A、B两个对象
		var playAInfoObject = playAInfoObject;
		var playBInfoObject = playBInfoObject;
		//给头像赋值
		$("#playersHeadA img").attr("src", playAInfoObject.headurl);
		$("#playersHeadB img").attr("src", playBInfoObject.headurl);
		//赋值名字
		$("#playersAName").text(playAInfoObject.name);
		$("#playersBName").text(playBInfoObject.name);
		//赋值等级
		$("#playersAGrade").text(playAInfoObject.lv);
		$("#playersBGrade").text(playBInfoObject.lv);
		//赋值胜率
		$("#playersArateofWin").text("WIN" + playAInfoObject.rateOfWin);
		$("#playersBrateofWin").text("WIN" + playBInfoObject.rateOfWin);

		//点击A玩家头像展示用户信息
		playersHeadA.on("touchstart", function() {
			$("#playInfoShow").show();
			$("#realTimeGradeInfo").hide();
			$("#bet").hide();
			$("#confirm").hide();

			$("#playPic img").attr("src", playAInfoObject.headurl)
			$("#playShowName").text(playAInfoObject.name);
			$("#playShowGrade").text(playAInfoObject.lv);
			$("#playShowrateofWin").text("WIN" + playAInfoObject.rateOfWin);
			$("#matchSum span:nth-child(2)").text(playAInfoObject.totalGames);
			$("#rateOfWin span:nth-child(2)").text(playAInfoObject.rateOfWin);
			$("#totleOfWin span:nth-child(2)").text(playAInfoObject.gamesOfWin);
			$("#winOfStreak span:nth-child(2)").text(playAInfoObject.winningStreak);
			$("#lastTenMatchShow").html("");
			$("#playPic").css({
				border: "2px solid #ff5569"
			});
			$("#playShowGrade,#playShowrateofWin").css({
				background: "#ff5569"
			});
			for(var i = 0; i < 10; i++) {
				if(playAInfoObject.lastTenGame[i]) {
					var span = $("<span class='matchShow matchShowWin'>胜</span>");
				} else {
					var span = $("<span class='matchShow matchShowlost'>负</span>");
				}
				$("#lastTenMatchShow").append(span);
			}

		});

		//点击B玩家头像展示用户信息
		playersHeadB.on("touchstart", function() {
			$("#playInfoShow").show();
			$("#realTimeGradeInfo").hide();
			$("#bet").hide();
			$("#confirm").hide();

			$("#playPic img").attr("src", playBInfoObject.headurl)
			$("#playShowName").text(playBInfoObject.name);
			$("#playShowGrade").text(playBInfoObject.lv);
			$("#playShowrateofWin").text("WIN" + playBInfoObject.rateOfWin);
			$("#matchSum span:nth-child(2)").text(playBInfoObject.totalGames);
			$("#matchSum span:nth-child(2)").text(playBInfoObject.totalGames);
			$("#rateOfWin span:nth-child(2)").text(playBInfoObject.rateOfWin);
			$("#totleOfWin span:nth-child(2)").text(playBInfoObject.gamesOfWin);
			$("#winOfStreak span:nth-child(2)").text(playBInfoObject.winningStreak);
			$("#lastTenMatchShow").html("");
			$("#playPic").css({
				border: "2px solid #00d4c3"
			});
			$("#playShowGrade,#playShowrateofWin").css({
				background: "#00d4c3"
			});
			for(var i = 0; i < 10; i++) {
				if(playBInfoObject.lastTenGame[i]) {
					var span = $("<span class='matchShow matchShowWin'>胜</span>");
				} else {
					var span = $("<span class='matchShow matchShowlost'>负</span>");
				}
				$("#lastTenMatchShow").append(span);
			}
		});

		//点击支持展示支持信息
		supportA.on("touchstart", function() {
			$("#bet").show();
			$("#playInfoShow").hide();
			$("#realTimeGradeInfo").hide();
			$("#confirm").hide();

			//获取名字
			var playA = playAInfoObject.name;
			var goldA = playAInfoObject.gold;
			$("#supportplay span").text(playA);
			$("#myGold span").text(goldA);

		});
		supportB.on("touchstart", function() {
			$("#bet").show();
			$("#playInfoShow").hide();
			$("#realTimeGradeInfo").hide();
			$("#confirm").hide();

			var playB = playBInfoObject.name;
			var goldB = playBInfoObject.gold;
			$("#supportplay span").text(playB);
			$("#myGold span").text(goldB);
		});

		//定义押金币数量和获取金币数量
		var betGold = 0;
		var getGold = 0;
		$("#chip").on("touchstart", ".chipEvery", function(ev) {
			var goldStr = $(this).find("p:nth-of-type(2)").text();
			var strTemp = goldStr.split(",");
			var goldNum = strTemp.join("");
			betGold += Number(goldNum);
			getGold = Number(betGold) * 1.6;

			var showbetGold = betGold.toLocaleString();
			var showgetMoney = getGold.toLocaleString();

			$("#betMoney span").text(showbetGold);
			$("#getMoney span").text(showgetMoney);

		});

		//点击压分页面的确认按钮   打开确认界面
		$("#confirmAndcancel button:nth-of-type(1)").on("touchstart", function() {
			$("#confirm").show();
			$("#confirmPlay").text($("#supportplay span").text());
			$("#confirmMoney span").text(betGold.toLocaleString());

		})
		
		//点击压分页面取消按钮 压分金币归零 压分界面取消，回到最初界面
		$("#confirmAndcancel button:nth-of-type(2)").on("touchstart", function() {
			$("#bet").hide();
			$("#realTimeGradeInfo").show();
			betGold = 0;
			getGold = 0;
			$("#confirmPlay").text($("#supportplay span").text());
			$("#confirmMoney span").text(betGold.toLocaleString());

		})

		//确认界面点击确认按钮
		$("#confirmBtn button:nth-child(2)").on("touchstart", function() {
			alert("提交成功");
			$("#confirm").hide();
			//提交成功后分数归零
			betGold = 0;
			getGold = 0;
		});

		//确认界面点击取消按钮
		$("#confirmBtn button:nth-child(1)").on("touchstart", function() {
			$("#confirm").hide();
		});

	}

})