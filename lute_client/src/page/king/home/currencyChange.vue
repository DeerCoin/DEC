<template>
	<div>
		<van-nav-bar title="货币转换" left-arrow @click-left="onClickLeft" />
		<div style="width: 100%;height: 0.13rem;"></div>

		<ul class="topBox">
			<li>
				<span>转化类型</span>
				<input type="text" :value="lcc_type" placeholder="LCC" readonly>
				<!-- <span class="arrow"></span> -->
			</li>
			<li>
				<span>可用DEC</span>
				<input type="text" :value="max_num" readonly>
			</li>
			 <li>
				<span>最大可转数量</span>
				<input type="text" :value="use" readonly>
			</li> 
		</ul>
		<ul class="currencyList">
			<li class="currencyItem">
				<p>转入数字钱包地址</p>
				<input type="text" v-model="id" placeholder="请输入数字钱包地址" style="width: 100%;">
			</li>
			<li class="currencyItem">
				<p>转入总额</p>
				<span>￥</span><input type="text" v-model="all_money" placeholder="请输入转入总额">
			</li>
			<li class="currencyItem">
				<p>交易密码</p>
				<input type="password" v-model="paypw" placeholder="请输入交易密码">
			</li>
		</ul>

		<div size="large" class="loginBtn" @click="confirm">确认转入</div>

	</div>
</template>
<script>
	import Rem from "@/utils/rem";
	import {
		QYC
	} from "@/QYC/QYC";
	import {
		Toast,
		Cell,
		CellGroup,
		NavBar,
		Field,
		Button
	} from "vant";
	export default {
		components: {
			[Toast.name]: Toast,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[NavBar.name]: NavBar,
			[Field.name]: Field,
			[Button.name]: Button,
		},
		data() {
			return {
				lcc_type:"DEC互转",
				use:"112DEC",
				max_num:"112DEC",
				id: "",
				all_money: "",
				paypw: "",
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
				self.jwt = self.QYC.getItem("jwt");
			},
			on_vue_mounted() {
				var self = this;
				self.getTransfer();
			},
			onClickLeft() {
				var self = this;
				self.QYC.closeCurrentWebview();
			},
			getTransfer(){
				var self = this;
				self.QYC.get({
					name: 'transfer',
					url: process.env.BASE_API + '/market/getlcctransfer',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_transfer(res){
				var self = this;
				if(res.data.errcode == 1){
					self.use = res.data.canmaxlcc;
					self.max_num = res.data.lcc;
				}else{
					Toast(res.data.errmsg)
				}
				console.log("json=="+JSON.stringify(res.data))
			},
			confirm(){
				var self = this;
				if(self.id == ""){
					Toast({
						message: "请输入数字钱包地址",
						duratuin: 1000
					})
					return;
				}
				if(self.all_money == ""){
					Toast({
						message: "请输入转入总额",
						duratuin: 1000
					})
					return;
				}
				if(self.paypw == ""){
					Toast({
						message: "请输入交易密码",
						duratuin: 1000
					})
					return;
				}
				self.QYC.get({
					name: 'conjy',
					url: process.env.BASE_API + '/market/lcctransfer',
					params: {
						jwt: self.jwt,
						tpid: self.id,
						num: self.all_money,
						zfpwd: self.paypw,
						canmaxlcc: self.use
					}
				})
			},
			on_http_conjy(res){
				var self = this;
				Toast(res.data.errmsg)
				if(res.data.errcode == 1){
					self.all_money = "";
					self.paypw = "";
					self.id = "";
				}else{
					self.paypw = "";
				}
				
			}

		}
	};
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

	.topBox {
		background: #7904db;
		padding: 0 0.38rem;
		color: white;
		li {
			padding: 0.33rem 0;
			border-bottom: 1px solid #9d56d7;

			span {
				font-size: 0.28rem;
				display: inline-block;
				width: 2rem;
			}

			input {
				font-size: 0.28rem;
				color: white;
			}
			.arrow{
				width: 0;
			height: 0;
			border-left: 6px solid transparent;
			/* 左边框的宽 */
			border-right: 6px solid transparent;
			/* 右边框的宽 */
			border-top: 6px solid #fff;
			/* 下边框的长度|高,以及背景色 */
			font-size: 0;
			line-height: 0;
			margin-left: -1.9rem;
			margin-top: 0.1rem;
			}
		}
	}

	.currencyList {
		width: 100%;
		height: auto;
		background: #7904db;
		margin-top: 0.2rem;
		color: white;
		.currencyItem {
			width: 6.67rem;
			height: auto;
			padding: 0.16rem 0;
			border-bottom: 1px solid #9d56d7;
			margin: 0 auto;

			p {
				font-size: 0.28rem;
				padding: 0.2rem 0;
				color: #fff;
			}

			span {
				font-size: 0.35rem;
				margin-right: 0.2rem;
			}

			input {
				// width: 100%;
				font-size: 0.26rem;
				display: inline-block;
				border: 0;
				color: white;
			}

		}
		.currencyItem:last-child{
			border:none
		}
	}

	.getCodeBtn {
		@border();
		@font-color();
		border: 0.02rem solid;
		border-radius: 0.3rem;
		background: none;

	}

	.codeImg {
		background: #f5f5f5;
		@font-color();
		font-size: 0.34rem;
		border: none;
	}
	.loginBtn{
		width: 5.92rem;
		height: 0.89rem;
		border-radius: 0.1rem;
		background-color: #7904db;
		color: white;
		font-size: 0.3rem;
		margin: 0 auto;
		margin-top: 1.17rem;
		text-align: center;
		line-height: 0.89rem;
		
	}
</style>
