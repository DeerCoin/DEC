<template>
	<div>
		<!-- mui头部 -->
		<van-nav-bar title="行情" fixed />
		<div style="width: 100%; height: 46px;"></div>
		<div class="list">
			<ul class="hqList">

				<li class="hqItem" v-for="(item,index) in marketList" :key="index">
			
					<div>
						<img :src="item.img" class="biImg">
						<p>{{item.name}}</p>
						<p>{{item.symbol}}</p>
					</div>
					<div>
						<p class="meiyuan">
							<img src="../../../assets/images/market/my.png">
							<span>{{item.uk_price}}</span>
						</p>
						<p style="font-size: 0.26rem;">≈ ¥{{item.price}}</p>
					</div>
					<div>
						<p class="zhangfu" v-if="item.percent>0">{{item.percent}}%</p>
						<p class="zhangfu" style="background: #d72a32;" v-else>{{item.percent}}%</p>
					</div>
					
				</li>

			</ul>

		</div>

		<div class="clear"></div>

		<div class="tabbar"></div>
		<Tabbar :sonActive='tabbarActive'></Tabbar>
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
		List
	} from "vant";
	export default {
		components: {
			Tabbar,
			[Toast.name]: Toast,
			[NavBar.name]: NavBar,
			[List.name]: List,
		},
		data() {
			return {
				tabbarActive: 1,
				marketList: [],
				page: 1,
				count: 10,
				symbol: "",
				hotList: [],
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
				self.jwt = self.QYC.getItem("jwt")
			},
			on_vue_mounted() {
				var self = this;
				window.addEventListener('RefreshGlobal', function(event) {
					self.jwt = self.QYC.getItem('jwt');
					self.qbBox = true;
					self.usdtBox = false;
					self.symbol = '';
					self.page = 1;
					self.marketList = [];
					self.getMarketData();
				})
				self.getMarketData();

			},
			getMarketData() {
				var self = this;
				self.QYC.get({
					name: 'market',
					url: process.env.BASE_API + '/coinlist',
					params: {
						jwt: self.jwt
					}

				})
			},
			on_http_market(res) {
				var self = this;
				console.log("dshk")
				console.log(JSON.stringify(res.data.data))
				if (res.data.code == 1) {
					self.marketList = res.data.data;
				} else {
					Toast(res.data.errmsg);
				}
			},

			on_click_gozdf(item) {
				var self = this;
				self.QYC.openWebview({
					url: './king.market.zhangdiefu.html',
					id: 'king.market.zhangdiefu'
				}, {
					titleNView: null
				}, {
					item_id: item.id,
					symbol: item.symbol,
					params: item
				})
			},
			on_click_toTrade() {
				var self = this;
				self.QYC.openWebview({
					url: './king.market.bbjiaoyi.html',
					id: 'king.market.bbjiaoyi'
				}, {
					titleNView: null,
				})
			}
		}
	};
</script>

<style lang="less">
	@import '../../../assets/public/public.less';
	p {
		padding: 0;
		margin: 0;
	}

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
	.meiyuan{
 		img{
			width: 0.13rem;
			height: 0.21rem;
			vertical-align: middle;
			// margin-right: 0.05rem;
		}
		span{
			vertical-align: middle;
		}
	}
	.list {
		margin-top: 15px;
		.hqList {
			width: 100%;
			height: auto;

			.hqItem {
				width: 7.03rem;
				height: 1.14rem;
				overflow: hidden;
				@box();
				border-radius: 0.1rem;
				margin: 0 auto;
				margin-bottom: 0.14rem;

				div:nth-of-type(1) {
					width: 29%;
					.biImg{
						width: 0.55rem;
						height: 0.55rem;
						float: left;
						margin-right: 0.2rem;
					}
				}

				div:nth-of-type(2) {
					width: 40%;
				}

				div:nth-of-type(3) {
					width: 30%;
				}

				div {
					float: left;
					padding-top: 0.3rem;

					p {
						font-size: 0.24rem;
					}

					p:nth-of-type(1) {
						color: #bf90e6;
					}

					p:nth-of-type(2) {
						color: #fff;
						margin-top: 0.05rem;
					}

					.zhangfu {
						width: 1.3rem;
						height: 0.48rem;
						background: #2ba800;
						color: #fff;
						float: right;
						margin-right: 0.22rem;
						text-align: center;
						line-height: 0.48rem;
						border-radius: 0.1rem;
						color: #fff !important;
					}
				}

				div:nth-of-type(1) {
					padding-left: 0.22rem;
					box-sizing: border-box;
				}

				div:nth-of-type(2) {
					p {
						text-align: center;
					}

				}
			}
		}
	}

</style>
