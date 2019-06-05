<template>
	<div>
		<header class="mui-bar mui-bar-nav" style="background:#fff;box-shadow: none;height: 0.88rem;border-bottom: 1px solid #e1e0e0;">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">资金记录</h1>
		</header>
		<div style="width: 100%; height: 0.88rem"></div>

		<div class="box">
			<p class="topDetail">账户余额收支明细：<span>{{lcc}}</span> DEC</p>
			<ul>
				<li v-for="(item,index) in moneyList" :key="index">
					<img src="../../../assets/images/mine/jl.png"/>
					<div>
						<p class="name">{{item.title}}</p>
						<p>来源：{{item.from}}</p>
						<p>时间：{{item.createtime}}</p>
					</div>
			 		<span class="price" v-if="item.sl>0">+{{item.sl}}</span>
					<span class="price" v-else>{{item.sl}}</span>
					<span class="decNum">DEC:{{item.dec}}</span>
				</li>

			</ul>
		</div>
	</div>
</template>
<script>
	import Rem from '@/utils/rem'
	import {
		QYC
	} from '@/QYC/QYC'
	import {
		Toast,
		NavBar,
		Tab,
		Tabs,
	} from 'vant'

	export default {
		components: {
			[Toast.name]: Toast,
			[NavBar.name]: NavBar,
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
		},
		data() {
			return {
				jwt: "",
				moneyList: [],
				lcc: 0
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
				self.getMoneyList();
			},
			getMoneyList(){
				var self = this;
				self.QYC.get({
					name: 'money',
					url: process.env.BASE_API + '/market/aiwalletlog',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_money(res){
				var self = this;
				console.log(JSON.stringify(res.data))
				if(res.data.errcode == 1){
					self.moneyList = res.data.list;
					self.lcc = res.data.lcc;
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
		.topDetail {
			height: 0.83rem;
			padding-left: 0.25rem;
			line-height: 0.83rem;
			font-size: 0.28rem;
			color: #fff;
			span {
				font-size: 0.28rem;
			}
		}

		ul {

			li {
				padding: 0.22rem;
				display: flex;
				@box();
				border-top: 1px solid #e1e0e0;
				border-bottom: 1px solid #e1e0e0;
				margin-bottom: 0.1rem;
				position: relative;

				img {
					width: 0.44rem;
					height: 0.42rem;
					margin-right: 0.15rem;
				}

				div {
					p {
						font-size: 0.26rem;
						color: #c99bf1;
					}

					.name {
						color: #fff;
						margin-bottom: 0.15rem;
					}
				}

				.price {
					position: absolute;
					right: 0.25rem;
					color: #fff;
				}
				.decNum{
					position: absolute;
					right: 0.25rem;
					color: #c99bf1;
					font-size: 0.26rem;
					top: 0.78rem;
				}
			}
		}
	}
</style>
