<template>
	<div>
		<header class="mui-bar mui-bar-nav" style="background:#fff;box-shadow: none;height: 0.88rem;">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">文章阅读</h1>
		</header>
		<div style="width: 100%; height: 44px;"></div>

		<div class="box">
			<img v-if="cover.match(/.png/) || cover.match(/.jpg/) || cover.match(/.gif/)" :src="cover" class="newsImg">
			<p class="title">{{title}}</p>
			<p class="content" v-html="content"></p>
		</div>

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
		Toast,
		NavBar,
		Popup
	} from 'vant'

	export default {
		components: {
			[Toast.name]: Toast,
			[NavBar.name]: NavBar,
			[Popup.name]: Popup,
		},
		data() {
			return {
				jwt: "",
				news_id: 2,
				content:"",
				cover:"",
				time:"",
				title: ""
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
				if (window.plus) {
					self.plusReady();
					console.log("111")
				} else {
					document.addEventListener("plusready", self.plusReady, false);
				}
			},
			on_vue_mounted() {
				var self = this;
				self.getDetail();
			},
			plusReady(){
				var self = this;
				let ws = plus.webview.currentWebview();
				self.news_id = ws.news_id;
				self.getDetail();
			},
			getDetail(){
				var self = this;
				console.log("ssssss===="+self.news_id)
				self.QYC.get({
					name: 'detail',
					url: process.env.BASE_API + '/newsdetail ',
					params: {
						id: self.news_id,
						jwt: self.jwt
					}
				})
				
			},
			on_http_detail(res){
				var self = this;
				if(res.data.code == 1){
					self.content = res.data.data.content;
					self.cover = res.data.data.cover;
					self.title = res.data.data.title;
				}else{
					Toast(res.data.msg)
				}
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

	.box {
		background: #7904db;
		padding: 0 0.3rem 0.8rem;
		padding-top: 0.2rem;
		.newsImg {
			width: 100%;
		}

		.title {
			font-size: 0.32rem;
			color: #fff;
			margin-top: 0.33rem;
			line-height: 0.5rem;
			font-weight: bold;
		}

		.content {
			color: #c99bf1;
			font-size: 0.26rem;
			margin-top: 0.1rem;
		}

	}
</style>
