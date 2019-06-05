<template>
	<div>
		<van-nav-bar class="top" title="资产" fixed />
		<div style="width: 100%;height: 46px;clear: both;"></div>

		<div class="gameBox">
			<p class="name">DEC</p>
			<p class="heyu">{{heyue}}</p>
		</div>

		<div class="account">
			<span>账户余额收支明细</span>
			<span @click="QYC.click('toResult')">查看明细</span>
		</div>

		<div class="zichan">
			<p class="zcTitle">矿池资产</p>
			<p class="zcNum">{{zichan}}</p>
			<div class="jifen">
				<span>可售余额：{{keshou}}</span>
				<span>可售额度：{{jifen}}</span>
			</div>
			<div class="touru">
				<span>DEC余额投入矿池：</span>
				<input type="text" v-model="decNum">
				<button @click="QYC.click('putDec')">投入</button>
			</div>
			<div class="touru">
				<span>可售余额投入矿池：</span>
				<input type="text" v-model="ksNum">
				<button @click="QYC.click('putKs')">投入</button>
			</div>
		</div>

		<ul class="hqList">
			<li class="hqItem" v-for="(item,index) in marketList" :key="index">
				<div>
					<img :src="item.img" class="biImg">
					<!-- <p>{{item.name}}</p> -->
					<p>{{item.symbol}}</p>
				</div>
				<div>
					<!-- <p style="color: #fff;font-size: 0.26rem;">{{item.uk_price}}</p>
					<p style="color: #fff;font-size: 0.26rem;">≈¥{{item.price}}</p> -->
					
					<p style="color: #fff;font-size: 0.26rem;">0.00000000</p>
					<p style="color: #fff;font-size: 0.26rem;">≈¥0.00</p>
				</div>
			</li>
		</ul>
		<van-dialog v-model="showdec" show-cancel-button class="buyBox" @confirm="decConfirm">
			<div class="title">交易密码</div>
			<van-field v-model="decPwd" type="password" label="交易密码" placeholder="请输入交易密码" />
		</van-dialog>

		<van-dialog v-model="showks" show-cancel-button class="buyBox" @confirm="ksConfirm">
			<div class="title">交易密码</div>
			<van-field v-model="ksPwd" type="password" label="交易密码" placeholder="请输入交易密码" />
		</van-dialog>

		<div class="clear"></div>
		<div class="tabbar"></div>
		<Tabbar :sonActive='tabbarActive'></Tabbar>
	</div>
</template>
<script>
	import Rem from "@/utils/rem";
	import Vue from 'vue';
	import {
		QYC
	} from "@/QYC/QYC";
	import Tabbar from "../../components/tabbar.vue";
	import {
		Toast,
		Cell,
		CellGroup,
		NavBar,
		NoticeBar,
		Icon,
		Dialog,
		Search,
		Field
	} from "vant";
	Vue.use(Dialog);
	export default {
		components: {
			Tabbar,
			[Toast.name]: Toast,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[Search.name]: Search,
			[Field.name]: Field,
			[NavBar.name]: NavBar,
		},
		data() {
			return {
				tabbarActive: 4,
				username: "",
				heyue: "",
				jwt: "",
				decNum: "",
				ksNum: "",
				lccrmb: "",
				zichan: "",
				keshou: "",
				jifen: "",
				marketList: [],
				decPwd: "",
				ksPwd: "",
				showdec: false,
				showks: false
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
					self.getWalletData();
				})
				self.getWalletData();
			},
			on_click_toMyzijin() {
				var self = this
				self.QYC.openWebview({
					url: './king.mine_huzhuan.html',
					id: 'king.mine_huzhuan'
				}, {
					titleNView: null,
				})
			},
			getWalletData() {
				var self = this;
				self.QYC.get({
					name: 'aiwallet',
					url: process.env.BASE_API + '/hall/aiwallet',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_aiwallet(res) {
				var self = this;
				if (res.data.errcode == 1) {
					self.heyue = res.data.heyue;
					self.lcc = res.data.lcc;
					self.ljlcc = res.data.ljlcc;
					self.power = res.data.power;
					self.rmb = res.data.rmb;
					self.lccrmb = res.data.lccrmb;
					self.zichan = res.data.zichan;
					self.keshou = res.data.keshou;
					self.jifen = res.data.jifen;
					self.getMarketData();
				} else {
					Toast(res.data.errmsg)
				}
			},
			on_click_toResult() {
				var self = this
				self.QYC.openWebview({
					url: './king.home.capitalRecord.html',
					id: 'king.home.capitalRecord'
				}, {
					titleNView: null,
				})
			},
			// dec投入
			on_click_putDec() {
				var self = this;
				if (self.decNum == "") {
					Toast({
						message: "请输入数量",
						duration: 1000
					})
					return
				}
				self.showdec = true;
			},
			decConfirm() {
				var self = this;
				if (self.decPwd == "") {
					Toast({
						message: "请输入交易密码",
						duration: 1000
					})
					return
				}
				self.QYC.get({
					name: 'dec',
					url: process.env.BASE_API + '/assets/input',
					params: {
						jwt: self.jwt,
						tp: 'dec',
						num: self.decNum,
						zfpwd: self.decPwd
					}
				})
			},
			on_http_dec(res) {
				var self = this;
				self.decNum = ""
				self.decPwd = ''
				Toast(res.data.errmsg)
				self.getWalletData();
			},
			// 可售余额投入
			on_click_putKs() {
				var self = this;
				if (self.ksNum == "") {
					Toast({
						message: "请输入数量",
						duration: 1000
					})
					return
				}
				self.showks = true;

			},
			ksConfirm() {
				var self = this;
				if (self.ksPwd == "") {
					Toast({
						message: "请输入交易密码",
						duration: 1000
					})
					return
				}
				self.QYC.get({
					name: 'keshou',
					url: process.env.BASE_API + '/assets/input',
					params: {
						jwt: self.jwt,
						tp: 'ks',
						num: self.ksNum,
						zfpwd: self.ksPwd
					}
				})
			},
			on_http_keshou(res) {
				var self = this;
				self.ksNum = ""
				self.ksPwd = ""
				Toast(res.data.errmsg)
				self.getWalletData();
			},
			getMarketData() {
				var self = this;
				self.QYC.get({
					name: 'market',
					url: process.env.BASE_API + '/coinlist',
					params: {
						jwt: self.jwt
					}

				})
			},
			on_http_market(res) {
				var self = this;
				
				if (res.data.code == 1) {
					self.marketList = res.data.data.splice(0, 6);
				} else {
					Toast(res.data.errmsg);
				}
			},
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

	.van-dialog__confirm {
		color: #7904db;
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

	.zichan {
		width: 7rem;
		height: 3.94rem;
		@box();
		margin: 0 auto;
		border-radius: 0.1rem;
		margin-top: 0.12rem;
		overflow: hidden;

		p {
			text-align: center;
			color: #fff;
			line-height: 0.6rem;
		}

		p:nth-of-type(1) {
			margin-top: 0.1rem;
		}

		p:nth-of-type(2) {
			font-size: 0.5rem;
		}

		.jifen {
			width: 6.64rem;
			height: 0.7rem;
			border-bottom: 1px solid #551999;
			margin: 0 auto;
			line-height: 0.7rem;
			color: #fff;
			font-size: 0.28rem;

			span:nth-of-type(2) {
				float: right;
			}
		}

		.touru {
			width: 6.64rem;
			height: auto;
			overflow: hidden;
			margin: 0 auto;
			margin-top: 0.2rem;

			span {
				color: #fff;
				vertical-align: middle;
				font-size: 0.24rem;
				display: inline-block;
				width: 2.18rem;
			}

			input {
				display: inline-block;
				width: 3.2rem;
				height: 0.48rem;
				background: #4c1e88;
				border-radius: 0.1rem;
				vertical-align: middle;
				padding-left: 0.12rem;
				box-sizing: border-box;
				color: #fff;
				font-size: 0.26rem;
			}

			button {
				display: inline-block;
				width: 0.92rem;
				height: 0.46rem;
				border-radius: 0.1rem;
				border: 1px solid #fff;
				vertical-align: middle;
				color: #fff;
				font-size: 0.24rem;
				margin-left: 0.12rem;
			}
		}
	}

	.gameBox {
		width: 7.01rem;
		height: 2.21rem;
		background: url(../../../assets/images/mine/zic.png) no-repeat;
		background-size: cover;
		margin: 0 auto;
		margin-top: 0.2rem;
		overflow: hidden;

		.name {
			width: 100%;
			text-align: center;
			color: #fff;
			font-size: 0.45rem;
			margin-top: 0.5rem;
			line-height: 0.52rem;
		}

		.heyu {
			text-align: center;
			color: #fff;
			line-height: 0.52rem;
			font-size: 0.36rem;
			margin-top: 0.14rem;
		}

		.line {
			width: 100%;
			text-align: center;
			color: #fff;
			line-height: 0.52rem;
		}
	}

	.account {
		width: 7.01rem;
		height: auto;
		margin: auto;
		overflow: hidden;
		margin-top: 0.12rem;
		border-radius: 0.1rem;
		padding: 0.26rem;
		box-sizing: border-box;
		@box();

		span:nth-of-type(1) {
			float: left;
			color: #fff;
		}

		span:nth-of-type(2) {
			float: right;
			border-left: 1px solid #c99bf1;
			color: #c99bf1;
			padding-left: 0.24rem;
		}
	}

	.hqList {
		width: 100%;
		height: auto;
		margin-top: 0.2rem;

		.hqItem {
			width: 7.03rem;
			height: 1.14rem;
			overflow: hidden;
			@box();
			border-radius: 0.1rem;
			margin: 0 auto;
			margin-bottom: 0.14rem;

			div:nth-of-type(1) {
				width: 38%;

				.biImg {
					width: 0.55rem;
					height: 0.55rem;
					float: left;
					margin-right: 0.2rem;
				}
			}

			div {
				float: left;
				padding-top: 0.24rem;

				p {
					font-size: 0.24rem;
					line-height: 0.34rem;
					color: #fff;
				}
			}

			div:nth-of-type(1) {
				padding-left: 0.22rem;
				box-sizing: border-box;

				p {
					line-height: 0.55rem;
				}
			}

			div:nth-of-type(2) {
				float: right;
				margin-right: 0.3rem;

				p {
					text-align: right;
				}

			}
		}
	}

	.buyBox {
		.van-cell {
			background: #fff;
			color: #333;
		}

		.van-field__control {
			color: #333;
		}

		.title {
			line-height: 0.8rem;
			font-size: 0.3rem;
			text-align: center;
		}

	}
</style>
