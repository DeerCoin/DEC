<template>
	<van-tabbar class="tabbar">
		<van-tabbar-item icon="shouye1" :class="{'active':sonActive==0}" @click='QYC.click("toHome")'>首页</van-tabbar-item>
		<van-tabbar-item icon="tabbar_Quotation" :class="{'active':sonActive==1}" @click='QYC.click("toMarket")'>行情</van-tabbar-item>
		<van-tabbar-item icon="jiaoyi" :class="{'active':sonActive==2}" @click='QYC.click("toTrade")'>交易</van-tabbar-item>
		<van-tabbar-item icon="yingyong--" :class="{'active':sonActive==3}" @click='QYC.click("toApplication")'>应用</van-tabbar-item>
		<van-tabbar-item icon="zichan" :class="{'active':sonActive==4}" @click='QYC.click("mine")'>资产</van-tabbar-item>
	</van-tabbar>
</template>
<script>
	import Vue from "vue";
	import Rem from "@/utils/rem";
	import {
		Tabbar,
		TabbarItem,
		Toast
	} from "vant";
	import {
		QYC
	} from "@/QYC/QYC";
	import {
		fire
	} from "@/utils/envent.js";
	Vue.use(Tabbar);
	Vue.use(TabbarItem);
	Vue.use(Toast);

	export default {
		props: {
			sonActive: Number,
			required: true
		},
		data() {
			return {
				active: 0,
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
			},
			on_click_toHome() {
				var self = this;
				if (window.plus) {
					const indexWebview1 = plus.webview.getWebviewById('king.home.home');
					if (!indexWebview1) {
						self.QYC.openWebview({
							url: './king.home.home.html',
							id: 'king.home.home'
						}, {
							titleNView: null
						})
					}
					fire(indexWebview1, "RefreshGlobal", {
						type: "refresh"
					})
				}
				self.QYC.showWebviewFastById('king.home.home');
			},
			on_click_toMarket() {
				var self = this;
				// Toast("敬请期待！")
				if (window.plus) {
					const indexWebview1 = plus.webview.getWebviewById('king.market.market');
					if (!indexWebview1) {
						self.QYC.openWebview({
							url: './king.market.market.html',
							id: 'king.market.market'
						}, {
							titleNView: null
						}, {})
					}
					fire(indexWebview1, "RefreshGlobal", {
						type: "refresh"
					})
				}
				self.QYC.showWebviewFastById('king.market.market');
			},
			on_click_toTrade(){
				var self = this;
				if (window.plus) {
					const indexWebview1 = plus.webview.getWebviewById('king.home.Lcc');
					if (!indexWebview1) {
						self.QYC.openWebview({
							url: './king.home.Lcc.html',
							id: 'king.home.Lcc'
						}, {
							titleNView: null
						}, {})
					}
					fire(indexWebview1, "RefreshGlobal", {
						type: "refresh"
					})
				}
				self.QYC.showWebviewFastById('king.home.Lcc');
			},
			on_click_toApplication() {
				var self = this;
				if (window.plus) {
					const indexWebview1 = plus.webview.getWebviewById('king.application.application');
					if (!indexWebview1) {
						self.QYC.openWebview({
							url: './king.application.application.html',
							id: 'king.application.application'
						}, {
							titleNView: null
						}, {})
					}
					fire(indexWebview1, "RefreshGlobal", {
						type: "refresh"
					})
				}
				self.QYC.showWebviewFastById('king.application.application');
			},
			on_click_mine() {
				var self = this;
				if (window.plus) {
					const indexWebview1 = plus.webview.getWebviewById('king.mine.mine');
					if (!indexWebview1) {
						self.QYC.openWebview({
							url: './king.mine.mine.html',
							id: 'king.mine.mine'
						}, {
							titleNView: null
						}, {})
					}
					fire(indexWebview1, "RefreshGlobal", {
						type: "refresh"
					})
				}
				self.QYC.showWebviewFastById('king.mine.mine');
			}
		}
	};
</script>
<style lang="less">
	@font-face {
		font-family: 'custom-iconfont';
		src: url('../../assets/fonts/iconfont.ttf') format('truetype');
	}

	@import url("../../assets/public/vant_icon.css");

// 	.van-tabbar{
// 		background: #7904db;
// 	}
	.van-tabbar-item--active {
		color: #666 !important;
	}
	.van-tabbar-item__text{
		font-size: 0.26rem;
	}
// 	.van-tabbar-item{
// 		color: #b3b3b3;
// 	}
	.active {
		color: #7904db !important;
	}
	.tabbar .van-icon{
		font-size: 0.42rem;
	}
</style>
