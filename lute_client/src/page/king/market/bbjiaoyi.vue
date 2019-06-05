<template>
	<div>
		<!-- mui头部 -->
		<van-nav-bar class="top" title="币币交易" fixed left-arrow />
		<div class="clear"></div>
		<div class="content">
			<div class="content_top">
				<span class="hl">ETH/LCC(当前汇率) : <span>3241.38</span></span><br />
				<!--<div class="jiaoyigoumai">
					<van-collapse v-model="activeNames">
  						<van-collapse-item title="ETH交易购买" name="2">	 
  						</van-collapse-item>
					</van-collapse>
					
				</div>-->

				<div class="jiaoyigoumai" style="">
					<span style="margin-left:0.35rem ;">ETH交易购买LCC</span>
				</div>
				<span class="hl_mount">
					<span class="mount" style="color:#fff ;font-size: 0.28rem;">数量</span>
					<input type="text" placeholder="请输入您交易的数量" class="jiaoyimun"/>
					<span class="ethqb" style="font-size: 0.22rem;"><span>ETH | </span>全部</span>
				</span>
			</div>
			<span class="keyong">可用0.000000ETH</span>
			<div class="content_bottom">
				<span>以太坊钱包地址</span>
				<div class="address">
					<input type="text" placeholder="请输入以太坊钱包地址" />
				</div>
				<span>交易成功后到账数量</span>
				<span style="color: #fff;">0.000LCC</span>
			</div>
			<div class="btn">
				<span>提交委托交易</span>
			</div>
		</div>


	</div>
</template>
<script>
	import Rem from "@/utils/rem";
	import {
		QYC
	} from "@/QYC/QYC";
	import Tabbar from "../../components/tabbar.vue";
	import {
		Toast,
		Swipe,
		NoticeBar,
		Icon,
		NavBar,
		Cell,
		CellGroup,
		Field,
		Collapse,
		CollapseItem

	} from "vant";
	export default {
		components: {
			Tabbar,
			[Toast.name]: Toast,
			[NoticeBar.name]: NoticeBar,
			[Icon.name]: NoticeBar,
			[NavBar.name]: NavBar,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Collapse.name]: Collapse,
			[CollapseItem.name]: CollapseItem
		},
		data() {
			return {
				tabbarActive: 1,
				activeNames: ['1']
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
			},
			on_vue_mounted() {
				var self = this;
			},

		}
	};
</script>

<style lang="less">
	@import '../../../assets/public/public.css';
	@import '../../../assets/public/animate.min.css';
	@import '../../../assets/public/public.less';

	:global {
		body {
			-webkit-font-smoothing: antialiased;
			font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
			@background();
		}
	}

	 .jiaoyimun::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #a862e3;
	}

	html,
	body {
		width: 100%;
		height: 100%;
	}


	.clear {
		width: 100%;
		height: 1px;
		clear: both;
	}

	.tabbar {
		width: 100%;
		height: 55px;
		clear: both;
	}

	.top {
		flex-basis: 0.35rem;
	}

	.content {
		width: 100%;
		border-top: 1px solid #d2d2d2;
		height: 9.56rem;
		@box();
		margin-top: 0.90rem;
		position: relative;

		.keyong {
			position: absolute;
			top: 3.4rem;
			left: 0.43rem;
			color: #bf90e6;
			font-size: 0.16rem
		}

		.content_top {
			width: 6.66rem;
			height: 2.9rem;
			border-bottom: 1px solid #d2d2d2;
			position: absolute;
			top: 0.35rem;
			left: 0.43rem;

			.hl {
				color: #fff;
			}
		}

		input {
			margin-left: 0.5rem;
		}

		.ethqb {
			margin-left: 0.8rem;
			color: #fff;
		}

		.jiaoyigoumai {
			width: 6rem;
			height: 0.8rem;
			/*border: 1px solid red;*/
			@background();
			text-align: left;
			line-height: 0.8rem;
			font-size: 0.23rem;
			color: #999;
			margin-top: 0.36rem;
			margin-bottom: 0.57rem;
			border-radius: 0.1rem;
		}

		.jiaoyigoumai::after {
			content: '';
			display: inline-block;
			width: 0.2rem;
			height: 0.2rem;
			border-top: 2px solid #BBBBBB;
			border-right: 2px solid #BBBBBB;
			transform: rotate(135deg);
			margin-left: 3rem;

		}

		.content_bottom {
			position: absolute;
			top: 4.2rem;
			left: 0.43rem;
			overflow: hidden;

			span:nth-child(1) {
				font-size: 0.27rem;
				color: #fff;
			}

			span:nth-child(2) {
				font-size: 0.28rem;
				color: #fff;
				float: right;
			}

			span:nth-child(3) {
				font-size: 0.28rem;
				color: #fff;
				float: left;
				margin-right: 2.8rem;

			}

			.address {
				width: 6rem;
				height: 0.8rem;
				@background();
				border-radius: 0.1rem;
				text-align: left;
				line-height: 0.8rem;
				margin-top: 0.23rem;
				margin-bottom: 0.69rem;
			}

		}

		.btn {
			width: 6rem;
			height: 0.8rem;
			border-radius: 0.35rem;
			color: white;
			background: #c09f6d;
			background: -webkit-gradient(linear, left top, right top, from(#c09f6d), to(#9c6e38));
			background: linear-gradient(to right, #c09f6d, #9c6e38);
			text-align: center;
			font-size: 0.3rem;
			line-height: 0.8rem;
			position: absolute;
			top: 7.7rem;
			left: 0.8rem;
		}

	}
</style>
