<template>
	<div>
		<header class="mui-bar mui-bar-nav" style="background:#fff;box-shadow: none;height: 0.88rem;border-bottom: 1px solid #e1e0e0;">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">动态钱包</h1>
		</header>
		<div style="width: 100%; height: 0.88rem"></div>

		<div class="box">
			<div class="accountDetail">
				<p>账户总收益：<span>{{commission}}</span></p>
				<button @click="QYC.click('cashClick')">提现</button>
			</div>
		</div>

		<div class="tablebox">
			<table class="table">
				<tr>
					<th class="tel">对方会员账户</th>
					<th>姓名</th>
					<th>时间</th>
					<th>买入金额</th>
					<th>收益</th>
					<th>推荐人</th>
				</tr>
				<tr v-for="(item,index) in dyList" :key="index">
					<td>{{item.tel}}</td>
					<td>{{item.nickname}}</td>
					<td>{{item.createtime}}</td>
					<td>{{item.money}}</td>
					<td class="money">{{item.profit}}</td>
					<td>{{item.tuijianren}}</td>
				</tr>
			</table>
		</div>


		<!-- 提现 -->
		<van-popup v-model="cashConfirm">
			<div class="confirmPayBox">
				<div class="closeConfirm">
					<img src="../../../assets/images/close.png" class="close" @click="QYC.click('close')">
				</div>
				<p class="confirmTitle">提现</p>
				<p class="tishi">当前账户余额：￥{{commission}}</p>
				<input type="text" v-model="tx_money" placeholder="请输入提现金额" class="pwIpt">
				<input type="password" v-model="tx_pwd" placeholder="请输入密码" class="pwIpt">
				<van-button size="large" class="logBtn" @click="QYC.click('confirmCash')">确定</van-button>
			</div>
		</van-popup>

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
		Icon,
		Dialog,
		NavBar,
		Popup,
		Button
	} from 'vant'

	export default {
		components: {
			Tabbar,
			Waiting,
			[Toast.name]: Toast,
			[Dialog.name]: Dialog,
			[NavBar.name]: NavBar,
			[Popup.name]: Popup,
			[Button.name]: Button,
		},
		data() {
			return {
				waiting: false,
				jwt: "",
				cashConfirm: false,
				dyList: [],
				commission: 0,
				tx_money: "",
				tx_pwd: ""
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
				self.jwt = self.QYC.getItem("jwt");
			},
			on_vue_mounted() {
				var self = this;
				self.getDyData();
			},
			on_click_close() {
				var self = this;
				self.cashConfirm = false;
			},
			on_click_cashClick() {
				var self = this;
				self.cashConfirm = true;
			},
			getDyData(){
				var self = this;
				self.QYC.get({
					name: 'dylist',
					url: process.env.BASE_API + '/market/dynamicwallet',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_dylist(res){
				var self = this;
				if(res.data.errcode == 1){
					self.dyList = res.data.list;
					self.commission = res.data.commission;
				}else{
					Toast({
						message: res.data.errmsg,
						duration: 1000
					})
				}
			},
			on_click_confirmCash(){
				var self = this;
				if(self.tx_money == ""){
					Toast({
						message: "请输入提现金额",
						duration: 1000
					})
					return false;
				}
				
				if(self.tx_pwd == ""){
					Toast({
						message: "请输入支付密码",
						duration: 1000
					})
					return false;	
				}
				
				self.QYC.get({
					name: 'tixian',
					url: process.env.BASE_API + '/market/tixian',
					params: {
						jwt: self.jwt,
						num: self.tx_money,
						zfpwd: self.tx_pwd
					}
				})
			},
			on_http_tixian(res){
				var self = this;
				if(res.data.errcode == 1){
					Toast("提现成功")
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
			background: #f5f5f5;
			-webkit-font-smoothing: antialiased;
			font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
		}
	}

	html,
	body {
		width: 100%;
		height: 100%;
	}
	.van-popup {
		border-radius: 0.2rem;
	}

	.box {

		.accountDetail {
			padding: 0 0.27rem;
			height: 0.95rem;
			display: flex;
			align-items: center;
			justify-content: space-between;

			p {
				font-size: 0.28rem;
				color: #333;

				span {
					font-size: 0.28rem;
					color: #a37f51;
				}
			}

			/*button {
				width: 1.62rem;
				height: 0.5rem;
				padding: 0;
				color: #fff;
				font-size: 0.28rem;
				background: url("../../../assets/images/smallbg.png") no-repeat 0 0;
				background-size: 100%;
			}*/
		}
	}

	.tablebox {
		max-height: 11rem;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.table {
		width: 100%;
		table-layout: fixed;
		text-align: center;

		th {
			font-style: normal;
			font-size: 0.26rem;
			border-top: 1px solid #e1e0e0;
			border-bottom: 1px solid #e1e0e0;
			color: #333;
			font-weight: normal;
			padding: 0.3rem 0;
			background: #fff;
		}

		.tel {
			width: 2rem;
		}

		tr:nth-of-type(2) {
			margin-top: 0.5rem;
		}

		td {
			padding: 0.3rem 0;
			word-break: break-all;
			color: #5b5b5b;
			font-size: 0.26rem;
			background: #fff;
		}
	}

	.confirmPayBox {
		width: 6.68rem;
		height: 6.03rem;
		background: #fff;
		border-radius: 0.2rem;

		.closeConfirm {
			width: 0.26rem;
			height: 0.26rem;
			position: absolute;
			top: 0.1rem;
			right: 0.1rem;

			img {
				width: 100%;
				height: 100%;
				position: absolute;
				right: 0.13rem;
				top: 0.13rem;
			}
		}

		.confirmTitle {
			width: 100%;
			line-height: 0.9rem;
			text-align: center;
			font-size: 0.32rem;
			color: #a37f51;
		}

		.upImg {
			width: 1.28rem;
			height: 1.28rem;
			position: relative;
			background: #f5f5f5;
			margin: 0.18rem auto;
			border-radius: 0.12rem;

			img {
				width: 95%;
				height: auto;
				max-height: 95%;
				position: absolute;
				@incenter();
			}
		}

		.tishi {
			font-size: 0.28rem;
			color: #a37f51;
			margin-left: 0.7rem;
		}

		.pzText {
			width: 100%;
			font-size: 0.24rem;
			text-align: center;
			color: #333;
		}

		.pwIpt {
			display: block;
			width: 5.2rem;
			height: 0.84rem;
			border: 0;
			border-bottom: 1px solid #d2d2d2;
			margin: 0.25rem auto 0;
			font-size: 0.28rem;
			border-radius: 0;
		}

		.logBtn {
			text-align: center;
			width: 5.22rem;
		}
	}
</style>
