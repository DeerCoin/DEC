<template>
	<div style="position: relative;">
		<header class="mui-bar mui-bar-nav" style="background:#fff;box-shadow: none;height: 0.88rem;">
			<h1 class="mui-title">鹿特币</h1>
			<div class="kefu" @click="QYC.click('showKefu')">
				<img src="../../../assets/images/home/kefu.png">
			</div>
		</header>
		<div style="width: 100%; height: 0.88rem"></div>

		<div class="gameBox" id="gameBox">
			<img src="../../../assets/images/home/loading.gif" class="loading">
			<iframe :src="iframe_src" allowfullscreen id="mills" marginheight="0" marginwidth="0" frameBorder=0 scrolling=no></iframe>
		</div>

		<div class="userInfoBox">
			<div class="userAvatar">
				<!-- <img :src="userinfo.avatar"> -->
				<img src="../../../assets/images/home/touxiang.png">
				<span v-if="kslevel == -1">未激活</span>
				<span v-if="kslevel == 0">矿工</span>
				<span v-if="kslevel == 1">一级矿商</span>
				<span v-if="kslevel == 2">二级矿商</span>
				<span v-if="kslevel == 3">三级矿商</span>
			</div>
			<div class="userInfo">
				<div class="userInfoItem">
					<img src="../../../assets/images/home/r.png">{{userinfo.nickname}}<span @click="QYC.click('toSet')">【设置】</span>
				</div>
				<div class="userInfoItem">
					<img src="../../../assets/images/home/dh.png">账号：{{userinfo.phone}}
				</div>
				<div class="userInfoItem">
					<img src="../../../assets/images/home/tj.png">推荐人：{{userinfo.superiorname}}
				</div>
				<div class="userInfoItem">
					<img src="../../../assets/images/home/yq.png">邀请码：{{invitecode}}
				</div>
			</div>

			<div class="qdBox" :class="isAsign?'signed':''" @click="QYC.click('toAsign')">
				<img src="../../../assets/images/home/qiandao.png" />
				<p v-show="!isAsign">签到</p>
				<p v-show="isAsign">已签到</p>
			</div>
			<div class="copy1" v-clipboard:copy="invitecode" v-clipboard:success="onCopy" v-clipboard:error="onError">复制邀请码</div>
			<div class="packet">
				<span>钱包地址</span>
				<p>{{qbdizhi.substr(0,28)}}</p>
				<div class="copy2" @click="QYC.click('copyTg')">复制钱包地址</div>
			</div>
		</div>
		<ul class="home_tab">
			<li class="tab_item" @click="QYC.click('toKuangJi')">
				<img src="../../../assets/images/a0.png">
				<p>兑换矿机</p>
			</li>
			<li class="tab_item" @click="QYC.click('toFriends')">
				<img src="../../../assets/images/home/hy.png">
				<p>我的好友</p>
			</li>
			<li class="tab_item" @click="QYC.click('toAccountSafe')">
				<img src="../../../assets/images/home/zhaq.png">
				<p>账户安全</p>
			</li>
			<li class="tab_item" @click="QYC.click('toLcc')">
				<img src="../../../assets/images/home/lccshichang.png">
				<p>DEC市场</p>
			</li>
			<li class="tab_item" @click="QYC.click('toCurrency')">
				<img src="../../../assets/images/home/zhuanhuan.png">
				<p>货币转换</p>
			</li>
			<li class="tab_item" @click="QYC.click('toIntelMoney')">
				<img src="../../../assets/images/home/znqb.png">
				<p>智能钱包</p>
			</li>
			<li class="tab_item" @click="QYC.click('toSpeadEWM')">
				<img src="../../../assets/images/home/tuiguangerweima.png">
				<p>推广二维码</p>
			</li>
			<li class="tab_item" @click="QYC.click('toDownLoad')">
				<img src="../../../assets/images/home/fenxiang.png">
				<p>分享链接</p>
			</li>
			<li class="tab_item" @click="QYC.click('toBindAccount')">
				<img src="../../../assets/images/home/bdzh.png">
				<p>账号绑定</p>
			</li>
			<li class="tab_item" @click="QYC.click('exitApp')">
				<img src="../../../assets/images/home/aqtc.png">
				<p>安全退出</p>
			</li>
		</ul>
		<div class="gonggaoBox" @click="QYC.click('toNoticeInfo')">
			<img src="../../../assets/images/home/tz.png">
			<van-swipe :autoplay="3000" vertical :show-indicators="indicators" :touchable="touchable" class="swiperBox">
				<van-swipe-item v-for="(item,index) in noticeList" :key="index">{{item.notice_title}}</van-swipe-item>
			</van-swipe>
		</div>
		<div class="newsBox">
			<div class="newsItem" v-for="(item,index) in newsList" :key="index" @click="QYC.click('toDetail',item)">
				<div class="newsDot"></div>
				<div class="newsTime"><span>{{item.createtime}}</span></div>
				<div class="newsTitle">{{item.title}}</div>
				<div class="newsContent">{{item.profile}}</div>
				<img v-if="item.cover.match(/.png/) || item.cover.match(/.jpg/) || item.cover.match(/.gif/)" :src="item.cover" class="newsImg">
			</div>
		</div>

		<!--升级弹窗-->
		<van-popup v-model="showUp">
			<div class="upGrade">
				<div class="top">
					<span>升级</span>
					<img src="../../../assets/images/close.png" alt="" class="close" @click="QYC.click('close')">
				</div>
				<div class="dengji">
					<p>现等级VIP{{vip}}</p>
					<p class="shengji" v-if="vip != 5">是否要花费<span>{{price}}元</span>升级为 <span>VIP{{vip+1}}</span></p>
					<p class="shengji" v-else>已经是最高级别</span>
					</p>
				</div>
				<div class="dengjiDetail">
					<p>等级说明</p>
					<p class="shengji">直推20人，或达到V3级别有资格购买大型矿机，算力达到600G,享受手续费减免8.8折</p>
				</div>

				<button class="btn" @click="QYC.click('config')">确认升级</button>
			</div>
		</van-popup>

		<van-popup v-model="showPay">
			<div class="payCodeBox">
				<img class="payCodeImg" :src="codeImg">
			</div>
		</van-popup>

		<van-popup v-model="showImg" class="popBox">
			<img src="../../../assets/images/home/cha.png" class="chaImg" @click="showImg = false" />
			<img :src="homeimg" class="adImg" />
		</van-popup>

		<van-popup v-model="showkf">
			<div class="kfBox">{{kefuText}}</div>
		</van-popup>

		<div class="tabbar"></div>
		<Tabbar :sonActive='tabbarActive'></Tabbar>
	</div>
</template>
<script>
	import Rem from '@/utils/rem'
	import {
		QYC
	} from '@/QYC/QYC'
	import Vue from 'vue'
	import VueClipboard from 'vue-clipboard2'
	Vue.use(VueClipboard);
	import Tabbar from '../../components/tabbar.vue'
	import Waiting from '../../components/showwait.vue'
	import {
		Toast,
		NoticeBar,
		Icon,
		Dialog,
		NavBar,
		Popup,
		Swipe,
		SwipeItem
	} from 'vant'

	export default {
		components: {
			Tabbar,
			[Toast.name]: Toast,
			[NoticeBar.name]: NoticeBar,
			[Icon.name]: Icon,
			[Dialog.name]: Dialog,
			[NavBar.name]: NavBar,
			[Swipe.name]: Swipe,
			[Popup.name]: Popup,
			[SwipeItem.name]: SwipeItem,
		},
		data() {
			return {
				tabbarActive: 0,
				waiting: false,
				jwtobj: null,
				jwt: null,
				showUp: false,
				vip: "",
				price: "",
				zhifubao: "",
				weixin: "",
				bankcard: "",
				kaihuhang: "",
				kaihusheng: "",
				kaihucheng: "",
				kaihudian: "",
				iframe_src: "",
				zfbAccount: "",
				tip: "",
				userinfo: {},
				showPay: false,
				codeImg: "",
				noticeList: [],
				indicators: false,
				invitecode: "",
				qbdizhi: "",
				serverinfo: {},
				touchable: false,
				newsList: [],
				shiming: "",
				showImg: false,
				isAsign: false,
				isqiandao: 1,
				homeimg: "",
				kslevel: 0,
				adStatus: true,
				kefuText: "",
				showkf: false
			}
		},
		beforeCreate() {
			Rem.init(750)
		},
		created() {
			var self = this
			self.QYC = new QYC(this)
			self.QYC.created()
		},
		mounted() {
			var self = this
			self.QYC.mounted()
		},
		methods: {
			on_vue_created() {
				var self = this;
				self.jwt = self.QYC.getItem('jwt');
				self.isqiandao = self.QYC.getItem("isqiandao");
				self.serverinfo = self.QYC.getItem('serverinfo');

				self.iframe_src = process.env.COCOS + "?jwt=" + self.jwt

				window.addEventListener('refreshIframe', function(event) {
					self.showImg = false;
					self.getUserInfo();
					self.jwt = self.QYC.getItem('jwt')
					document.getElementById('mills').src = "";
					document.getElementById('mills').src = process.env.COCOS + "?jwt=" + self.jwt;
				})

				window.addEventListener('RefreshGlobal', function(event) {
					self.jwt = self.QYC.getItem('jwt');
					document.getElementById('mills').src = "";
					document.getElementById('mills').src = process.env.COCOS + "?jwt=" + self.jwt;
					self.adStatus = false;
					self.getUserInfo();
				})
			},
			on_vue_mounted() {
				var self = this;

				if (self.isqiandao == 0) {
					self.isAsign = false;
				} else {
					self.isAsign = true;
				}
				self.getUserInfo();
			},
			onCopy(e) { // 复制
				Toast({
					message: "复制成功",
					duration: 1000
				})
			},
			// 复制失败
			onError(e) {
				Toast({
					message: "复制失败",
					duration: 1000
				})
			},
			on_click_close() {
				var self = this
				self.showUp = false
			},
			// 客服
			on_click_showKefu() {
				var self = this;
				self.showkf = true;
				self.QYC.get({
					name: 'kefu',
					url: process.env.BASE_API + '/kefu',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_kefu(res) {
				var self = this;
				if (res.data.code == 1) {
					self.kefuText = res.data.data;
				} else {
					Toast(res.data.msg)
				}
			},
			getUserInfo() {
				var self = this;
				self.QYC.get({
					name: 'userinfo',
					url: process.env.BASE_API + '/hall/getuserinfo',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_userinfo(res) {
				var self = this;
				self.getNotice();
				self.userinfo = res.data.userinfo;
				if (!self.userinfo.nickname) {
					self.userinfo.nickname = "未命名"
				}
				self.invitecode = res.data.userinfo.id;
				self.qbdizhi = res.data.userinfo.qbdizhi;
				self.shiming = res.data.userinfo.realname;
				self.homeimg = res.data.homeimg;
				self.kslevel = res.data.userinfo.kslevel;
				
				if (self.homeimg != "" && self.adStatus) {
					self.showImg = true
				} else {
					self.showImg = false
				}
			},
			// 公告
			getNotice() {
				var self = this;
				self.QYC.get({
					name: 'notice',
					url: process.env.BASE_API + '/notice_list',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_notice(res) {
				var self = this;
				if (res.data.code == 1) {
					if(res.data.data && res.data.data.length){
						self.noticeList = res.data.data;
					}
					
				}
				self.getNews();
			},
			getNews() {
				var self = this;
				self.QYC.get({
					name: 'news',
					url: process.env.BASE_API + '/newslist',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_news(res) {
				var self = this;
				if (res.data.code == 1) {
					self.newsList = res.data.data;
				} else {
					Toast(res.data.msg);
				}
			},
			// 签到
			on_click_toAsign() {
				var self = this;
				console.log("psjfkdh")
				console.log(self.jwt)

				self.QYC.get({
					name: 'sign',
					url: process.env.BASE_API + '/market/qiandao',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_sign(res) {
				var self = this;

				if (res.data.errcode == 1) {
					Toast({
						message: "签到成功",
						duration: 1000
					})
					self.isAsign = true;
					self.QYC.setItem('isqiandao', 1)
				} else {
					Toast({
						message: res.data.errmsg,
						duration: 1000
					})
				}

			},
			// 复制钱包地址
			on_click_copyTg() {
				var self = this;
				if (mui.os.ios) {
					var UIPasteboard = plus.ios.importClass("UIPasteboard");
					var generalPasteboard = UIPasteboard.generalPasteboard();
					generalPasteboard.plusCallMethod({
						setValue: self.qbdizhi,
						forPasteboardType: "public.utf8-plain-text"
					})
					generalPasteboard.plusCallMethod({
						valueForPasteboardType: "public.utf8-plain-text"
					})
					Toast('复制成功')
				} else {
					var context = plus.android.importClass("android.content.Context");
					var main = plus.android.runtimeMainActivity();
					var clip = main.getSystemService(context.CLIPBOARD_SERVICE);
					plus.android.invoke(clip, "setText", self.qbdizhi);
					Toast('复制成功')
				}
			},
			on_click_exitApp() {
				var self = this;
				Dialog.confirm({
					message: '<div style="text-align: center;">确认退出？</div>'
				}).then(() => {
					self.QYC.clear();
					var trade = plus.webview.getWebviewById("king.home.Lcc");
					if(trade){
						plus.webview.close(trade)
					}
					self.QYC.openWebview({
						url: './king.login.html',
						id: 'king.login'
					}, {
						titleNView: null,
					})
				}).catch(() => {
					// on cancel
				});
			},
			on_click_toSet() {
				var self = this
				self.QYC.openWebview({
					url: './king.home.certification.html',
					id: 'king.home.certification'
				}, {
					titleNView: null,
				})

			},
			on_click_toDetail(item) {
				var self = this;
				console.log("item.id===" + item.id)
				self.QYC.openWebview({
					url: './king.home.homeDetail.html',
					id: 'king.home.homeDetail'
				}, {
					titleNView: null,
				}, {
					news_id: item.id
				})
			},
			on_click_toKuangJi() {
				var self = this
				self.QYC.openWebview({
					url: './king.home.duihuankuangji.html',
					id: 'king.home.duihuankuangji'
				}, {
					titleNView: null
				})
			},
			on_click_toFriends() {
				var self = this
				self.QYC.openWebview({
					url: './king.home.myFriends.html',
					id: 'king.home.myFriends'
				}, {
					titleNView: null
				})
			},
			on_click_toLcc() {
				var self = this
				self.QYC.openWebview({
					url: './king.home.Lcc.html',
					id: 'king.home.Lcc'
				}, {
					titleNView: null
				})
			},
			on_click_toCurrency() {
				var self = this;
				self.QYC.openWebview({
					url: './king.home.currencyChange.html',
					id: 'king.home.currencyChange'
				}, {
					titleNView: null
				})
			},
			on_click_toNoticeInfo() {
				var self = this;
				self.QYC.openWebview({
					url: './king.home.noticeInfo.html',
					id: 'king.home.noticeInfo'
				}, {
					titleNView: null
				})
			},
			on_click_toBindAccount() {
				var self = this;
				//				if(self.shiming == "") {
				//					Toast("请先进行实名认证")
				//					return;
				//				}
				self.QYC.openWebview({
					url: './king.home.bindAccount.html',
					id: 'king.home.bindAccount'
				}, {
					titleNView: null
				})
			},
			on_click_toIntelMoney() {
				var self = this;
				self.QYC.openWebview({
					url: './king.home.intelMoney.html',
					id: 'king.home.intelMoney'
				}, {
					titleNView: null
				})
			},
			on_click_toAccountSafe() {
				var self = this;
				self.QYC.openWebview({
					url: './king.home.accountSafe.html',
					id: 'king.home.accountSafe'
				}, {
					titleNView: null
				})
			},
			on_click_toSpeadEWM() {
				var self = this;
				self.QYC.openWebview({
					url: './king.home.speadEWM.html',
					id: 'king.home.speadEWM'
				}, {
					titleNView: null
				})
			},
			on_click_toDownLoad() {
				var self = this;
				self.QYC.openWebview({
					url: './king.home.download.html',
					id: 'king.home.download'
				}, {
					titleNView: null
				})
			}
		}
	}
</script>

<style lang="less">
	@import '../../../assets/public/public.css';
	@import '../../../assets/public/public.less';

	:global {
		body {
			background: #362b61;
			-webkit-font-smoothing: antialiased;
			font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
		}
	}

	html,
	body {
		width: 100%;
		height: 100%;
	}

	.signed {
		background: #4c1e88 !important;
	}

	.kefu {
		width: 0.5rem;
		height: 0.52rem;
		position: absolute;
		right: 0.3rem;
		top: 0.18rem;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.kfBox {
		padding: 1rem 0.2rem;
		background: #fff;
		width: 4.5rem;
		text-align: center;
	}

	.qdBox {
		width: 0.9rem;
		height: 0.9rem;
		background: #f17f23;
		border-radius: 0.08rem;
		position: absolute;
		top: 0.24rem;
		right: 0.55rem;

		img {
			width: 0.33rem;
			height: 0.35rem;
			display: block;
			margin: 0 auto;
			margin-top: 0.07rem;
		}

		p {
			color: #fff;
			font-size: 0.24rem;
			text-align: center;
			margin-top: 0.05rem;
		}
	}

	.popBox {
		width: 100%;
		height: 100%;
		background: none;
	}

	.chaImg {
		width: 0.4rem;
		height: 0.39rem;
		position: fixed;
		top: 0.42rem;
		right: 0.35rem;
		z-index: 10;
	}

	.adImg {
		width: 96%;
		height: auto;
		position: fixed;
		top: 1.3rem;
		left: 0;
		right: 0;
		// bottom: 0;
		margin: auto;
	}

	.gonggaoBox {
		width: 100%;
		height: 0.72rem;
		background: #7904db;
		margin-top: 0.1rem;

		img {
			width: 0.37rem;
			height: 0.33rem;
			float: left;
			margin-top: 0.2rem;
			margin-left: 0.2rem;
		}

		.swiperBox {
			width: 6.5rem;
			height: 0.72rem;
			float: right;

			.van-swipe-item {
				line-height: 0.72rem;
				color: #fff;
			}
		}
	}

	.van-notice-bar {
		background-color: #fff;
		font-size: 0.26rem !important;
	}

	.van-dialog__confirm,
	.van-dialog__confirm:active {
		color: #333;
	}

	.payCodeBox {
		width: 5rem;
		height: 5rem;
		position: absolute;
		@incenter();

		img {
			width: 100%;
			height: 100%;
		}
	}

	.gameBox {
		width: 100%;
		height: 7.6rem;
		position: relative;

		.loading {
			width: 0.8rem;
			height: 0.8rem;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
		}

		#mills {
			width: 100%;
			height: 100%;
			padding: 0 !important;
			margin: 0 !important;
			overflow: hidden;
			position: absolute;
			top: 0;
			left: 0;
		}

		img {
			width: 100%;
			height: 100%;
		}
	}

	.userInfoBox {
		width: 100%;
		height: 3.3rem;
		margin-top: -0.05rem;
		position: relative;
		background-color: #7904db;

		.userAvatar {
			width: 1.28rem;
			height: 1.28rem;
			background: #caa860;
			border-radius: 50%;
			position: absolute;
			top: 0.45rem;
			left: 0.54rem;

			/*overflow: hidden;*/
			img {
				width: 1.2rem;
				height: 1.2rem;
				border-radius: 50%;
				position: absolute;
				@incenter();
			}

			span {
				width: 0.95rem;
				height: 0.3rem;
				border: 1px solid #eedb03;
				border-radius: 0.1rem;
				position: absolute;
				top: 1.4rem;
				left: 0.15rem;
				display: block;
				color: #eedb03;
				font-size: 0.2rem;
				text-align: center;
				line-height: 0.3rem;
			}
		}

		.userInfo {
			position: absolute;
			top: 0.52rem;
			left: 2.12rem;

			.userInfoItem {
				line-height: 0.4rem;
				display: flex;
				align-items: center;
				font-size: 0.26rem;
				color: #fff;

				img {
					display: inline-block;
					width: 0.27rem;
					height: 0.27rem;
					vertical-align: middle;
					margin-right: 0.1rem;
				}

				span {
					color: #fff;
				}
			}
		}

		.level {
			width: 0.93rem;
			height: 0.93rem;
			position: absolute;
			top: 0.52rem;
			right: 0.55rem;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.copy1 {
			width: 1.6rem;
			height: 0.48rem;
			border: 1px solid #fff;
			text-align: center;
			line-height: 0.48rem;
			border-radius: 0.1rem;
			position: absolute;
			top: 1.7rem;
			right: 0.23rem;
			color: #fff;
			font-size: 0.22rem;
		}

		.packet {
			position: absolute;
			top: 2.35rem;
			left: 0.38rem;
			display: flex;
			align-items: center;

			span {
				color: #fff;
			}

			p {
				background: #4c1e88;
				width: 3.94rem;
				height: 0.48rem;
				line-height: 0.48rem;
				border-radius: 0.1rem;
				margin-left: 0.05rem;
				padding-left: 0.1rem;
				color: #fff;
				font-size: 0.24rem;
			}

			.copy2 {
				width: 1.6rem;
				height: 0.48rem;
				border: 1px solid #fff;
				text-align: center;
				line-height: 0.48rem;
				border-radius: 0.1rem;
				color: #fff;
				font-size: 0.22rem;
				margin-left: 0.1rem;
			}
		}
	}

	.home_send {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 0.17rem;
		padding-left: 0.22rem;

		.send_item {
			width: 3.46rem;
			background: #fff;
			border-radius: 0.2rem;
			float: left;
			padding: 0.26rem 0;
			margin-right: 0.14rem;

			img {
				width: 0.8rem;
				height: 0.8rem;
				float: left;
				margin-left: 0.22rem;
			}
		}

		.send_right {
			width: 2.43rem;
			float: left;

			p {
				text-align: center;
				font-size: 0.26rem;
			}

			p:nth-of-type(1) {
				color: #f75655;
			}

			p:nth-of-type(2) {
				color: #625f63;
			}
		}
	}

	.home_tab {
		width: 100%;
		height: auto;
		overflow: hidden;
		background: #7904db;
		margin-top: 0.09rem;

		.tab_item {
			width: 20%;
			height: 1.58rem;
			border-right: 0.02rem solid #5e14aa;
			border-bottom: 0.02rem solid #5e14aa;
			float: left;
			overflow: hidden;

			img {
				width: 0.44rem;
				height: 0.44rem;
				display: block;
				margin: 0 auto;
				margin-top: 0.3rem;
			}

			p {
				text-align: center;
				margin-top: 0.2rem;
				font-size: 0.24rem;
			}
		}

		.tab_item:nth-of-type(5n) {
			border-right: 0;
		}
	}

	.newsBox {
		width: 100%;
		height: auto;
		background: #362b61;
		margin-top: 0.14rem;
		padding-bottom: 0.5rem;

		.newsItem {
			width: 6.88rem;
			height: auto;
			margin: 0 auto;
			border-left: 1px solid #413575;
			position: relative;
			padding: 0 0.17rem;
			padding-top: 0.13rem;
			box-sizing: border-box;

			.newsDot {
				width: 0.2rem;
				height: 0.2rem;
				position: absolute;
				top: 0.22rem;
				left: -0.1rem;
				background: url("../../../assets/images/dot.png") no-repeat 0 0;
				background-size: 100%;
			}

			.newsTime {
				width: 100%;
				height: 0.4rem;
				line-height: 0.4rem;
				font-size: 0.22rem;
				color: #fff;

				span {
					background: #514392;
					border-radius: 0.2rem;
					padding: 0 0.12rem;
				}
			}

			.newsTitle {
				line-height: 0.72rem;
				font-size: 0.3rem;
				color: #fff;
			}

			.newsContent {
				font-size: 0.24rem;
				color: #827b9c;
				padding: 0.15rem;
				box-sizing: border-box;
				width: 100%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
			}

			.newsImg {
				width: 90%;
				display: block;
				height: auto;
				margin: 0 auto;
			}
		}
	}

	.tabbar {
		width: 100%;
		height: 55px;
		clear: both;
	}

	.van-popup {
		border-radius: 0.2rem;
	}

	.upGrade {
		width: 6.65rem;
		height: 5.22rem;
		background: #fff;
		border-radius: 0.2rem;

		.top {
			width: 100%;
			height: 0.9rem;
			line-height: 0.9rem;
			position: relative;
			text-align: center;

			span {
				font-size: 0.3rem;
				color: #7904db;
			}

			.close {
				width: 0.26rem;
				height: 0.26rem;
				position: absolute;
				right: 0.13rem;
				top: 0.13rem;
			}
		}

		.dengji {
			padding-left: 0.8rem;
			margin-top: 0.15rem;

			p:first-of-type {
				font-size: 0.26rem;
				color: #cfa5f8;
			}

			p:last-of-type {
				color: #8d8d8d;
				font-size: 0.26rem;

				span {
					font-size: 0.26rem;
					color: #cfa5f8;
				}
			}
		}

		.dengjiDetail {
			padding-left: 0.8rem;
			padding-right: 0.7rem;
			margin-top: 0.45rem;

			p:first-of-type {
				font-size: 0.26rem;
				color: #cfa5f8;
			}

			p:last-of-type {
				color: #8d8d8d;
				font-size: 0.26rem;
			}
		}

		.btn {
			display: block;
			border: 0;
			width: 5.24rem;
			height: 0.91rem;
			background: #7904db;
			color: #fff;
			margin: 0.5rem auto 0;
			font-size: 0.26rem;
		}
	}
</style>
