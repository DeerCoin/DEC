<template>
	<div>
		<header class="mui-bar mui-bar-nav" style="background:#fff;box-shadow: none;height: 0.88rem;">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">公告详情</h1>
		</header>
		<div style="width: 100%; height: 44px;"></div>

		<van-collapse v-model="activeNames">
			<van-collapse-item :title="item.notice_title" :name="index" v-for="(item,index) in noticeList" :key="index">
				<div v-html="item.notice_content"></div>
			</van-collapse-item>
		</van-collapse>
	</div>
</template>
<script>
	import Rem from '@/utils/rem'
	import {
		QYC
	} from '@/QYC/QYC'
	import Tabbar from '../../components/tabbar.vue'
	import {
		Toast,
		NavBar,
		Popup,
		Collapse,
		CollapseItem
	} from 'vant'

	export default {
		components: {
			Tabbar,
			[Toast.name]: Toast,
			[NavBar.name]: NavBar,
			[Popup.name]: Popup,
			[Collapse.name]: Collapse,
			[CollapseItem.name]: CollapseItem,
		},
		data() {
			return {
				jwt: "",
				activeNames: ['1'],
				noticeList: []
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
				self.getNotice();
			},
			getNotice(){
				var self = this;
				self.QYC.get({
					name: 'notice',
					url: process.env.BASE_API + '/notice_list',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_notice(res){
				var self = this;
				if(res.data.code == 1){
					self.noticeList = res.data.data;
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

	.van-cell{
		@box();
		color: #fff;
	}
	.van-collapse-item__content{
		background: #57189d;
		color: #fff;
		div,p,table,h1,h2,h3,h4,span,a,li,ul{
			color: #fff !important;
		}
		img{
			width: 96%;
			display: block;
			margin: 0 auto;
		}
		
	}
</style>
