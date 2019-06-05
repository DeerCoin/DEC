<template>
	<div>
		<header class="mui-bar mui-bar-nav" style="background:#fff;box-shadow: none;height: 0.88rem;border-bottom: 1px solid #e1e0e0;">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">智能钱包</h1>
		</header>
		<div style="width: 100%; height: 0.88rem"></div>

		<div class="box">
			<div class="priceDetail">
				<p>合约资产估值</p>
				<p>{{heyue}}</p>
			</div>
		</div>

		<ul>
			<li @click="QYC.click('toCapitalRecord')">
				<p>DEC账户权益</p>
				<p>
					<span>{{lcc}}</span>
					
				</p>
			</li>
			<li>
				<p>累计收益</p>
				<p>
					<span>{{ljlcc}}</span>
				</p>
			</li>
			
		</ul>
		<div class="suanli">
			<p>算力</p>
			<p>
				<span>{{power}}</span>
			</p>
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
		Cell,
		CellGroup,
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
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
		},
		data() {
			return {
				tabbarActive: 0,
				waiting: false,
				jwt: "",
				heyue: "",
				lcc: "",
				ljlcc: "",
				power: "",
				rmb: ""
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
				self.getWalletData();
			},
			on_click_toCapitalRecord() {
				var self = this;
				self.QYC.openWebview({
					url: './king.home.capitalRecord.html',
					id: 'king.home.capitalRecord'
				}, {
					titleNView: null,
				})
			},
			getWalletData(){
				var self = this;
				self.QYC.get({
					name: 'aiwallet',
					url: process.env.BASE_API + '/hall/aiwallet',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_aiwallet(res){
				var self = this;
				console.log("sss=="+JSON.stringify(res))
				if(res.data.errcode == 1){
					self.heyue = res.data.heyue;
					self.lcc = res.data.lcc;
					self.ljlcc = res.data.ljlcc;
					self.power = res.data.power;
					self.rmb = res.data.rmb;
				}else{
					Toast(res.data.errmsg)
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
		background: #362b61;
		margin-top: 0.45rem;
		overflow: hidden;
		padding-bottom: 0.2rem;

		.priceDetail {
			width: 7.04rem;
			height: 2.22rem;
			margin: 0.3rem auto 0;
			background: url("../../../assets/images/qianbaoBg.png") no-repeat 0 0;
			background-size: 100%;
			overflow: hidden;

			p {
				text-align: center;
				font-size: 0.3rem;
				color: #fff;
				margin-top: 0.6rem;
			}

			p:last-of-type {
				margin-top: 0.3rem;
				font-size: 0.4rem;
			}
		}
	}

	ul {
		padding: 0 0.4rem;
		background: #7904db;
		width: 94%;
		height: auto;
		border-radius: 0.1rem;
		margin: 0 auto;
		margin-top: 0.01rem;
		li {
			height: 0.98rem;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			p {
				font-size: 0.28rem;
				color: #fff;
				display: flex;
				align-items: center;

				span {
					font-size: 0.28rem;
					color: #fff;
					margin-right: 0.25rem;
				}

				img {
					width: 0.15rem;
					height: 0.24rem;
				}
			}
		}

		li:first-of-type {
			border-bottom: 1px solid #a66bd6;
		}
	}

	.suanli {
		height: 0.98rem;
		width: 94%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.4rem;
		background: #7904db;
		margin: 0 auto;
		border-radius: 0.1rem;
		color: white;
		margin-top: 0.2rem;

		p {
			font-size: 0.28rem;
			color: #fff;
			display: flex;
			align-items: center;

			span {
				font-size: 0.28rem;
				color: #fff;
				margin-right: 0.25rem;
			}
		}
	}

	/*button {
		display: block;
		width: 5.24rem;
		height: 0.91rem;
		background: url("../../../assets/images/anniuBtn.png") no-repeat 0 0;
		background-size: 100%;
		padding: 0;
		margin: 1.9rem auto 0;
		color: #fff;
		font-size: 0.26rem
	}*/
</style>
