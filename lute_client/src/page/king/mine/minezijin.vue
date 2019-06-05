<template>
	<div>
		<van-nav-bar class="top" title="我的资金" left-arrow fixed @click-left="onClickLeft" />
		<div style="width: 100%; height: 46px;"></div>
		<!-- <div class="gameBox">
			<div>ETH总额</div>
			<div>0.00</div>
			<div>可用余额：0.000000</div>
		</div>
		<div class="zc_search">
			<span>
				<div><img src="../../../assets/images/icon/ziji.png"/></div>
				<span>冻结资产</span>
			</span>
			<span style="color: #855f33;">0.000000</span>
		</div> -->
		
		<div class="BTC">
			<div class="BTC_list" @click="QYC.click('gohuzhuan')">
				<div><img src="../../../assets/images/mine/hz.png"/></div>
				<span>互转</span>
			</div>
			<!-- <div class="BTC_list" @click="QYC.click('goTibi')">
				<div><img src="../../../assets/images/icon/tb.png"/></div>
				<span>提币</span>
			</div>
			<div class="BTC_list" @click="QYC.click('goChongzhi')">
				<div><img src="../../../assets/images/icon/cz.png"/></div>
				<span>充币</span>
			</div>
			<div class="BTC_list" @click="QYC.click('gojilu')">
				<div><img src="../../../assets/images/icon/jl.png"/></div>
				<span>记录</span>
			</div> -->
		</div>
		
		<!--<div class="clear"></div>
		<div class="tabbar"></div>
		<Tabbar :sonActive='tabbarActive'></Tabbar>-->
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
		Field
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
		},
		data() {
			return {
				tabbarActive: 3,
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
			onClickLeft(){
				var self = this;
				self.QYC.closeCurrentWebview();
			},
			on_click_gojilu(){
				var self = this;
				self.QYC.openWebview({
					url:'./king.mine_jilu.html',
					id:'king.mine_jilu'
				},{	
					titleNView:null
				})
				
			},
			on_click_gohuzhuan(){
				var self = this;
				self.QYC.openWebview({
					url:'./king.mine_huzhuan.html',
					id:'king.mine_huzhuan'
				},{	
					titleNView:null
				})
				
			},
			on_click_goChongzhi(){
				var self = this;
				self.QYC.openWebview({
					url:'./king.mine_zijinchongzhi.html',
					id:'king.mine_zijinchongzhi'
				},{	
					titleNView:null
				})
			},
			on_click_goTibi(){
				Toast("待开发中")
			}
			
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
	.gameBox{
    	height: 2.68rem;
    	line-height: 0.6rem;
    	margin-top: 1.10rem;
    	display: block;
    	color: #fff;
    	background: #c09f6d;
    	background: -webkit-gradient(linear, left top, right top, from(#c09f6d), to(#9c6e38));
        background: linear-gradient(to right, #c09f6d, #9c6e38);
        position: relative;
        text-align: center;
		div:nth-child(1){
			width: 100%;
			font-size: 0.2rem;
			position: absolute;
			top: 0.62rem;
			margin: 0 auto;
		}
		div:nth-child(2){
			width: 100%;
			font-size: 0.38rem;
			position: absolute;
			top: 1.15rem;
		}
		div:last-child{
			width: 4.10rem;
			height: 0.68rem;
			color:#c1a06e ;
			border-radius:0.32rem ;
			background-color: #7e5a2d;
			position: absolute;
			top: 1.74rem;
			left: 23%;
			font-size: 0.22rem;
			line-height: 0.68rem;
		}
		
	}
	
	
	.zc_search{
		height: 0.88rem;
		position: relative;
		background-color: white;
		line-height: 0.88rem;
		font-size: 0.29rem;
		div{
			width: 0.29rem;
			height: 0.34rem;
			float: left;
			position: absolute;
			top: 0.28rem;  
			left: 0.2rem;     
		}
		img{
			width: 100%;
			height: 100%;
			
		}
		span:nth-child(1) span{
			float: left;
			position: absolute;
			left: 0.65rem;
			
		}
		span:last-child{
			float: right;
			margin-right: 0.3rem;
		}
	}
		.BTC{
			height: 2.87rem;
			width: 7.02rem;
			margin-top: 0.14rem;
			margin-left: 0.23rem;
			/*background-color: white;*/
			overflow: hidden;
			.BTC_list{
				width: 3.46rem;
				height: 1.36rem;
				float: left;
				/*border: 1px solid black;*/
				/*margin: 0.05rem;*/
				background-color: white;
				div{
					width: 0.8rem;
					height: 0.8rem;
					display: inline-block;
					vertical-align: middle;
					margin-left: 0.5rem;
					margin-right: 0.5rem;
					img{
						width: 100%;
						height: 100%;
					}
				}
				span{
					line-height: 1.36rem;
					font-size: 0.35rem;
					padding-left: 0.45rem;
					border-left: 1px solid #f5f5f5;
				}
			}
			.BTC_list:nth-child(1){
				margin-right: 0.1rem;
			}
			.BTC_list:nth-child(3){
				margin-top: 0.1rem;
				margin-right: 0.1rem;
			}
			.BTC_list:nth-child(4){
				margin-top: 0.1rem;
				
			}
		}	
</style>
