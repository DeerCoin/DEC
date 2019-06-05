<template>
	<div>
		<header class="mui-bar mui-bar-nav" style="background:#fff;box-shadow: none;height: 0.88rem;">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">分享链接</h1>
		</header>
		<div style="width: 100%; height: 0.88rem"></div>

		<div class="shareBox">
			<div id="qrcode"></div>
		</div>
		<!-- <div class="mycode">我的推广二维码</div> -->
		<div class="sao">{{url}}</div>

		<div class="loginBtn" @click='QYC.click("copyTg")'>复制推荐链接</div>
	</div>
</template>
<script>
	import Rem from '@/utils/rem'
	import {
		QYC
	} from '@/QYC/QYC'
	import {
		Toast,
	} from 'vant'
	import QRCode from 'qrcodejs2';
	export default {
		components: {
			[Toast.name]: Toast,
		},
		data() {
			return {
				jwt: "",
				QYC: null,
				codeImg: "",
				url: "",
				link: "",
				codew: "",
				codeh: ""
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
				var self = this
				self.jwt = self.QYC.getItem('jwt')
			},
			on_vue_mounted() {
				var self = this;
				self.codew = document.getElementById("qrcode").clientWidth;
				self.codeh = document.getElementById("qrcode").clientHeight;
				self.getCode();

			},
			// 获取二维码
			getCode() {
				var self = this;
				self.QYC.get({
					name: 'code',
					url: process.env.BASE_API + '/market/getfenxiang',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_code(res) {
				var self = this;
				if (res.data.errcode == 1) {
					self.url = res.data.url;
					self.qrcode();
				} else {
					Toast(res.data.errmsg)
				}

			},
			qrcode() {
				var self = this;
				let qrcode = new QRCode('qrcode', {
					text: self.url,
					width: self.codew,
					height: self.codeh
					
				})
				console.log(qrcode)
			},
			// 复制钱包地址
			on_click_copyTg() {
				var self = this;
				if (mui.os.ios) {
					var UIPasteboard = plus.ios.importClass("UIPasteboard");
					var generalPasteboard = UIPasteboard.generalPasteboard();
					generalPasteboard.plusCallMethod({
						setValue: self.url,
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
					plus.android.invoke(clip, "setText", self.url);
					Toast('复制成功')
				}
			},
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

	.shareBox {
		width: 5rem;
		height: 5rem;
		margin: 0 auto;
		margin-top: 2rem;
		background: #fff;
		overflow: hidden;
		position: relative;
		#qrcode{
			width: 90%;
			height: 90%;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
		}
	}

	.sao {
		width: 100%;
		text-align: center;
		font-size: 0.26rem;
		color: #fff;
		line-height: 1rem;
		margin-top: 0.3rem;
	}

	.loginBtn {
		width: 5.8rem;
		height: 0.84rem;
		background-color: #7904db;
		color: white;
		text-align: center;
		line-height: 0.84rem;
		border-radius: 0.1rem;
		font-size: 0.3rem;
		margin: 0 auto;
		margin-top: 0.3rem;
	}

	.mycode {
		width: 5rem;
		background: #fff;
		margin: 0 auto;
		text-align: center;
		padding-bottom: 0.2rem;
	}
</style>
