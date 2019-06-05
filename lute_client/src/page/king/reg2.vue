<template>
	<div>
		<div class="logoBox">
			<img src="../../assets/images/reg_logo.png">
		</div>
		<div class="country">
			<span>86中国(China){{reg_phone}}</span>

		</div>
		<!-- 注册 -->
		<ul class="logIpt">
			<li>
				<div class="iconImg"><span class="iconfont icon-mima"></span></div>
				<input type="text" v-model="code" placeholder="短信验证码">
				<van-button slot="button" size="small" v-if="getCode" @click="QYC.click('desTime',60)" type="primary" class="getCodeBtn">{{resiveGet}}</van-button>
				<van-button slot="button" size="small" v-else type="primary" class="getCodeBtn">{{time}}s</van-button>
			</li>
		</ul>
		<div class="loginBtn" @click='QYC.click("toNext")'>下一步</div>
		<div class="reg" @click='QYC.click("toLogin",)'><span style="color:#9a77a9 ;">已有鹿特币账号？</span>登录</div>

	</div>
</template>
<script>
	import Rem from "@/utils/rem";
	import {
		QYC
	} from "@/QYC/QYC";

	import {
		Toast,
		Popup,
		Dialog,
		Field,
		CellGroup,
		Cell,
		Button
	} from "vant";
	import {
		fire
	} from "../../utils/envent.js";
	export default {
		components: {
			[Toast.name]: Toast,
			[Popup.name]: Popup,
			[Dialog.name]: Dialog,
			[Field.name]: Field,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[Button.name]: Button
		},
		data() {
			return {
				QYC: null,
				show: false,
				jwt: '',
				code: '',
				reg_phone: "",
				reg_picmima: "",
				getCode: true,
				resiveGet: "获取验证码",
				time: 60,
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
				self.reg_phone = self.QYC.getItem("reg_phone")
			},
			on_vue_mounted() {
				var self = this;
			},
			on_click_toLogin() {
				var self = this;
				self.QYC.openWebview({
					url: './king.login.html',
					id: 'king.login'
				}, {
					titleNView: null
				})
			},
			on_click_toNext() {
				var self = this;
				if(self.code == ""){
					Toast({
						message: "请输入验证码",
						duration: 1000
					})
					return
				};
				self.QYC.setItem("code",self.code);
				self.QYC.openWebview({
					url: './king.reg3.html',
					id: 'king.reg3'
				}, {
					titleNView: null
				})
			},
			on_click_desTime(time) {
				var self = this;

				self.getCode = false;

				var t = setInterval(function() {
					time--;
					self.time = time;
					if (time < 0) {
						time = 60;
						self.time = 60;
						clearInterval(t);
						self.getCode = true;
						self.resiveGet = "重新获取";
					}

				}, 1000);

				self.QYC.get({
					name: 'getCode',
					url: process.env.BASE_API + '/getVerify',
					params: {
						phone: self.reg_phone
					}
				})

			},

			on_http_getCode(res) {
				console.log(JSON.stringify(res.data))
				if (res.data.code != 1) {
					Toast(res.data.message);
					return false
				}
				Toast("短信已成功发送")
			}

		}
	};
</script>

<style lang="less">
	@import '../../assets/public/public.css';
	@import '../../assets/public/animate.min.css';
	@import '../../assets/public/iconfont.css';
	@import '../../assets/public/public.less';

	@font-face {
		font-family: 'custom-iconfont';
		src: url('../../assets/fonts/iconfont.ttf') format('truetype');
	}

	@import url("../../assets/public/vant_icon.css");

	:global {
		body {
			background: #fff;
			-webkit-font-smoothing: antialiased;
			font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
		}
	}

	.logIpt li .iconImg span {
		color: #7904db !important;
	}

	html,
	body {
		width: 100%;
		height: 100%;
		background-image: url(../../assets/images/login_bg.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.country {
		margin-top: 1.44rem;

		span:nth-child(1) {
			color: white;
			font-size: 0.3rem;
			margin-left: 0.62rem;
		}


	}

	.logoBox {
		width: 100%;
		height: auto;

		img {
			width: 3.6rem;
			height: 1.53rem;
			margin-top: 1.16rem;
			margin-left: 0.62rem;
		}
	}

	.logList {
		width: 100%;
		height: 0.98rem;
		background: #f4f4f4;

		li {
			width: 50%;
			height: 100%;
			position: relative;
			float: left;
			text-align: center;
			font-size: 0.3rem;
			color: #9b77a9;
			line-height: 0.98rem;

			img {
				width: 0.43rem;
				height: 0.22rem;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				margin: 0 auto;
			}

			.getCode {
				width: 1.56rem;
				height: 0.48rem;
				position: absolute;
				/*@background();*/
				top: 0.18rem;
				right: 0;
				color: #fff;
				text-align: center;
				font-size: 0.24rem;
				line-height: 0.48rem;
			}

			.getCodeBtn {
				height: 0.45rem;
				width: 1.53rem;
				font-size: 0.2rem;
				line-height: 0.48rem;
				margin-left: -1.1rem;
				color: #e1d5e4;
				border: 2px solid #e1d5e4;
				margin-top: 0.72rem;
				position: fixed;
				top: 2rem;

			}
		}
	}

	.van-button--primary {
		color: #c1a9c8;
		border: 1px solid #e1d5e4;
		background: none;
		position: absolute;
		top: 0.4rem;
		right: 0;
	}

	.logIpt {
		width: 100%;
		height: auto;

		li {
			width: 6.28rem;
			height: 1.23rem;
			margin: 0 auto;
			border-bottom: 1px solid #9b77a9;
			position: relative;

			.iconImg {
				width: 0.54rem;
				height: 100%;
				float: left;
				display: flex;
				align-items: center;

				span {
					color: #cbb99e;
				}
			}

			input {
				display: block;
				width: 5.7rem;
				height: 100%;
				float: left;
				font-size: 0.28rem;
				color: #9b77a9;
			}

			.getCode {
				width: 1.56rem;
				height: 0.48rem;
				@background();
				position: absolute;
				top: 0.18rem;
				right: 0;
				color: #fff;
				text-align: center;
				font-size: 0.24rem;
				line-height: 0.48rem;
			}
		}

		li:last-child {
			position: relative;

			.pic {
				display: block;
				width: 1.5rem;
				height: 0.45rem;
				background-color: #40186b;
				color: #b1a1c2;
				position: absolute;
				top: 0.5rem;
				right: 0.2rem;
				text-align: center;
			}
		}
	}

	.loginBtn {
		width: 6.21rem;
		height: 0.84rem;
		background-color: #7904db;
		color: white;
		text-align: center;
		line-height: 0.84rem;
		border-radius: 0.1rem;
		font-size: 0.3rem;
		margin: 0 auto;
		margin-top: 0.95rem;
	}

	.reg {
		width: 100%;
		height: auto;
		font-size: 0.26rem;
		color: white;
		margin-left: 0.6rem;
		margin-top: 0.76rem;
	}
</style>
