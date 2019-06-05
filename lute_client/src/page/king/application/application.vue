<template>
	<div>
		<!-- mui头部 -->
		<van-nav-bar title="应用" fixed />
		<div style="width: 100%;height: 46px;"></div>
		<ul class="handleList">
			<li class="appItem" @click="QYC.click('toOther','phone')">
				<p>话费</p>
				<p>手机话费充值</p>
				<img src="../../../assets/images/app/huafei.png">
			</li>
			<li class="appItem" @click="QYC.click('toOther','flow')">
				<p>流量</p>
				<p>手机流量充值</p>
				<img src="../../../assets/images/app/shuid.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>电费</p>
				<p>电费缴费</p>
				<img src="../../../assets/images/app/dianfei.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>水费</p>
				<p>水费缴费</p>
				<img src="../../../assets/images/app/shuifei.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>宽带</p>
				<p>宽带缴费</p>
				<img src="../../../assets/images/app/kuandai.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>燃气费</p>
				<p>燃气费缴费</p>
				<img src="../../../assets/images/app/ranqifei.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>有线电视</p>
				<p>生活缴费</p>
				<img src="../../../assets/images/app/dias.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>物业费</p>
				<p>生活缴费</p>
				<img src="../../../assets/images/app/wuye.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>滴滴出行</p>
				<p>DEC滴滴出行</p>
				<img src="../../../assets/images/app/didi.png">
			</li>
			<li class="appItem" @click="QYC.click('toOther','youka')">
				<p>油卡充值</p>
				<p>中石化中石油</p>
				<img src="../../../assets/images/app/jiayouka.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>火车票</p>
				<p>购买火车票</p>
				<img src="../../../assets/images/app/huoche.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>飞机票</p>
				<p>购买飞机票</p>
				<img src="../../../assets/images/app/feijipiao.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>演出赛事</p>
				<p>购买演出赛事</p>
				<img src="../../../assets/images/app/yanchu.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>交通违章</p>
				<p>处理交通违章</p>
				<img src="../../../assets/images/app/jhiaotong.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>比特币期货</p>
				<p>购买购买比特币期货</p>
				<img src="../../../assets/images/app/qihuo.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>世界杯竞猜</p>
				<p>世界杯竞猜</p>
				<img src="../../../assets/images/app/zuqiu.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>亚马孙商城</p>
				<p>购买商城商品</p>
				<img src="../../../assets/images/app/ya.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>京东商城</p>
				<p>购买商城商品</p>
				<img src="../../../assets/images/app/jingdong.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>商城</p>
				<p>购买商城商品</p>
				<img src="../../../assets/images/app/sy.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>商家联盟</p>
				<p>购买附近商品</p>
				<img src="../../../assets/images/app/shanglian.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>闲置市场</p>
				<p>购买闲置商品</p>
				<img src="../../../assets/images/app/zhihuan.png">
			</li>
			<li class="appItem" @click="QYC.click('toast')">
				<p>VISA信用卡</p>
				<p>信用卡</p>
				<img src="../../../assets/images/app/xinyongka.png">
			</li>
			<li class="appItem apping" @click="QYC.click('toast')">
				<p>MASTER信用卡</p>
				<p>信用卡</p>
				<!-- <p>开发中</p> -->
				<img src="../../../assets/images/app/xinyongka.png">
			</li>
			<li class="appItem apping" @click="QYC.click('toast')">
				<p>JCB信用卡</p>
				<p>信用卡</p>
				<!-- <p>开发中</p> -->
				<img src="../../../assets/images/app/xinyongka.png">
			</li>
			<li class="appItem apping" @click="QYC.click('toast')">
				<p>夺宝</p>
				<p>DEC夺宝</p>
				<!-- <p>开发中</p> -->
				<img src="../../../assets/images/app/duobao.png">
			</li>
			<li class="appItem apping" @click="QYC.click('toast')">
				<p>鹿公益</p>
				<p>DEC公益</p>
				<!-- <p>开发中</p> -->
				<img src="../../../assets/images/app/gongyi.png">
			</li>
		</ul>


		<div class="tabbar"></div>
		<Tabbar :sonActive='tabbarActive'></Tabbar>
	</div>
</template>
<script>
	import Rem from "@/utils/rem";
	import {
		QYC
	} from "@/QYC/QYC";
	import Tabbar from "../../components/tabbar.vue";
	import {
		Toast,
		NavBar,
	} from "vant";
	export default {
		components: {
			Tabbar,
			[Toast.name]: Toast,
			[NavBar.name]: NavBar,
		},
		data() {
			return {
				jwt: "",
				userinfo: {},
				tabbarActive: 3,
				todaylcc: "",
				page: 'phone'
			};
		},
		beforeCreate() {
			Rem.init(750)
		},
		created() {
			var self = this;
			self.QYC = new QYC(this);
			self.QYC.created();
		},
		mounted() {
			var self = this;
			self.QYC.mounted();
		},
		methods: {
			on_vue_created() {
				var self = this;
				self.jwt = self.QYC.getItem("jwt");
			},
			on_vue_mounted() {
				var self = this;
				window.addEventListener('RefreshGlobal', function(event) {
					self.jwt = self.QYC.getItem('jwt');
				})
			},
			on_click_toOther(page) {
				var self = this
				self.page = page
				if (page == 'phone') {
					var URL = process.env.BASE_API + '/market/gethuafeiswitch'
				} else if (page == 'flow') {
					var URL = process.env.BASE_API + '/market/getliuliangswitch'
				} else if (page == 'youka') {
					var URL = process.env.BASE_API + '/market/getyoukaswitch'
				}
				self.QYC.get({
					name: 'tophone',
					url: URL,
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_tophone(res) {
				var self = this;
				if (res.data.errcode == 1) {
					if (res.data.isopen == 1) {
						self.QYC.openWebview({
							url: './king.application.' + self.page + '.html',
							id: 'king.application.' + self.page
						}, {
							titleNView: null,
						})
					} else {
						Toast({
							message: '暂未开放',
							duration: 1000
						})
					}
				} else {
					Toast(res.data.errmsg)
				}
			},
			on_click_toast() {
				var self = this;
				Toast("暂未开放")
			}

		}
	};
</script>

<style lang="less">
	@import '../../../assets/public/public.css';
	@import '../../../assets/public/public.less';

	:global {
		body {
			@background();
			-webkit-font-smoothing: antialiased;
			font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
		}
	}

	html,
	body {
		width: 100%;
		height: 100%;
	}

	.clear {
		width: 100%;
		height: 1px;
		clear: both;
	}

	.tabbar {
		width: 100%;
		height: 55px;
		clear: both;
	}

	.handleList {
		width: 100%;
		height: auto;
		overflow: hidden;
		padding-left: 0.22rem;
		box-sizing: border-box;
		margin-top: 0.2rem;

		.appItem {
			width: 3.46rem;
			height: 1.37rem;
			float: left;
			@box();
			border-radius: 0.15rem;
			margin-right: 0.14rem;
			padding: 0.3rem;
			box-sizing: border-box;
			margin-bottom: 0.12rem;
			position: relative;

			p:nth-of-type(1) {
				color: #fff;
				font-size: 0.28rem;
			}

			p:nth-of-type(2) {
				color: #bc82ed;
				font-size: 0.2rem;
				margin-top: 0.1rem;
			}

			p:nth-of-type(3) {
				color: #bc82ed;
				font-size: 0.2rem;
			}

			img {
				width: 0.76rem;
				height: 0.89rem;
				position: absolute;
				right: 0.3rem;
				top: 0.28rem;
			}
		}

		.apping {
			padding: 0.24rem 0.3rem;

			p:nth-of-type(2) {
				margin-top: 0rem;
			}
		}
	}

	.gameBox_own {
		height: 1.27rem;
		margin-bottom: 0rem;
		background-color: #7c603c;
		overflow: hidden;
		position: relative;

		li {
			width: 50%;
			height: 0.8rem;
			float: left;
			text-align: center;
			font-size: 0.25rem;

			p {
				text-align: center;
				font-size: 0.26rem;
				line-height: 0.44rem;
			}

			p:nth-of-type(2) {
				margin: 0;
			}
		}

		.sx {
			height: 0.79rem;
			border-left: 1px solid #9a8468;
			position: absolute;
			top: 0.24rem;
			left: 3.71rem;

		}
	}

	.gameBox_intro {
		overflow: hidden;
		height: 1.93rem;

		.gameBox_intro_photo {
			width: 1.15rem;
			height: 1.15rem;

			/*			border:1px solid red;*/
			float: left;
			margin-top: 0.45rem;
			margin-left: 0.43rem;

			img {
				width: 100%;
				height: 100%;
				border-radius: 0.75rem;
			}
		}

		.gameBox_intro_dj {
			width: 0.92rem;
			height: 0.92rem;
			float: right;
			margin-top: 0.58rem;
			margin-right: 0.5rem;

			img {
				width: 100%;
				height: 100%;
				border-radius: 0.46rem;
			}
		}

		.gameBox_intro_user {
			float: left;
			margin-top: 0.4rem;
			margin-left: 0.34rem;
		}

	}
</style>
