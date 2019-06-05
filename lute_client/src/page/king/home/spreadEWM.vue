<template>
	<div id="bg">
		<header class="mui-bar mui-bar-nav" style="background:none;box-shadow: none;height: 0.88rem;border-bottom: none;">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" style="color: #fff;"></a>
			<h1 class="mui-title"></h1>
		</header>
		<div style="width: 100%; height: 46px;"></div>
		<div class="box">
			<img class="bgImg" src="../../../assets/images/fenxiang.jpg" />
			
			<div class="erwema" id="qrcode">
			</div>
		</div>
	</div>
</template>
<script>
	import Rem from '@/utils/rem';
	import QRCode from 'qrcodejs2';
	import {
		QYC
	} from '@/QYC/QYC'
	import {
		Toast,
		Dialog,
		Popup
	} from 'vant'

	export default {
		components: {
			[Toast.name]: Toast,
			[Dialog.name]: Dialog,
			[Popup.name]: Popup,
		},
		data() {
			return {
				jwt: "",
				erwema: "",
				id: "",
				bgImg: "",
				codew: 0,
				codeh: 0
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
				self.jwt = self.QYC.getItem("jwt");
			},
			on_vue_mounted() {
				var self = this;
				self.getCode();
				self.codew = document.getElementById("qrcode").clientWidth;
				self.codeh = document.getElementById("qrcode").clientHeight;
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
					text: self.url ,// 二维码内容   
					width: self.codew,
					height: self.codeh
				})
				console.log(qrcode)
			}
		}
	}
</script>

<style lang="less">
	@import '../../../assets/public/public.css';
	@import '../../../assets/public/public.less';

	:global {
		body {
			width: 100%;
			height: 100%;
			overflow: hidden;
			background: #000d2a;
			-webkit-font-smoothing: antialiased;
			font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
		}
	}

	#bg {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-attachment: fixed;
	}

	html,
	body {
		width: 100%;
		height: 100%;
	}

	.box {
		width: 100%;
		height: 100%;

		.bgImg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: auto;
		}

		.txImg {
			width: 1.1rem;
			height: 1.1rem;
			position: absolute;
			top: 1.86rem;
			left: 0.34rem;
		}

		.username {
			position: absolute;
			top: 2rem;
			left: 1.7rem;
			color: #fff;
		}

		.erwema {
			width: 2.5rem;
			height: 2.5rem;
			position: absolute;
			top: 10rem;
			right: 0;
			left: 0;
			margin: 0 auto;
			border: 0.04rem solid #fff;

			img {
				width: 100%;
				height: 100%;
			}

		}
	}
</style>
