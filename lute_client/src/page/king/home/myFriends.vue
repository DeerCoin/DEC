<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">我的社区</h1>
		</header>
		<div style="width: 100%; height: 0.88rem"></div>

		<van-tabs @click="onClick">
			<van-tab v-for="(item,index) in tabMuen" :title="item.ntitle" :key="index"></van-tab>
		</van-tabs>
		<div class="topDetial">
			<div>
				<p class="num">{{reg_num}}</p>
				<p>注册人数</p>
			</div>
			<div>
				<p class="num">{{jihuonum}}</p>
				<p>DEC</p>
			</div>
		</div>
		<div class="tableBox">
			<table class="table">
				<tr style="border:none">
					<th>会员手机号</th>
					<th>昵称</th>
					<th>级别</th>
					<th>总消费</th>
				</tr>
				<tr v-for="(item,index) in friendList" :key="index">
					<td>{{item.userinfo.phone}}</td>
					<td>{{item.userinfo.nickname}}</td>
					<td v-if="item.userinfo.kslevel == -1">未激活</td>
					<td v-if="item.userinfo.kslevel == 0">矿工</td>
					<td v-else-if="item.userinfo.kslevel == 1">一级矿商</td>
					<td v-else-if="item.userinfo.kslevel == 2">二级矿商</td>
					<td v-else-if="item.userinfo.kslevel == 3">三级矿商</td>
					<td v-else-if="item.userinfo.kslevel == 4">四级矿商</td>
					<td>{{item.userinfo.expense}}</td>
				</tr>
			</table>
		</div>


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
				jwtobj: null,
				jwt: "",
				tabMuen: [{
						'nid': 1,
						'ntitle': '一级会员'
					},
					{
						'nid': 2,
						'ntitle': '二级会员'
					},
					{
						'nid': 3,
						'ntitle': '三级会员'
					},
				],
				friendList: [],
				reg_num: 0,
				lcc_num: 0,
				jihuonum: 0,
				level: 0
			}
		},

		beforeCreate() {
			Rem.init(750)
		},
		created() {
			var self = this;
			self.QYC = new QYC(this)
			self.QYC.created()
		},
		mounted() {
			var self = this
			self.QYC.mounted()
		},
		filters: {
			newtel(value1) {
				if (!value1) return ''
				let value2 = value1.toString().substr(0, 3)
				value1 = value1.toString().substr(-4, 4)
				value1 = value2 + '*'.repeat(4) + value1

				return value1
			}

		},
		methods: {
			on_vue_created() {
				var self = this

				self.jwt = self.QYC.getItem('jwt')

				window.addEventListener('RefreshGlobal', function(event) {
					//通过event.detail可获得传递过来的参数内容
					self.jwt = self.QYC.getItem('jwt')
				})
			},
			on_vue_mounted() {
				var self = this;
				self.getFriendOne();
			},
			onClick(index) {
				var self = this;
				self.level = index
				if (index == 0) {
					self.getFriendOne();
				} else if (index == 1) {
					self.getFriendTwo();
				} else if (index == 2) {
					self.getFriendThree();
				}
			},
			getFriendOne() {
				var self = this;
				self.QYC.get({
					name: 'friendone',
					url: process.env.BASE_API + '/bind/loadone',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_friendone(res) {
				var self = this;
				self.friendList = res.data.myfriend;
				if (res.data.myfriend.length == undefined) {
					self.reg_num = 0;
				} else {
					self.reg_num = res.data.myfriend.length;
				}
				self.jihuonum = res.data.jihuonum;
				

			},
			getFriendTwo() {
				var self = this;
				self.QYC.get({
					name: 'friendtwo',
					url: process.env.BASE_API + '/bind/loadtwo',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_friendtwo(res) {
				var self = this;
				self.friendList = res.data.myfriend;
				if (res.data.myfriend.length == undefined) {
					self.reg_num = 0;
				} else {
					self.reg_num = res.data.myfriend.length;
				}
				self.jihuonum = res.data.jihuonum;
			},
			getFriendThree() {
				var self = this;
				self.QYC.get({
					name: 'friendthree',
					url: process.env.BASE_API + '/bind/loadthree',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_friendthree(res) {
				var self = this;
				self.friendList = res.data.myfriend;
				if (res.data.myfriend.length == undefined) {
					self.reg_num = 0;
				} else {
					self.reg_num = res.data.myfriend.length;
				}
				self.jihuonum = res.data.jihuonum;
			},

		}
	}
</script>

<style lang="less">
	@import '../../../assets/public/public.css';
	@import '../../../assets/public/public.less';

	:global {
		body {
			background-color: #362b61;
			-webkit-font-smoothing: antialiased;
			font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
		}
	}

	html,
	body {
		width: 100%;
		height: 100%;
	}

	.van-tabs--line .van-tabs__wrap {
		height: 0.88rem;
	}

	.van-tabs__nav--line {
		padding: 0;
	}

	.van-tabs__line {
		bottom: 0;
		background-color: #fff;
	}

	.van-tab {
		background: #7904db;
	}

	.van-tab span {
		color: #bf90e6;
	}

	.van-tab--active span {
		color: #fff;
	}


	.topDetial {
		height: 1.4rem;
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #7904db;
		margin-top: 0.04rem;

		div {
			flex: 1;
			display: flex;
			align-items: center;
			flex-direction: column;
			height: 0.93rem;
			justify-content: center;
			box-sizing: border-box;

			p {
				font-size: 0.28rem;
				color: #fff;
			}

			.num {
				color: #fff;
			}
		}

		div:first-of-type {
			border-right: 1px solid #913cd9;
		}
	}

	.tableBox {
		max-height: 10rem;
		overflow-x: hidden;
		overflow-y: auto;
		background-color: #6c0cc3;
		margin-top: 0.04rem;
	}

	.table {
		width: 100%;
		table-layout: fixed;
		text-align: center;

		th {
			text-align: center;
			font-weight: normal;
			font-size: 0.28rem;
			color: #b080dc;
			padding: 0.25rem 0;
		}

		td {
			text-align: center;
			font-weight: normal;
			font-size: 0.26rem;
			color: #efe0fb;
			padding: 0.25rem 0;
		}

	}
</style>
