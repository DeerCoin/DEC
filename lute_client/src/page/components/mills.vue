<template>
	<div>

	</div>
</template>
<script>
	import Vue from "vue";
	import Rem from "@/utils/rem";
	import {
		Toast,
		Loading
	} from "vant";
	import {
		QYC
	} from "@/QYC/QYC";
	Vue.use(Toast);
	Vue.use(Loading);
	export default {
		data() {
			return {
				jwt: ""
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
				self.jwt = self.QYC.getItem('jwt')
			},
			on_vue_mounted() {
				var self = this;
				if (window.plus) {
					self.plusReady();
				} else {
					document.addEventListener("plusready", self.plusReady, false);
				}
			},
			plusReady() {

				var webView = plus.webview.currentWebview();
				var gameBox = document.getElementById("gameBox");
				if (webView != null) {
					var currentWidth = document.documentElement.clientWidth;
					var currentHeight = document.getElementById("gameBox").offsetHeight;
					console.log("height===" + currentHeight)
					var mills = plus.webview.create('http://www.baidu.com', 'mills', {
						width: currentWidth,
						height: "200px",
						left: 0,
						top: '42px',
						zindex: "11",
						position: "static"
					});
					webView.append(mills);
				}
			},
		}
	};
</script>
<style lang="less">
	html,
	body {
		width: 100%;
		height: 100%;
	}

	.mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .1);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	}

	#waiting {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}
</style>
