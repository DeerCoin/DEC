<template>
	<div>
		<header class="mui-bar mui-bar-nav" style="background:#fff;box-shadow: none;height: 0.88rem;border-bottom: 1px solid #e1e0e0;">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">实名认证</h1>
		</header>
		<div style="width: 100%; height: 0.88rem"></div>

		<div class="box">
			<ul>
				<li>
					<span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</span>
					<input type="text" placeholder="请输入昵称" v-model="nickname" :readonly="read"/>
				</li>
				<li>
					<span>真实姓名</span>
					<input type="text" placeholder="请输入真实姓名" v-model="realname" :readonly="read"/>
				</li>
				<li>
					<span>身份证号</span>
					<input type="text" placeholder="请输入身份证号" v-model="idcard" :readonly="read"/>
				</li>
			</ul>
			
		</div>
		<button class="config" @click="QYC.click('sub')" v-show="!read">提交</button>

		<Waiting v-show='waiting'></Waiting>
	</div>
</template>
<script>
	import Rem from '@/utils/rem'
	import {
		QYC
	} from '@/QYC/QYC'
	import {
		fire
	} from "@/utils/envent.js";
	import Tabbar from '../../components/tabbar.vue'
	import Waiting from '../../components/showwait.vue'
	import {
		Toast,
		Swipe,
		SwipeItem,
		NoticeBar,
		Icon,
		Dialog,
		NavBar,
		Tab,
		Tabs,
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
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
		},
		data() {
			return {
				tabbarActive: 0,
				waiting: false,
				jwt: '',
				nickname: '',
				realname: '',
				idcard: '',
				tabMuen: [{
						'nid': 1,
						'ntitle': '支付密码'
					},
					{
						'nid': 2,
						'ntitle': '登录密码'
					},
				],
				read: false
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
				self.jwt = self.QYC.getItem("jwt")
			},
			on_vue_mounted() {
				var self = this;
				self.getUserInfo();
				
			},
			on_click_sub() {
				var self = this;
				var idcardtest = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
				if (self.nickname == '') {
					Toast("昵称不能为空")
					return false;
				}
				if (self.realname == '') {
					Toast("姓名不能为空")
					return false;
				}
				if ( !(idcardtest).test(self.idcard)) {
					Toast({
						message: "请正确核对身份证号码",
						duration: 1000
					})
					return;
				}
				
				self.QYC.get({
					name: 'realname',
					url: process.env.BASE_API + '/hall/realname',
					params: {
						jwt: self.jwt,
						nickname: self.nickname,
						realname: self.realname,
						idcard: self.idcard
					}
				})
			},
			on_http_realname(res) {
				var self = this;
				Toast(res.data.errmsg)
				const homePage = plus.webview.getWebviewById('king.home.home');
				fire(homePage, "RefreshGlobal", {
					type: "refresh"
				})
			},
			getUserInfo() {
				var self = this;
				self.QYC.get({
					name: 'userinfo',
					url: process.env.BASE_API + '/hall/getuserinfo',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_userinfo(res) {
				var self = this;
				self.nickname = res.data.userinfo.nickname;
				self.realname = res.data.userinfo.realname;
				self.idcard = res.data.userinfo.idcard;
				if(self.nickname == ""){
					self.read = false
				}else{
					self.read = true
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
			@background();
			-webkit-font-smoothing: antialiased;
			font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
		}
	}

	html,
	body {
		width: 100%;
		height: 100%;
	}
	::-webkit-input-placeholder { /* WebKit, Blink, Edge */
		color: #9789ab;
	}

	.van-tabs--line .van-tabs__wrap {
		height: 0.88rem;
	}

	.van-tabs__nav--line {
		padding: 0;
		border-bottom: 1px solid #f5f5f5;
	}

	.van-tabs__line {
		bottom: 0;
		background-color: #a37f51;
	}

	.van-tab--active {
		color: #a37f51;
	}

	.box {
		width: 100%;
		height: auto;
		@box();
		padding-bottom: 1.15rem;

		ul {
			padding: 0 0.4rem;

			li {
				display: flex;
				height: 0.95rem;
				align-items: center;
				border-bottom: 1px solid #9d56d7;
				position: relative;

				span {
					display: block;
					width: 1.9rem;
					font-size: 0.28rem;
					color: #fff;
				}

				input {
					border: 0;
					font-size: 0.28rem;
					background: none;
					padding: 0;
					margin: 0;
					color: #fff;
				}

				.getcode {
					position: absolute;
					padding: 0.15rem 0.2rem;
					font-size: 0.28rem;
					color: #a37f51;
					border: 1px solid #a37f51;
					border-radius: 0.5rem;
					right: 0;
				}
			}
		}
	}
	.config {
		display: block;
		width: 5.24rem;
		height: 0.91rem;
		background: #7904db;
		padding: 0;
		margin: 1.7rem auto 0;
		color: #fff;
		font-size: 0.26rem
	}
</style>
