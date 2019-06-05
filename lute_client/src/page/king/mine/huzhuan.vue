<template>
	<div>
		<van-nav-bar title="提币" left-arrow @click-left="onClickLeft" />
		<div style="width: 100%;height: 0.13rem;"></div>

		<ul class="topBox">
			<li>
				<span>转化类型</span>
				<input type="text" v-model="type" placeholder="请输入转化类型">

			</li>
			<li>
				<span>最大可转数量</span>
				<input type="text" value="1000" readonly>
			</li>
		</ul>
		<ul class="currencyList">
			<li class="currencyItem">
				<p>转入数字钱包地址</p>
				<input type="text" v-model="szqianbao" placeholder="请输入数字钱包地址">
			</li>
			<li class="currencyItem">
				<p>转入总额</p>
				<span>￥</span><input type="text" v-model="num" placeholder="请输入数量">
			</li>
			<li class="currencyItem">
				<p>支付密码</p>
				<input type="password" v-model="zfpwd" placeholder="请输入支付密码">
			</li>
		</ul>

		<van-button size="large" class="logBtn" @click="QYC.click('confirmTb')">确定</van-button>

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
				type: "",
				szqianbao: "",
				num: "",
				zfpwd: "",
				jwt: "",
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
				self.jwt = self.QYC.getItem('jwt');
			},
			on_vue_mounted() {
				var self = this;
			},
			onClickLeft() {
				var self = this;
				self.QYC.closeCurrentWebview();
			},
			on_click_confirmTb() {
				var self = this;
				if(self.type==""){
					Toast({
						message: "请输入转化类型",
						duration: 1000
					})
					return
				}
				if(self.szqianbao==""){
					Toast({
						message: "请输入钱包地址",
						duration: 1000
					})
					return
				}
				if(self.num==""){
					Toast({
						message: "请输入数量",
						duration: 1000
					})
					return
				}
				if(self.zfpwd==""){
					Toast({
						message: "请输入支付密码",
						duration: 1000
					})
					return
				}
				self.QYC.get({
					name: 'tibi',
					url: process.env.BASE_API + '/market/tibi',
					params: {
						jwt: self.jwt,
						type:self.type,
						szqianbao: self.szqianbao,
						num: self.num,
						zfpwd: self.zfpwd
					}

				})
			},
			on_http_tibi(res){
				var self =this;
				Toast(res.data.errmsg)
			}

		}
	};
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

	.topBox {
		background: #fff;
		padding: 0 0.38rem;

		li {
			padding: 0.33rem 0;
			border-bottom: 1px solid #d2d2d2;

			span {
				font-size: 0.28rem;
				display: inline-block;
				width: 2rem;
			}

			input {
				font-size: 0.28rem;
			}
		}
	}

	.currencyList {
		width: 100%;
		height: auto;
		background: #fff;
		margin-top: 0.2rem;

		.currencyItem {
			width: 6.67rem;
			height: auto;
			padding: 0.16rem 0;
			border-bottom: 1px solid #d2d2d2;
			margin: 0 auto;

			p {
				font-size: 0.28rem;
				padding: 0.2rem 0;
				color: #333;
			}

			span {
				font-size: 0.35rem;
				margin-right: 0.2rem;
			}

			input {
				/*width: 100%;*/
				font-size: 0.26rem;
				display: inline-block;
				border: 0;
			}

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
</style>
