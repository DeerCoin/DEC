<template>
	<div>
		<van-nav-bar class="top" title="BTC/USDT" fixed left-arrow @click-left="onClickLeft" />
		<!--<div class="clear"></div>-->
		<div class="gameBox">
			<div class="gameBox_top">
				<span>{{params.symbol}}</span>
				<span style="font-size: 0.26rem;">
					{{params.usd_price}}
					<span style="font-size:0.17rem ;">≈{{params.cny_price}}</span>
				</span>
			</div>
			<div class="gameBox_bottom">
				<div class="gameBox_bottom_left">
					<span style="font-size: 0.24rem;">涨跌幅</span>
					<span style="color:#ffffff ;"> &nbsp;{{params.usd_percent_change_1h}}%</span><br />
					<span style="font-size: 0.24rem;">成交量</span>
					<span style="color:#ffffff ;">&nbsp; {{Math.floor(Number(params.cny_volume_24h)*10000)/10000}}</span>
				</div>
				<!-- <div class="gameBox_bottom_right">
					<span style="font-size: 0.24rem;">涨跌幅</span>
					<span style="color:#a37f51 ;">&nbsp;5738.96</span><br />
					<span style="font-size: 0.24rem;">成交量</span>
					<span style="color:#a37f51 ;">&nbsp;5535.74</span>
				</div> -->
			</div>
		</div>
		<ul class="dateTab">
			<li v-for="(item,index) in dateTab" :key="index" :class="item.isActive?'active':''" @click="QYC.click('dateTab',index)">{{item.time}}</li>
		</ul>
		<div id="echart" style="width: 100%; height: 6rem;"></div>
		<div class="info">
			<p class="info_title">简介</p>
			<p class="info_text">啊啊啊啊啊啊</p>
		</div>
	</div>
</template>
<script>
	import Rem from "@/utils/rem";
	import {
		QYC
	} from "@/QYC/QYC";
	import echarts from 'echarts';
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
				activeNames: ['1'],
				dateTab: [{
					time: "30分钟",
					title: "0.5",
					tp: 'hour',
					isActive: true,
				}, {
					time: "1小时",
					title: "1",
					tp: 'hour',
					isActive: false,
				}, {
					time: "1天",
					title: "1",
					tp: 'day',
					isActive: false,
				}, {
					time: "1周",
					title: "1",
					tp: 'week',
					isActive: false,
				}, ],
				item_id: 0,
				interval: '0.5',
				tp: 'hour',
				symbol: 'BTC',
				data0: [],
				myChart: "",
				params: {}
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
				if (window.plus) {
					self.plusReady();
				} else {
					document.addEventListener("plusready", self.plusReady, false);
				}
			},
			on_click_dateTab(index) {
				var self = this;
				self.interval = self.dateTab[index].title;
				self.tp = self.dateTab[index].tp;
				self.binanceK();
				console.log("inter===" + self.interval);
				console.log("inter===" + self.tp);
				for (var i = 0; i < self.dateTab.length; i++) {
					self.dateTab[i].isActive = false;
					if (i == index) {
						self.dateTab[i].isActive = true;
					}
				}

			},
			plusReady() {
				var self = this
				let ws = plus.webview.currentWebview();
				self.item_id = ws.item_id;
				self.symbol = ws.symbol;
				self.params = ws.params;
				self.binanceK();
			},
			binanceK() {
				var self = this;
				self.myChart = echarts.init(document.getElementById('echart'))
				// self.myChart.showLoading();
				var upColor = '#ec0000';
				var upBorderColor = '#8A0000';
				var downColor = '#00da3c';
				var downBorderColor = '#008F28';

				self.data0 = [];
				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					grid: {
						left: '10%',
						right: '10%',
						bottom: '15%'
					},
					xAxis: {
						type: 'category',
						data: self.data0.categoryData,
						scale: true,
						boundaryGap: false,
						axisLine: {
							onZero: false
						},
						splitLine: {
							show: false
						},
						splitNumber: 20,
						min: 'dataMin',
						max: 'dataMax'
					},
					yAxis: {
						scale: true,
						splitArea: {
							show: true
						}
					},
					dataZoom: [{
							type: 'inside',
							start: 70,
							end: 100
						},
						{
							show: false,
							type: 'slider',
							y: '90%',
							start: 70,
							end: 100
						}
					],
					series: [{
						type: 'candlestick',
						data: self.data0.values,
						itemStyle: {
							normal: {
								color: upColor,
								color0: downColor,
								borderColor: upBorderColor,
								borderColor0: downBorderColor
							}
						},
					}, ]
				};
				if (option && typeof option === "object") {
					self.myChart.setOption(option, true);
				}

				self.QYC.get({
					name: 'line',
					url: 'http://103.215.80.216/index.php/api/api/zoushi',
					params: {
						symbol: self.symbol,
						tp: self.tp,
						interval: self.interval,
					}
				})
			},
			gettime(timeStamp) {
				var date = new Date()
				date.setTime(timeStamp * 1000)
				var y = date.getFullYear()
				var m = date.getMonth() + 1
				m = m < 10 ? ('0' + m) : m
				var d = date.getDate()
				d = d < 10 ? ('0' + d) : d
				var h = date.getHours()
				h = h < 10 ? ('0' + h) : h
				var minute = date.getMinutes()
				var second = date.getSeconds()
				minute = minute < 10 ? ('0' + minute) : minute
				second = second < 10 ? ('0' + second) : second
				return h + ':' + minute + ':' + second
			},
			splitData(rawData) {
				var categoryData = [];
				var values = []
				for (var i = 0; i < rawData.length; i++) {
					categoryData.push(gettime(rawData[i].splice(0, 1)[0]));
					values.push(rawData[i])
				}
				return {
					categoryData: categoryData,
					values: values
				};
			},
			on_http_line(res) {
				var self = this;
				if (res.data.code == 1) {

					self.data0 = self.splitData(res.data.data)

					self.myChart.hideLoading();
					self.myChart.setOption({
						xAxis: {
							data: self.data0.categoryData
						},
						series: [{
							data: self.data0.values
						}]
					});
				}
			}
		}
	};
</script>

<style lang="less">
	@import '../../../assets/public/public.css';
	@import '../../../assets/public/animate.min.css';
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

	.dateTab {
		width: 100%;
		height: 0.68rem;
		border-bottom: 1px solid #d2d2d2;
		padding-left: 0.4rem;
		box-sizing: border-box;

		li {
			width: 1.2rem;
			float: left;
			text-align: center;
			font-size: 0.3rem;
			line-height: 0.66rem;
			color: #838383;
		}

		li.active {
			border-bottom: 0.03rem solid #fff;
			color: #fff;
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
		flex-basis: 0.35rem;
	}

	.gameBox {
		width: 100%;
		height: 2.25rem;
		@box();
		margin-top: 1.10rem;
		position: relative;

		.gameBox_top {
			position: absolute;
			top: 0.27rem;
			left: 0.6rem;
			span{
				color: #fff;
			}
			span:nth-child(1) {
				width: 1.82rem;
				height: 0.25rem;
				font-size: 0.26rem
			}

			span:nth-child(2) {
				width: 3.17rem;
				height: 0.3rem;
				position: absolute;
				left: 3.77rem;
				top: 0.09rem;
			}
		}

		.gameBox_bottom {
			position: absolute;
			top: 0.88rem;
			left: 0.6rem;

			.gameBox_bottom_left {
				width: 2.8rem;
				height: 0.8rem;
				position: absolute;
				top: 0.01rem;
				left: 0.02rem;
				color: #d8b6f5;
			}

			.gameBox_bottom_right {
				width: 2.8rem;
				height: 0.8rem;
				position: absolute;
				top: 0.001rem;
				left: 4.5rem;
			}
		}
	}

	.info {
		width: 100%;
		height: auto;
		@box();

		.info_title {
			width: 100%;
			font-size: 0.3rem;
			border-bottom: 1px solid #8e35d9;
			line-height: 0.73rem;
			padding-left: 0.3rem;
			box-sizing: border-box;
			color: #ddc0f6;
		}

		.info_text {
			font-size: 0.28rem;
			padding: 0.2rem 0.3rem;
			box-sizing: border-box;
			color: #ddc0f6;
		}
	}
</style>
