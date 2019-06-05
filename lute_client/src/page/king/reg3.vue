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
				<input type="password" v-model="reg_mima" placeholder="字母加数字">
			</li>
			<li>
				<div class="iconImg"><span class="iconfont icon-mima"></span></div>
				<input type="password" v-model="reg_rmima" placeholder="确认登录密码">
			</li>
			<li>
				<div class="iconImg"><span class="iconfont icon-mima"></span></div>
				<input type="password" v-model="reg_jymima" placeholder="交易密码">
			</li>
			<li>
				<div class="iconImg"><span class="iconfont icon-mima"></span></div>
				<input type="password" v-model="reg_rjymima" placeholder="确认交易密码">
			</li>
			<li>
				<div class="iconImg"><span class="iconfont icon-ren"></span></div>
				<input type="text" v-model="reg_tj" placeholder="请输入推荐码">
			</li>
		</ul>
		<div class="loginBtn" @click='QYC.click("toReg")'>立即注册</div>
		<div class="reg"  @click='QYC.click("toLogin",)'><span style="color:#9a77a9 ;">已有鹿特币账号？</span>登录</div>
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
				reg_mima: "",
				reg_rmima: "",
				reg_jymima: "",
				reg_rjymima: "",
				reg_tj: "",
				reg_picmima: ""
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
				self.reg_phone = self.QYC.getItem("reg_phone");
				self.code = self.QYC.getItem("code");
				self.reg_picmima = self.QYC.getItem("reg_picmima");
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
			
			// 注册
			on_click_toReg() {
				var self = this;
				if(self.reg_mima.length<6) {
					Toast({
						message: "登录密码不少于6位",
						duration: 1000
					})
					return;
				}

				if(self.reg_rmima.length<6) {
					Toast({
						message: "登录密码不少于6位",
						duration: 1000
					})
					return;
				}
				if(self.reg_rmima != self.reg_mima) {
					Toast({
						message: "两次输入的登录密码不一致",
						duration: 1000
					})
					return;
				}
				if(self.reg_jymima.length<6) {
					Toast({
						message: "交易密码不少于6位",
						duration: 1000
					})
					return;
				}
				if(self.reg_rjymima.length<6) {
					Toast({
						message: "交易密码不少于6位",
						duration: 1000
					})
					return;
				}
				if(self.reg_rjymima != self.reg_jymima) {
					Toast({
						message: "两次输入的交易密码不一致",
						duration: 1000
					})
					return;
				}
				if(self.reg_tj == "") {
					Toast({
						message: "请输入推荐人",
						duration: 1000
					})
					return;
				}
				self.QYC.get({
					name: 'reg',
					url: process.env.BASE_API + '/regist',
					params: {
						phone: self.reg_phone,
						code: self.code,
						password: self.reg_rmima,
						zfpassword: self.reg_rjymima,
						superior: self.reg_tj
					}
				})
			},
			on_http_reg(res) {
				var self = this;
				if(res.data.errcode == 1) {
					Toast(res.data.errmsg)
				} else {
					Toast(res.data.errmsg)
				}
			}
		}
	};
</script>

<style lang="less">
	@import '../../assets/public/public.css';
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
	.logIpt li .iconImg span{
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
		margin-top: 0.98rem;
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
		}
	}
	
	.logIpt {
		width: 100%;
		height: auto;
		margin-top: 0.58rem;
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
	}
	
	.loginBtn{
		width:6.21rem ;
		height: 0.84rem;
		background-color: #7904db;
		color: white;
		text-align: center;
		line-height: 0.84rem;
		border-radius: 0.1rem;
		font-size: 0.3rem;
		margin: 0 auto;
		margin-top: 0.5rem;
	}
	
	.reg{
		width: 100%;
		height: auto;
		font-size: 0.26rem;
		color: white;
		margin-left: 0.6rem;
		margin-top: 0.44rem;
	}
</style>