<template>
	<div>
		<van-nav-bar class="top" title="油卡充值" fixed left-arrow @click-left="onClickLeft" />
		<div style="width: 100%; height: 46px;"></div>

		<van-cell-group>
			<div class="van-cell van-hairline van-field">
				<div class="van-cell__title"><span>服务商</span></div>
				<div class="van-cell__value">
					<div class="van-field__body">
						<select v-model="service">
							<option v-for="(item,index) in serList" :value="item.name" :key="index">{{item.name}}</option>
						</select>
						<div class="van-field__right-icon">
							<van-icon name="arrow" style="transform: rotate(90deg);" />
						</div>
					</div>
				</div>
			</div>
			<van-field v-model="account" label="主卡卡号" placeholder="请输入卡号" />
		</van-cell-group>

		<div class="youkaBox">
			<p :class="item.select ? 'price yes': 'price'" v-for="(item,index) in list" :key="index" @click="QYC.click('choose',index)">{{item.money}}元</span></p>
		</div>

		<van-button size="large" class="loginBtn" style="margin-bottom: 1rem;" @click="QYC.click('charge')">确认提交</van-button>

		<div class="liuchegn">
			<div>提示：请核对号码，以免造成损失！</div>
		</div>

		<van-dialog v-model="showPwd" show-cancel-button class="buyBox" @confirm="buyConfirm">
			<div class="title">交易密码</div>
			<van-field v-model="password" type="password" label="交易密码" placeholder="请输入交易密码" />
			<p>所需DEC：{{amount}}</p>
		</van-dialog>
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
		NavBar,
		Field,
		CellGroup,
		Button,
		Dialog,
		Icon
	} from "vant";
	Vue.use(Dialog);
	export default {
		components: {
			Tabbar,
			[Toast.name]: Toast,
			[NavBar.name]: NavBar,
			[Field.name]: Field,
			[CellGroup.name]: CellGroup,
			[Button.name]: Button,
			[Icon.name]: Icon,
		},
		data() {
			return {
				jwt: "",
				list: [],
				service: "中石化",
				account: "",
				rmb: 100,
				showPwd: false,
				password: "",
				amount: 0,
				serList: [{
					name: "中石化",
					id: 0
				}, {
					name: "中石油",
					id: 1
				}]
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
				self.getYouka();
			},
			onClickLeft() {
				var self = this;
				self.QYC.closeCurrentWebview();
			},
			getYouka() {
				var self = this;
				self.QYC.get({
					name: 'phone',
					url: process.env.BASE_API + '/market/getyoukadata',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_phone(res) {
				var self = this;
				if (res.data.errcode == 1) {
					self.list = res.data.data;
					self.list[0].select = true;
					self.rmb = self.list[0].money;
					self.amount = self.list[0].lcc + self.list[0].lccsx;
				} else {
					Toast(res.data.errmsg)
				}
			},
			on_click_choose(index) {
				var self = this;

				for (var i = 0; i < self.list.length; i++) {
					document.getElementsByClassName("price")[i].classList.remove("yes");
				}

				document.getElementsByClassName("price")[index].classList.add("yes");
				self.rmb = self.list[index].money;
				self.amount = self.list[index].lcc + self.list[index].lccsx;
			},
			on_click_charge() {
				var self = this;
				if (self.account == "") {
					Toast({
						message: "请输入主卡卡号",
						duration: 1000
					})
					return;
				}
				self.showPwd = true;
			},
			buyConfirm() {
				var self = this;
				if (self.password == "") {
					Toast({
						message: "请输入交易密码",
						duration: 1000
					})
					return;
				}
				self.QYC.get({
					name: 'chongzhi',
					url: process.env.BASE_API + '/market/youkachongzhi',
					params: {
						jwt: self.jwt,
						rmb: self.rmb,
						czaccount: self.account,
						fuwushang: self.service,
						zfpwd: self.password
					}
				})
			},
			on_http_chongzhi(res) {
				var self = this;
				Toast(res.data.errmsg)
				if (res.data.errcode == 1) {
					setTimeout(function() {
						self.QYC.closeCurrentWebview();
					}, 1000)
				} else {
					console.log("wdnm");
					self.password = ""
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

	.van-hairline--top-bottom::after {
		border-width: 0px;
	}

	.van-cell::after {
		left: 15px;
		right: 0;
		width: auto;
		-webkit-transform: scale(1, .5);
		transform: scale(1, .5);
		border-bottom-width: 1px;
	}

	.van-cell-group {
		@box();

		.van-cell {
			@box();
			color: #fff;
		}

		.van-field__control {
			color: #fff;
		}

		select {
			width: 100%;
			color: #fff;
			@box();
		}
	}

	.yes {
		background: #57189d;
		border: 1px solid #57189d !important;
	}

	.youkaBox {
		width: 100%;
		height: auto;
		@box();
		padding: 0.5rem 0.3rem;
		overflow: hidden;

		p {
			width: 2rem;
			height: 0.8rem;
			border-radius: 0.12rem;
			float: left;
			border: 1px solid #9d56d7;
			color: #fff;
			line-height: 0.8rem;
			text-align: center;
			margin-right: 0.4rem;
		}

		p:last-child {
			margin-right: 0;
		}
	}

	.liuchegn {
		width: 100%;
		height: auto;
		padding: 0.25rem;
		box-sizing: border-box;
		position: absolute;
		bottom: 0;

		div {
			font-size: 0.28rem;
			line-height: 0.5rem;
			color: #fff;
		}
	}

	.loginBtn {
		width: 5.92rem;
		height: 0.89rem;
		display: block;
		border-radius: 0.1rem;
		background-color: #7904db;
		color: white;
		text-align: center;
		line-height: 0.89rem;
		margin: 1.5rem auto;
		font-size: 0.3rem;
		border: none;
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

		p {
			font-size: 0.26rem;
			line-height: 0.8rem;
			padding-left: 0.3rem;
		}
	}
</style>
