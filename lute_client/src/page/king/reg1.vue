<template>
	<div>
		<div class="logoBox">
			<img src="../../assets/images/reg_logo.png">
		</div>
		<div class="country">
			<span>86中国</span>
			<span class="arrow"></span>
		</div>

		<!-- 注册 -->
		<ul class="logIpt">
			<li>
				<div class="iconImg"><span class="iconfont icon-ren"></span></div>
				<input type="text" v-model="reg_phone" placeholder="手机号">
			</li>
			<li>
				<div class="iconImg"><span class="iconfont icon-mima"></span></div>
				<input type="text" v-model="reg_picmima" placeholder="图形验证码">
				<span class="pic" @click="QYC.click('changeCode')">{{num}}</span>
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
		},
		data() {
			return {
				QYC: null,
				show: false,
				jwt: '',
				code: '',
				reg_phone: "",
				reg_picmima: "",
				num: ""
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
			},
			on_vue_mounted() {
				var self = this;
				self.getWord();
				self.phone = self.QYC.getItem('myTel');
				self.pwd = self.QYC.getItem('mima');
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
				// self.QYC.clear();
				var self = this;
				if (self.reg_phone == "") {
					Toast({
						message: "请输入手机号",
						duration: 1000
					})
					return;
				}
				if (self.reg_picmima == "") {
					Toast({
						message: "请输入图形验证码",
						duration: 1000
					})
					return;
				}
				if(self.reg_picmima != self.num){
					Toast({
						message: "图形验证码错误",
						duration: 1000
					})
					return;
				}
				self.QYC.setItem("reg_phone",self.reg_phone);
				self.QYC.setItem("reg_picmima",self.reg_picmima);
				self.QYC.openWebview({
					url: './king.reg2.html',
					id: 'king.reg2'
				}, {
					titleNView: null
				})
			},
			// 获取图形验证码
			getWord() {
				var self = this;
				self.QYC.get({
					name: 'word',
					url: process.env.BASE_API + '/code',
					params: {}
				})
			},
			on_http_word(res) {
				var self = this;
				if (res.data.errcode != 1) {
					Toast(res.data.msg);
				} else {
					self.num = res.data.data.code;
				}
			},
			on_click_changeCode() {
				var self = this;
				self.QYC.get({
					name: 'word',
					url: process.env.BASE_API + '/code',
					params: {}
				})
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

		.arrow {
			width: 0;
			height: 0;
			border-left: 8px solid transparent;
			/* 左边框的宽 */
			border-right: 8px solid transparent;
			/* 右边框的宽 */
			border-top: 8px solid #9a77a9;
			/* 下边框的长度|高,以及背景色 */
			font-size: 0;
			line-height: 0;
			margin-left: 0.11rem;
			margin-top: 0.1rem;
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
		}
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
