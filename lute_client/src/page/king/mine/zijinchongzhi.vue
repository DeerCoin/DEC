<template>
	<div>
		<van-nav-bar class="top" title="资金充值" left-arrow fixed @click-left="onClickLeft" />
		<div style="width: 100%;height: 46px;clear: both;"></div>
		<div class="zc_search">
			<div class="money">
				<span>
				充值数额
				</span>
			<input type="text" placeholder="请输入充值数额" />
			<span>BTC</span>
			</div>
			<van-button size="large" class="logBtn" @click='QYC.click("toRecharge")'>提交充值</van-button>
			
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
		Cell,
		CellGroup,
		NavBar,
		Swipe,
		SwipeItem,
		NoticeBar,
		Icon,
		Dialog,
		Search,
		Field,
		Button
	} from "vant";
	export default {
		components: {
			Tabbar,
			[Toast.name]: Toast,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[Search.name]:Search,
			[Field.name]:Field,
			[NavBar.name]:NavBar,
			[Button.name]:Button,
		},
		data() {
			return {
				all:{
					user:{
						avatar:'',
						uid:100001,
						name:'测试',
						coin:0
					},
					totalcal:0,
					userex:{
						usdt:0
					}
				},
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
				
				if (!window.plus) {
					self.jwtobj = self.QYC.getItem('jwt');
					if (self.jwtobj['jwt']) {
						self.jwt = self.jwtobj['jwt'];
						
					}
				}
				
				window.addEventListener("RefreshGlobal", function(event) {
					//通过event.detail可获得传递过来的参数内容
					self.jwtobj = self.QYC.getItem('jwt');
					if (self.jwtobj['jwt']) {
						self.jwt = self.jwtobj['jwt'];
						
					}
				});
			},
			on_vue_mounted() {
				var self = this;
			},
			on_click_toRecharge(){
				
			},
			onClickLeft(){
				var self = this;
				self.QYC.closeCurrentWebview();
			},
			
		}
	};
</script>

<style lang="less" >
	@import '../../../assets/public/public.css';
	@import '../../../assets/public/animate.min.css';
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

	

	.top{
		font-size: 0.35rem
	}
	
	
	
	.zc_search{
		height: 4.94rem;
		position: relative;
		background-color: white;
		font-size: 0.29rem; 
		.money{
			width: 6.66rem;
			height:1.16rem ;
			line-height: 1.16rem;
			border-bottom: 1px solid #d2d2d2;
			margin: 0 auto;
			font-size: 0.28rem;
			span:last-child{
				margin-left: 0.6rem;
			}
		}
		input{
			margin-left:0.75rem ;
		}
		 .btn{
		 	width:6rem;
		 	height:0.88rem ;
		 	color: #fff;
		 	border-radius: 0.38rem;
		 	text-align: center;
		 	margin: 1.5rem auto;
    		background: #c09f6d;
    		background: -webkit-gradient(linear, left top, right top, from(#c09f6d), to(#9c6e38));
            background: linear-gradient(to right, #c09f6d, #9c6e38);
		 }  
		 	
	}
		
</style>
