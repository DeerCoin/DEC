<template>
	<div>
		<van-nav-bar class="top" title="记录" left-arrow fixed @click-left="onClickLeft"/>

		<div class="gameBox">
			<div class="all">
				<span class="arrow" @click="QYC.click('chooseAll')">{{type}}</span>
				<div>
					<span>0.00000000BTC</span>
					<span>≈0.00CNY</span>
				</div>
			</div>
		</div>
		
		<van-popup v-model="showChoose">
			
			<div class="chooseBox">
				<div class="closeChoose">
					<img src="../../../assets/images/close.png" @click="QYC.click('closeAll')">
				</div>
				<div class="chooseItem" v-for="(item,index) in chooseList" :key="index">
					<span :class="item.isSelected?'iconfont icon-xuanze':'iconfont icon-xuanze1'" @click="QYC.click('chooseType',index)"></span>
					<span>{{item.name}}</span>
				</div>
				
			</div>
		</van-popup>
		

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
		NavBar,
		NoticeBar,
		Search,
		Field,
		Popup
	} from "vant";
	export default {
		components: {
			Tabbar,
			[Toast.name]: Toast,
			[Search.name]: Search,
			[Field.name]: Field,
			[NavBar.name]: NavBar,
			[Popup.name]: Popup,
		},
		data() {
			return {
				all: {
					user: {
						avatar: '',
						uid: 100001,
						name: '测试',
						coin: 0
					},
					totalcal: 0,
					userex: {
						usdt: 0
					}
				},
				showChoose: false,
				chooseList: [{
					name: "全部",
					isSelected: true
				},{
					name: "充币",
					isSelected: false
				},{
					name: "提币",
					isSelected: false
				},{
					name: "C2C",
					isSelected: false
				}],
				type: "全部"
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
			onClickLeft() {
				var self = this;
				self.QYC.closeCurrentWebview();
			},
			on_vue_created() {
				var self = this;
				
			},
			on_vue_mounted() {
				var self = this;
			},
			on_click_chooseAll() {
				var self = this;
				self.showChoose = true;

			},
			on_click_closeAll() {
				var self = this;
				self.showChoose = false;
			},
			on_click_chooseType(index){
				var self= this;
				for(var i=0; i<self.chooseList.length; i++){
					self.chooseList[i].isSelected = false;
					if(index == i){
						self.chooseList[i].isSelected = true;
						self.type = self.chooseList[i].name;
						self.showChoose = false;
					}
				}
			}
			
		
		}
	};
</script>

<style lang="less">
	@import '../../../assets/public/public.css';
	@import '../../../assets/public/animate.min.css';
	@import '../../../assets/public/public.less';
	@import '../../../assets/public/iconfont.css';
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
	.van-popup{
		background: none;
	}
	.chooseBox{
		width: 6.64rem;
		height: 4.12rem;
		background: #fff;
		border-radius: 0.2rem;
		.closeChoose{
			width: 100%;
			height: auto;
			overflow: hidden;
			img{
				display: block;
				width: 0.26rem;
				height: 0.26rem;
				float: right;
				margin-right: 0.1rem;
				margin-top: 0.1rem;
			}
		}
		.chooseItem{
			width: 100%;
			height: 0.84rem;
			text-align: center;
			span{
				
			}
			span:nth-of-type(1){
				color: #866034;
			}
		}
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
		font-size: 0.35rem
	}
	
	.gameBox {
		height: 3.52rem;
		background-color: white;
		margin-top: 1.10rem;
		overflow: hidden;
	}
	
	.all {
		height: 2.80rem;
		width: 7rem;
		border-radius: 0.1rem;
		line-height: 0.6rem;
		margin: 0 auto;
		margin-top: 0.2rem;
		display: block;
		color: #fff;
		background: #c09f6d;
		background: -webkit-gradient(linear, left top, right top, from(#c09f6d), to(#9c6e38));
		background: linear-gradient(to right, #c09f6d, #9c6e38);
		span {
			font-size: 0.27rem;
			margin-left: 0.22rem;
			margin-top: 0.4rem;
		}
		div {
			width: 3.67rem;
			height: 0.79rem;
			line-height: 0.49rem;
			margin: 0.5rem auto;
			vertical-align: middle;
		}
		div span:nth-child(1) {
			font-size: 0.38rem
		}
		div span:last-child {
			font-size: 0.22rem
		}
	}
	
	.arrow {
		position: relative;
		width: 130px;
		height: 30px;
		line-height: 30px;
		text-indent: 10px;
		border-radius: 5px;
		/*border: 1px solid #ccc;*/
	}
	
	.arrow::after {
		/*形成三角*/
		content: '';
		border-top: 5px solid white;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		/*位置居中*/
		position: absolute;
		right: -20px;
		top: 50%;
		transform: translateY(-25%);
		/*定义变形中心点及过渡效果*/
		transform-origin: 50% 25%;
		transition: transform .5s;
	}
	
	.active::after {
		/*旋转180度*/
		transform: rotate(180deg);
	}
	
	.gray {
		width: 100%;
		height: 100%;
		background-color: #808080;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		.x {
			position: absolute;
			top: 0.10rem;
			right: 0.31rem;
			font-size: 0.4rem;
			color: #000000;
			z-index: 20;
		}
		.choose {
			width: 6.64rem;
			height: 4.18rem;
			border-radius: 0.1rem;
			background-color: white;
			opacity: 1;
			/*border: 1px solid red;*/
			text-align: center;
			margin: 0 auto;
			position: fixed;
			z-index: 20;
			top: 3.9rem;
			left: 0.44rem;
			
		}
	}
	
	.gray {
		opacity: 0.75;
	}
	
	.magic-radio {
		position: absolute;
		display: none;
	}
	
	.magic-radio+label {
		position: relative;
		padding-left: 30px;
		cursor: pointer;
		vertical-align: middle;
	}
	
	.magic-radio+label:hover:before {
		animation-duration: 0.4s;
		animation-fill-mode: both;
		animation-name: hover-color;
	}
	
	.magic-radio+label.radio1:before {
		position: absolute;
		top: 0;
		left: 0;
		display: inline-block;
		width: 0.3rem;
		height: 0.3rem;
		content: '';
		border: 2px solid #866034;
	}
	
	.magic-radio+label.radio2:before {
		position: absolute;
		top: 0;
		left: 0;
		display: inline-block;
		width: 0.3rem;
		height: 0.3rem;
		content: '';
		border: 2px solid #866034;
	}
	
	.magic-radio+label.radio3:before {
		position: absolute;
		top: 0;
		left: 0;
		display: inline-block;
		width: 0.3rem;
		height: 0.3rem;
		content: '';
		border: 2px solid #866034;
	}
	
	.magic-radio+label.radio4:before {
		position: absolute;
		top: 0;
		left: 0;
		display: inline-block;
		width: 0.3rem;
		height: 0.3rem;
		content: '';
		border: 2px solid #866034;
	}
	
	.magic-radio+label:after {
		position: absolute;
		display: none;
		content: '';
	}
	
	.magic-radio[disabled]+label {
		cursor: not-allowed;
		color: #866034;
	}
	
	.magic-radio:checked+label:before {
		animation-name: none;
	}
	
	.magic-radio:checked+label:after {
		display: block;
	}
	
	.magic-radio+label:before {
		border-radius: 50%;
	}
	
	.magic-radio+label.radio1:after {
		top: 0.065rem;
		left: 0.065rem;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #866034;
	}
	
	.magic-radio+label.radio2:after {
		top: 0.065rem;
		left: 0.065rem;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #866034;
	}
	
	.magic-radio+label.radio3:after {
		top: 0.065rem;
		left: 0.065rem;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #866034;
	}
	
	.magic-radio+label.radio4:after {
		top:0.065rem;
		left: 0.065rem;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #866034;
	}
</style>