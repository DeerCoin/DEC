<template>
	<div>
		<div class="logoBox">
			<img src="../../assets/images/login_logo.png">
		</div>
		<div class="country">
			<span>86中国</span>
			<span class="arrow"></span>
		</div>
		<!-- 登录 -->
		<ul class="logIpt">
			<li>
				<div class="iconImg"><span class="iconfont icon-ren"></span></div>
				<input type="text" placeholder="手机号" v-model="phone">
			</li>
			<li>
				<div class="iconImg"><span class="iconfont icon-mima"></span></div>
				<input type="password" placeholder="登录密码" v-model="pwd">
			</li>
		</ul>
		<div class="loginBtn" @click='QYC.click("toLog")'>立即登录</div>
		<div class="findPw"  @click='QYC.click("toFindPw",)'>忘记密码？</div>
		<div class="reg"  @click='QYC.click("toReg",)'><span style="color:#9a77a9 ;">还没有鹿特币账号？</span>注册</div>

		<!--<van-button size="large" class="logBtn" v-show="!isSelect" @click='QYC.click("toReg")'>注册</van-button>-->

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
				phone: "",
				pwd: "",
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
// 				self.QYC.preLoad([{
// 						url: "./king.market.market.html",
// 						id: "king.market.market",
// 						style: {
// 							bounce: "none", //窗口是否反弹
// 							titleNView: null, //是否有头部返回
// 						}
// 					},
// 					{
// 						url: "./king.application.application.html",
// 						id: "king.application.application",
// 						style: {
// 							bounce: "none", //窗口是否反弹
// 							titleNView: null, //是否有头部返回
// 						}
// 					},
// 					{
// 						url: "./king.mine_mine.html",
// 						id: "king.mine_mine",
// 						style: {
// 							bounce: "none", //窗口是否反弹
// 							titleNView: null, //是否有头部返回
// 						}
// 					}
// 				]);
			},
			on_vue_mounted() {
				var self = this;
				// self.phone = self.QYC.getItem('myTel');
				// self.pwd = self.QYC.getItem('mima');
			},
			on_click_toFindPw() {
				var self = this;
				self.QYC.openWebview({
					url: './king.findPw.html',
					id: 'king.findPw'
				}, {
					titleNView: null
				})
			},
			on_click_toReg(){
				var self = this;
				self.QYC.openWebview({
					url: './king.reg1.html',
					id: 'king.reg1'
				}, {
					titleNView: null
				})
			},
			//登录
			on_click_toLog() {
				var self = this;
				self.QYC.clear();
				if(self.phone == '') {
					Toast("手机号不能为空")
					return false;
				}
				if(self.pwd == '') {
					Toast("密码不能为空")
					return false;
				}
				self.QYC.get({
					name: 'login',
					url: process.env.BASE_API + '/login',
					params: {
						phone: self.phone,
						password: self.pwd,
					}
				})

			},
			on_http_login(res) {
				var self = this;
				if(res.data.errcode == 1) {
					Toast(res.data.errmsg)

					self.QYC.setItem('jwt', res.data.jwt);
					self.QYC.setItem('myTel', self.phone);
					self.QYC.setItem('mima', self.pwd);
					self.QYC.setItem('serverinfo', res.data.serverinfo);
					self.QYC.setItem('isqiandao',res.data.userinfo.isqiandao)
					
					setTimeout(function() {
						self.QYC.openWebview({
							url: './king.home.home.html',
							id: 'king.home.home'
						}, {
							titleNView: null
						})
					}, 1000)
				} else {
					Toast(res.data.errmsg);

				}
			},
			
		
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
		margin-top: 1.22rem;
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
			margin-top: 2.21rem;
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
		margin-top: 0.96rem;
	}
	.findPw{
		width: 100%;
		height: auto;
		font-size: 0.26rem;
		color:#9a77a9;
		margin-left: 0.62rem;
		margin-top: 0.6rem;
	}
	.reg{
		width: 100%;
		height: auto;
		font-size: 0.26rem;
		color: white;
		margin-left: 0.6rem;
		margin-top: 0.67rem;
	}
</style>