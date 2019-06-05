<template>
	<div>
		<header class="mui-bar mui-bar-nav" style="background:#fff;box-shadow: none;height: 0.88rem;">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="QYC.click('closePage')"></a>
			<h1 class="mui-title">兑换矿机</h1>
		</header>
		<div style="width: 100%; height: 0.88rem"></div>

		<ul class="listBox">
			<li v-for="(item,index) in millsList" :key="index">
				<div class="leftImg">
					<img :src="item.imgurl" class="shopImg" />
				</div>
				
				<div class="rightDiv">
					<p class="title">{{item.name}}</p>
					<p class="content">{{item.msg}}</p>
					<p class="price">DEC{{item.price}}</p>
				</div>
				<button class="ksBtn" @click="QYC.click('ksBuy',item)">可售兑换</button>
				<button class="config" @click="QYC.click('decBuy',item)">DEC兑换</button>
			</li>
		</ul>

		<Waiting v-show='waiting'></Waiting>
	</div>
</template>
<script>
	import Rem from '@/utils/rem'
	import {
		QYC
	} from '@/QYC/QYC'
	import Tabbar from '../../components/tabbar.vue'
	import Waiting from '../../components/showwait.vue'
	import {
		fire
	} from "@/utils/envent.js";
	import {
		Toast,
		Swipe,
		SwipeItem,
		NoticeBar,
		Icon,
		Dialog,
		NavBar,
		Popup
	} from 'vant'

	export default {
		components: {
			Tabbar,
			Waiting,
			[Toast.name]: Toast,
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
			[NoticeBar.name]: NoticeBar,
			[Icon.name]: NoticeBar,
			[Dialog.name]: Dialog,
			[NavBar.name]: NavBar,
			[Popup.name]: Popup,
		},
		data() {
			return {
				tabbarActive: 0,
				waiting: false,
				jwt: null,
				millsList: []
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
				self.jwt = self.QYC.getItem('jwt');
			},
			on_vue_mounted() {
				var self = this;
				self.getMillsData();
			},
			// 获取矿机列表
			getMillsData(){
				var self = this;
				self.QYC.get({
					name: 'getMills',
					url: process.env.BASE_API + '/hall/loadstore',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_getMills(res){
				var self = this;
				self.millsList = res.data;
			},
			// 可售兑换

			// decBuy
			on_click_ksBuy(item) {
				var self = this;
				self.QYC.get({
					name: 'ksBuy',
					url: process.env.BASE_API + '/buy/store',
					params: {
						jwt: self.jwt,
						tp: item.tp,
						costtp: "keshou"
					}
				})
			},
			on_http_ksBuy(res){
				var self = this;
				if(res.data.errcode == 1){
					Toast({
						message: "购买成功",
						duration: 1000
					})
					const homePage = plus.webview.getWebviewById('king.home.home');
					fire(homePage, "refreshIframe", {
						type: "refresh"
					})
					
				}else{
					Toast({
						message: res.data.errmsg,
						duration: 1000
					})
				}
			},
			// dec兑换
			on_click_decBuy(item) {
				var self = this;
				self.QYC.get({
					name: 'decBuy',
					url: process.env.BASE_API + '/buy/store',
					params: {
						jwt: self.jwt,
						tp: item.tp,
						costtp: "dec"
					}
				})
			},
			on_http_decBuy(res){
				var self = this;
				if(res.data.errcode == 1){
					Toast({
						message: "购买成功",
						duration: 1000
					})
					const homePage = plus.webview.getWebviewById('king.home.home');
					fire(homePage, "refreshIframe", {
						type: "refresh"
					})
					
				}else{
					Toast({
						message: res.data.errmsg,
						duration: 1000
					})
				}
			},
			on_click_closePage(){
				const homePage = plus.webview.getWebviewById('king.home.home');
				fire(homePage, "refreshIframe", {
					type: "refresh"
				})
			}
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

	.listBox {
		width: 100%;

		li {
			width: 100%;
			padding: 0.3rem 0 0.3rem 0.22rem;
			background: #7904db;
			margin-top: 0.15rem;
			display: flex;
			align-items: center;
			position: relative;
			color: white;
			.leftImg{
				width: 1.61rem;
				height: 1.62rem;
				background: url(../../../assets/images/home/tm.png) no-repeat;
				background-size: cover;
				position: relative;
				.shopImg {
					width: 80%;
					height: auto;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
				}
			}
			

			.rightDiv{
				margin-left: 0.3rem;

				.title {
					color: #FFF;
					font-size: 0.28rem;
				}

				.content {
					color: #bf90e6;
					font-size: 0.24rem;
					margin-right: 0.5rem;
					margin-top: 0.1rem;
				}

				.price {
					color: #FFF;
					font-size: 0.28rem;
					margin-top: 0.1rem;
				}
			}

			.config {
				display: block;
				position: absolute;
				width: 1.28rem;
				height: 0.48rem;
				border:1px solid #fff;
				color: #fff;
				right: 0.23rem;
				bottom: 0.3rem;
				font-size: 0.24rem;
				padding: 0;
			}
			.ksBtn{
				display: block;
				position: absolute;
				width: 1.28rem;
				height: 0.48rem;
				border:1px solid #fff;
				color: #fff;
				right: 1.7rem;
				bottom: 0.3rem;
				font-size: 0.24rem;
				padding: 0;
			}
		}
	}
</style>
