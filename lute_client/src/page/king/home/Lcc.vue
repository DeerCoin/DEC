<template>
	<div>
		<header class="mui-bar mui-bar-nav" style="background:#fff;box-shadow: none;height: 0.88rem;">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">交易</h1>
		</header>

		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<div style="width: 100%; height: 0.88rem"></div>
				<div class="topDetail">
					<div style="text-align: left; padding-left: 0.7rem; box-sizing: border-box;">
						<p class="price">{{todaylcc}}</p>
						<p class="intro">DEC今日价格参考<br />可使用DEC交易</p>
						<!-- <p>可试用LCC交易</p> -->
					</div>
					<div>
						<p class="intro" style="margin-top: 0.5rem;">总求购量</p>
						<p class="zongNum" style="font-size: 0.4rem;">{{allNum}}</p>
					</div>
				</div>

				<div class="zoushi">
					<div class="price_t">
						价格走势
					</div>
					<div class="zoushibox" id="main">

					</div>
				</div>

				<van-tabs @click="tabMuen" v-model='active'>
					<van-tab v-for="(item,index) in tabMuenList" :title="item.ntitle" :key="index">
					</van-tab>
				</van-tabs>

				<!--买入-->
				<div v-if="active == 0" class="buy">
					<div class="serchBox">
						<span>搜索用户</span>
						<input type="text" v-model="search_tel" placeholder="请输入用户或者电话号码">
						<img src="../../../assets/images/search.png" alt="" class="search" @click="QYC.click('serchClick')">
					</div>

					<ul class="buyListBox">
						<li v-for="(item,index) in List" :key="index">
							<div class="vipDetail">
								<p>
									<span class="shu"></span>
									<img src="../../../assets/images/person.png" />
									<span>会员ID：<em>{{item.sellinfo.fromphone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</em></span>
								</p>
								<button class="sale" @click="QYC.click('ksSale',item)">可售卖出</button>
								<button class="sale" @click="QYC.click('decSale',item)">DEC卖出</button>
							</div>
							<div class="numDetail">
								<div>
									<span class="num">{{item.sellinfo.num}}</span>
									<span>求购数量</span>
								</div>
								<div>
									<span class="num">{{item.sellinfo.price}}</span>
									<span>单价</span>
								</div>
								<div>
									<span class="num">{{(item.sellinfo.price * item.sellinfo.num).toFixed(2)}}</span>
									<span>总价</span>
								</div>
							</div>
						</li>

					</ul>

				</div>

				<!--交易单-->
				<div  v-if="active == 1" class="buy">
					<ul class="buyListBox">
						<li v-for="(item,index) in hangsell" :key="index">
							<div class="vipDetail">
								<p>
									<span class="shu"></span>
									<img src="../../../assets/images/person.png" />
									<span v-if="myTel == item.sellinfo.fromphone">会员ID：<em>{{item.sellinfo.fromphone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</em></span>
									<span v-else>会员ID：<em>{{item.sellinfo.tophone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</em></span>
								</p>
								<button class="sale" v-if="item.sellinfo.state == 1">交易中</button>
								<button class="sale" v-if="item.sellinfo.state == 2">已付款</button>
							</div>
							<div class="numDetail">
								<div>
									<span class="num">{{item.sellinfo.num}}</span>
									<span>购买数量</span>
								</div>
								<div>
									<span class="num">{{item.sellinfo.pipeitime}}</span>
									<span>剩余时间</span>
								</div>
							</div>
							<!-- {{myTel}}-{{item.sellinfo.fromphone}}===={{item.sellinfo.tophone}}=={{item.sellinfo.state}} -->
							<div class="bottomBtn">

								<button @click="QYC.click('payClick',item)" v-if="myTel ==item.sellinfo.fromphone">付款信息</button>
								<!--买-->
								<button v-if="myTel ==item.sellinfo.fromphone&&item.sellinfo.state == 2">
									等待收款
								</button>
								<button v-if="myTel ==item.sellinfo.fromphone&&item.sellinfo.state == 1" @click="QYC.click('confirmPay',item)">
									确认付款
								</button>
								<button @click="QYC.click('refusePay',item)" v-if="myTel == item.sellinfo.fromphone && item.sellinfo.state == 1">拒绝付款</button>
								<!--买-->
								<button @click="QYC.click('lookOther',item)" v-if="myTel == item.sellinfo.tophone">付款信息</button>
								<button v-if="myTel == item.sellinfo.tophone && item.sellinfo.state == 1">等待付款</button>
								<button @click="QYC.click('confirmOrder',item)" v-if="myTel == item.sellinfo.tophone && item.sellinfo.state == 2">确认收款</button>
								<button @click="QYC.click('appeal',item)" v-if="myTel == item.sellinfo.tophone && item.sellinfo.state == 2">我要申诉</button>
								<!--卖tophone-->
							</div>
						</li>

					</ul>
				</div>

				<!--已完成-->
				<div  v-if="active == 2" class="buy">
					<ul class="buyListBox">
						<li v-for="(item,index) in completeList" :key="index">
							<div class="vipDetail">
								<p>
									<span class="shu"></span>
									<img src="../../../assets/images/person.png" />
									<span>会员ID：<em>{{item.sellinfo.fromphone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</em></span>
								</p>
								<!-- <button class="sale" @click='QYC.click("appeal",item)'>我要申诉</button> -->
							</div>
							<div class="numDetail">
								<div>
									<span class="num">{{item.sellinfo.num}}</span>
									<span>求购数量</span>
								</div>
								<div>
									<span class="num">{{item.sellinfo.price}}</span>
									<span>单价</span>
								</div>
								<div>
									<span class="num">{{(item.sellinfo.price * item.sellinfo.num).toFixed(2)}}</span>
									<span>总价</span>
								</div>
							</div>
						</li>

					</ul>
				</div>

				<!--我的求购-->
				<div  v-if="active == 3" class="buy">
					<ul class="buyListBox">
						<li v-for="(item,index) in myList" :key="index">
							<div class="vipDetail">
								<p>
									<span class="shu"></span>
									<img src="../../../assets/images/person.png" alt="" />
									<span>会员ID：<em>{{item.sellinfo.fromphone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</em></span>
								</p>
								<button class="sale" @click='QYC.click("chexiao",item.sellinfo.id)'>撤销</button>
							</div>
							<div class="numDetail">
								<div>
									<span class="num">{{item.sellinfo.num}}</span>
									<span>求购数量</span>
								</div>
								<div>
									<span class="num">{{item.sellinfo.num * item.sellinfo.price}}</span>
									<span>总价</span>
								</div>

							</div>
						</li>

					</ul>
				</div>
				<div style="width: 100%;height: 2.3rem;"></div>
			</div>
		</div>

		<div class="bottom" id="buyBtn" @click="QYC.click('wantBuyClick')">我要求购</div>

		<!--付款信息弹窗-->
		<van-popup v-model="payInfo">
			<div class="upGrade" style="overflow-y: scroll;">
				<div class="top">
					<span>付款信息</span>
					<img src="../../../assets/images/close.png" alt="" class="close" @click="payInfo=false">
				</div>
				<ul class="payInfoBox">
					<li>
						<span class="name">手机号:</span>
						<span>{{pay_tel}}</span>
					</li>
					<li>
						<span class="name">支付宝账号:</span>
						<span>{{pay_zfb}}</span>
						<span class="shoukuanma" @click="QYC.click('showImg','zfb')" v-if="ali_img">支付宝收款码</span>
						<span class="shoukuanma" style="background: #999;" v-else>未上传</span>
					</li>
					<li>
						<span class="name">支付宝姓名:</span>
						<span>{{pay_zfbname}}</span>
					</li>
					<li>
						<span class="name">微信号:</span>
						<span>{{pay_wx}}</span>
						<span class="shoukuanma" @click="QYC.click('showImg','wx')" v-if="wx_img">微信收款码</span>
						<span class="shoukuanma" style="background: #999;" v-else>未上传</span>
					</li>
					<li>
						<span class="name">银行卡号:</span>
						<span>{{pay_card}}</span>
					</li>
					<li>
						<span class="name">开户名:</span>
						<span>{{pay_zfbname}}</span>
					</li>
					<li>
						<span class="name">开户银行:</span>
						<span>{{pay_bank}}</span>
					</li>
					<li>
						<span class="name">开户网点:</span>
						<span>{{pay_net}}</span>
					</li>
					<!-- <li>
						<span class="name">微信收款码:</span>
						<img :src="wx_img" class="sktu" v-if="wx_img">
						<span v-else>未上传</span>
						
					</li>
					<li>
						<span class="name">支付宝收款码:</span>
						<img :src="ali_img" class="sktu" v-if="ali_img">
						<span v-else>未上传</span>
						
					</li> -->
				</ul>
			</div>
		</van-popup>
		
		<van-popup v-model="showSk">
			<div style="width: 5.6rem; height: auto; background: #fff;padding: 0.2rem;">
				<img :src="skImg" style="width: 100%; height: auto;">
			</div>
			
		</van-popup>
		<!-- 求购玩家信息 -->
		<van-popup v-model="showOther">
			<div class="upGrade">
				<div class="top">
					<span>付款信息</span>
					<img src="../../../assets/images/close.png" alt="" class="close" @click="showOther=false">
				</div>
				<ul class="payInfoBox">
					<li>
						<span class="name">手机号:</span>
						<span>{{pay_tel1}}</span>
					</li>
					<li>
						<span class="name">支付宝账号:</span>
						<span>{{pay_zfb1}}</span>
					</li>
					<li>
						<span class="name">支付宝姓名:</span>
						<span>{{pay_zfbname1}}</span>
					</li>
					<li>
						<span class="name">微信号:</span>
						<span>{{pay_wx1}}</span>
					</li>
					<li>
						<span class="name">银行卡号:</span>
						<span>{{pay_card1}}</span>
					</li>
					<li>
						<span class="name">开户名:</span>
						<span>{{pay_zfbname1}}</span>
					</li>
					<li>
						<span class="name">开户银行:</span>
						<span>{{pay_bank1}}</span>
					</li>
					<li>
						<span class="name">开户网点:</span>
						<span>{{pay_net1}}</span>
					</li>
					<li v-if="dkImg">
						<span class="name">付款凭证:</span>
						<img :src="dkImg" @click="QYC.click('showImg','pz')">
					</li>
				</ul>
			</div>
		</van-popup>
		<!-- 确认付款 -->
		<van-popup v-model="showConfirm">
			<div class="confirmPayBox">
				<div class="closeConfirm">
					<img src="../../../assets/images/close.png" class="close" @click="showConfirm = false">
				</div>
				<p class="confirmTitle">确认付款</p>
				<div class="upImg">
					<img :src="uploadImg">
					<van-uploader :after-read="onRead">

					</van-uploader>
				</div>
				<p class="pzText">请上传付款凭证</p>
				<input type="password" v-model="conPwd" placeholder="请输入交易密码" class="pwIpt">
				<van-button size="large" class="logBtn" @click="QYC.click('querendakuan')">确认付款</van-button>
			</div>
		</van-popup>

		<!-- 卖出 -->
		<van-popup v-model="saleConfirm">
			<div class="confirmPayBox confirmsaleBox">
				<div class="closeConfirm">
					<img src="../../../assets/images/close.png" class="close" @click="saleConfirm = false">
				</div>
				<p class="confirmTitle">交易密码</p>
				<input type="password" v-model="salePw" placeholder="请输入交易密码" class="pwIpt">
				<van-button size="large" class="logBtn" @click="QYC.click('toSale')">确认卖出</van-button>
			</div>
		</van-popup>

		<!-- 撤销 -->
		<van-popup v-model="showChexiao">
			<div class="confirmPayBox confirmsaleBox">
				<div class="closeConfirm">
					<img src="../../../assets/images/close.png" class="close" @click="showChexiao = false">
				</div>
				<p class="confirmTitle">交易密码</p>
				<input type="password" v-model="chexiaoPwd" placeholder="请输入交易密码" class="pwIpt">
				<van-button size="large" class="logBtn" @click="QYC.click('toChexiao')">确认撤销</van-button>
			</div>
		</van-popup>

		<!-- 拒绝付款 -->
		<van-popup v-model="showRefuse">
			<div class="confirmPayBox confirmsaleBox">
				<div class="closeConfirm">
					<img src="../../../assets/images/close.png" class="close" @click="showRefuse = false">
				</div>
				<p class="confirmTitle">交易密码</p>
				<input type="password" v-model="refusePw" placeholder="请输入交易密码" class="pwIpt">
				<van-button size="large" class="logBtn" @click="QYC.click('refuseTab')">确认</van-button>
			</div>
		</van-popup>

		<!-- 求购 -->
		<van-popup v-model="wantBuyConfirm">
			<div class="confirmPayBox">
				<div class="closeConfirm">
					<img src="../../../assets/images/close.png" class="close" @click="QYC.click('close')">
				</div>
				<p class="confirmTitle">求购</p>
				<p class="tishi">当前账户DEC余额：{{userinfo.lcc}}</p>
				<input type="tel" placeholder="请输入求购数量" class="pwIpt" v-model="fb_num">
				<input type="password" placeholder="请输入交易密码" class="pwIpt" v-model="fb_zfpwd">
				<van-button size="large" class="logBtn" @click='QYC.click("buyIn")'>确认买入</van-button>
			</div>
		</van-popup>

		<!-- 申诉 -->
		<van-popup v-model="showAppeal">
			<div class="confirmPayBox confirmsaleBox" style="height: 5rem;">
				<div class="closeConfirm">
					<img src="../../../assets/images/close.png" class="close" @click="showAppeal = false">
				</div>
				<p class="confirmTitle">我要申诉</p>
				<input type="text" v-model="toContent" placeholder="投诉内容" class="pwIpt">
				<input type="password" placeholder="请输入交易密码" class="pwIpt" v-model="ssPwd">
				<van-button size="large" class="logBtn" @click="QYC.click('toAppeal')">确认</van-button>
			</div>
		</van-popup>
		
		<!-- 确认订单 -->
		<van-popup v-model="con_order">
			<div class="confirmPayBox confirmsaleBox">
				<div class="closeConfirm">
					<img src="../../../assets/images/close.png" class="close" @click="saleConfirm = false">
				</div>
				<p class="confirmTitle">确认收款</p>
				<input type="password" v-model="cPwd" placeholder="请输入交易密码" class="pwIpt">
				<van-button size="large" class="logBtn" @click="QYC.click('con_shoukuan')">确认收款</van-button>
			</div>
		</van-popup>
		

		<div class="tabbar"></div>
		<Tabbar :sonActive='tabbarActive' style="z-index: 99;"></Tabbar>
	</div>
</template>
<script>
	import Rem from '@/utils/rem'
	import {
		QYC
	} from '@/QYC/QYC'
	import Tabbar from '../../components/tabbar.vue'
	import echarts from 'echarts'
	import {
		Toast,
		Swipe,
		SwipeItem,
		NoticeBar,
		Icon,
		Dialog,
		NavBar,
		Tab,
		Tabs,
		Popup,
		Button,
		Uploader
	} from 'vant'

	export default {
		components: {
			Tabbar,
			[Toast.name]: Toast,
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
			[NoticeBar.name]: NoticeBar,
			[Icon.name]: NoticeBar,
			[Dialog.name]: Dialog,
			[NavBar.name]: NavBar,
			[Popup.name]: Popup,
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			[Button.name]: Button,
			[Uploader.name]: Uploader,
		},
		data() {
			return {
				active: 0,
				tabbarActive: 2,
				waiting: false,
				jwtobj: null,
				jwt: "",
				fb_num: "",
				fb_zfpwd: "",
				List: [],
				cx_genid: "",
				myList: [],
				tabMuenList: [{
						'nid': 0,
						'ntitle': '买入'
					},
					{
						'nid': 1,
						'ntitle': '交易单'
					},
					{
						'nid': 2,
						'ntitle': '已完成'
					},
					{
						'nid': 3,
						'ntitle': '我的求购'
					},
				],
				buy: true,
				trade: false,
				over: false,
				myWantBuy: false,
				payInfo: false,
				showConfirm: false,
				saleConfirm: false,
				wantBuyConfirm: false,
				salePw: "",
				genid: "",
				hangsell: [],
				payid: "",
				pay_tel: "",
				pay_zfb: "",
				pay_zfbname: "",
				pay_wx: "",
				pay_card: "",
				pay_name: "",
				pay_bank: "",
				pay_net: "",
				pay_tel1: "",
				pay_zfb1: "",
				pay_zfbname1: "",
				pay_wx1: "",
				pay_card1: "",
				pay_name1: "",
				pay_bank1: "",
				pay_net1: "",
				conPwd: "",
				qd_pwd: "",
				uploadImg: require('../../../assets/images/home/tu.png'),
				zfImg: "",
				completeList: [],
				myTel: [],
				myChart: "",
				trend_time: [],
				trend_price: [],
				zong: [],
				option: {},
				allNum: 0,
				todaylcc: 0,
				userinfo: {},
				showLookImg: false,
				dkImg: "",
				zfcImg: "",
				search_tel: "",
				showOther: false,
				showAppeal: false,
				genid_ss: "",
				toContent: "",
				showChexiao: false,
				chexiaoPwd: "",
				cx_id: 0,
				showRefuse: false,
				refusePw: "",
				refuseId: "",
				con_order: false,
				cid: 0,
				cPwd: "",
				ssPwd: "",
				wx_img: "",
				ali_img: "",
				showSk: false,
				skImg: ""
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
		filters: {
			newtel(value1) {
				if (!value1) return ''
				let value2 = value1.toString().substr(0, 3)
				value1 = value1.toString().substr(-4, 4)
				value1 = value2 + '*'.repeat(4) + value1
				return value1
			}
		},
		methods: {
			on_vue_created() {
				var self = this;
				document.body.addEventListener('touchmove', function(e) {
					if (e._isScroller) return;
					e.preventDefault();
				}, {
					passive: false
				});
				self.jwt = self.QYC.getItem('jwt');
				self.myTel = self.QYC.getItem('myTel');
			},
			on_vue_mounted() {
				var self = this;
				mui('.mui-scroll-wrapper').scroll({
					deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
				});

				self.myChart = echarts.init(document.getElementById('main'))
				self.option = {
					title: {
						textStyle: {
							color: 'red',
							fontStyle: 'normal',
							fontWeight: 'normal',
							fontSize: '20px',
						}
					},
					grid: {
						left: '5%',
						right: '8%',
						bottom: '3%',
						top: '8%',
						containLabel: true
					},
					tooltip: {},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						axisLine: {
							lineStyle: {
								color: '#928da8',
								width: 1, //这里是为了突出显示加上的
							}
						},
						// data: [0, 1, 2, 3]
						data: self.trend_time
					},
					yAxis: {
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#928da8',
								width: 1, //这里是为了突出显示加上的
							}
						},
						splitLine: {
							lineStyle: {
								// 使用深浅的间隔色
								color: ['#3d2e68']
							}
						},
						nameTextStyle: {
							color: ['#554385']
						},

						data: [1, 2, 3, 4]

					},
					series: [{
						type: 'line',
						itemStyle: {
							normal: {
								color: '#aba4be',
								lineStyle: {
									color: '#aba4be'
								}
							}
						},
						// areaStyle: {},
						data: []
					}]
				}
				console.log("mounted===" + self.option.series[0].data)
				window.addEventListener('RefreshGlobal', function(event) {
					self.jwt = self.QYC.getItem('jwt');
					self.getUserInfo();
					self.uploadImg = require('../../../assets/images/home/tu.png')
					self.active = 0;
				})
				self.getUserInfo();
			},
			getUserInfo() {
				var self = this;
				self.QYC.get({
					name: 'userinfo',
					url: process.env.BASE_API + '/hall/getuserinfo',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_userinfo(res) {
				var self = this;
				self.userinfo = res.data.userinfo;

				self.getTrend();
			},
			getTrend() {
				var self = this;
				self.option.xAxis.data = [];
				self.option.series[0].data = []
				self.QYC.get({
					name: 'trend',
					url: process.env.BASE_API + '/market/getlcctrend',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_trend(res) {
				var self = this;
				self.getBuyInList();
				if (res.data.errcode == 1) {
					self.todaylcc = res.data.todaylcc;
					self.allNum = res.data.toalllcc;
					for (var i = 0; i < res.data.lccs.length; i++) {

						self.option.xAxis.data.unshift(res.data.lccs[i].time)
						self.option.series[0].data.unshift(parseFloat(res.data.lccs[i].value))
					}

					for (var j = res.data.max; j >= 0; j--) {
						self.zong.unshift(j)
					}
				}

				self.myChart.setOption(self.option)
			},
			tabMuen(index, title) {
				var self = this
				if (index == 0) { //买入列表
					self.getBuyInList();
				} else if (index == 1) { //交易单列表
					self.getTrading();
				} else if (index == 2) { //已完成列表
					self.getComplete();
				} else { //我的求购列表
					self.getMyList();
				}
			},
			// 搜索
			on_click_serchClick() {
				var self = this;
				if (self.search_tel == "") {
					Toast({
						message: "请输入搜索内容",
						duration: 1000
					})
					return;
				}
				self.QYC.get({
					name: 'search',
					url: process.env.BASE_API + '/market/getlookingforbyphone',
					params: {
						jwt: self.jwt,
						ssphone: self.search_tel
					}
				})
			},
			on_http_search(res) {
				var self = this;
				if (res.data.errcode == 1) {
					self.search_tel = "";
					console.log("leng===" + res.data.lookingfor.length)
					if (res.data.lookingfor.length == undefined) {
						Toast({
							message: "暂无搜索内容",
							duration: 1000
						})
					}
					self.List = res.data.lookingfor;
				} else {
					Toast({
						message: res.data.errmsg,
						duration: 1000
					})
				}

			},
			// 可售卖出
			on_click_ksSale(item) {
				var self = this;
				self.saleConfirm = true;
				self.genid = item.sellinfo.id;
				self.costtp = "keshou"
			},
			// dec卖出
			on_click_decSale(item) {
				var self = this;
				self.saleConfirm = true;
				self.genid = item.sellinfo.id;
				self.costtp = "dec"
			},
			on_click_toSale() {
				var self = this;
				self.QYC.get({
					name: 'sale',
					url: process.env.BASE_API + '/market/matchinglookingfor',
					params: {
						jwt: self.jwt,
						genid: self.genid,
						zfpwd: self.salePw,
						costtp: self.costtp
					}
				})

			},
			on_http_sale(res) {
				var self = this;
				self.saleConfirm = false;
				self.salePw = "";
				self.getBuyInList();
				Toast({
					message: res.data.errmsg,
					duration: 1000
				})
			},
			// 求购
			on_click_wantBuyClick() {
				var self = this;
				self.wantBuyConfirm = true;
			},
			on_click_payClick(item) {
				var self = this;
				self.payInfo = true;
				self.payid = item.sellinfo.id;
				self.getPayment();
			},
			// 付款信息
			getPayment() {
				var self = this;
				self.QYC.get({
					name: 'payment',
					url: process.env.BASE_API + '/market/fukuaninfo',
					params: {
						jwt: self.jwt,
						genid: self.payid
					}
				})
			},
			on_http_payment(res) {
				var self = this;
				self.pay_tel = res.data.data.phone;
				self.pay_zfb = res.data.data.zhifubao;
				self.pay_zfbname = res.data.data.realname;
				self.pay_wx = res.data.data.weixin;
				self.pay_card = res.data.data.bankaccount;

				self.pay_bank = res.data.data.bankname;
				self.pay_net = res.data.data.kaihudian;
				self.wx_img = res.data.data.wx_photo;
				self.ali_img = res.data.data.zfb_photo;
			},
			on_click_showImg(type){
				console.log("45dhfsjh")
				this.showSk = true;
				if(type == 'zfb'){
					this.skImg = this.ali_img
				}else if(type == 'wx'){
					this.skImg = this.wx_img
				}else if(type == 'pz'){
					this.skImg = this.dkImg
				}
			},
			on_click_close() { //关闭弹窗
				var self = this
				self.payInfo = false;
				self.showConfirm = false;
				self.saleConfirm = false;
				self.wantBuyConfirm = false;
			},
			onRead(file) {
				var self = this;
				var content = file.content;
				var baseImg = content.split(",");
				self.zfImg = baseImg[1];

				self.QYC.post({
					name: 'upload',
					url: process.env.BASE_API + '/uploaddakuan?jwt=' + self.jwt,
					params: "info=" + self.zfImg

				})
			},
			on_http_upload(res) {
				var self = this;

				if (res.data.code == 1) {
					Toast("上传成功")

					self.zfcImg = res.data.img;
					self.uploadImg = res.data.img;
				} else {
					Toast(res.data.msg);
				}
			},
			// 确认付款
			on_click_confirmPay(item) {
				var self = this;
				self.showConfirm = true;
				self.qd_pwd = item.sellinfo.id
			},
			on_click_querendakuan() {
				var self = this;
				if (self.conPwd == "") {
					Toast({
						message: "请输入交易密码",
						duration: 1000
					})
					return
				}
				self.qdPay();
			},
			qdPay() {
				var self = this;

				self.QYC.get({
					name: 'qdpay',
					url: process.env.BASE_API + '/market/dakuanyes',
					params: {
						jwt: self.jwt,
						genid: self.qd_pwd,
						zfpwd: self.conPwd,
						zfimg: self.zfcImg
					}

				})
			},
			on_http_qdpay(res) {
				var self = this;
				self.conPwd = "";
				self.uploadImg = require('../../../assets/images/home/tu.png');
				self.showConfirm = false;
				self.getTrading();
				Toast({
					message: res.data.errmsg,
					duration: 1000
				})
			},
			// 拒绝付款
			on_click_refusePay(item) {
				var self = this;
				self.showRefuse = true;
				self.refuseId = item.sellinfo.id
			},
			on_click_refuseTab() {
				var self = this;
				if (self.refusePw == "") {
					Toast({
						message: "请输入交易密码",
						duration: 1000
					})
					return;
				}
				self.QYC.get({
					name: 'refuse',
					url: process.env.BASE_API + '/market/dakuanno',
					params: {
						jwt: self.jwt,
						genid: self.refuseId,
						zfpwd: self.refusePw
					}
				})
			},
			on_http_refuse(res) {
				var self = this;
				self.showRefuse = false;
				self.refusePw = ""
				self.getTrading();
				Toast({
					message: res.data.errmsg,
					duration: 1000
				})
			},
			// 查看求购玩家信息
			on_click_lookOther(item) {
				var self = this;
				self.showOther = true;
				self.dkImg = item.sellinfo.zfimg;
				self.QYC.get({
					name: 'otherinfo',
					url: process.env.BASE_API + '/market/duifanginfo',
					params: {
						jwt: self.jwt,
						genid: item.sellinfo.id
					}
				})
			},
			on_http_otherinfo(res) {
				var self = this;

				self.pay_tel1 = res.data.data.phone;
				self.pay_zfb1 = res.data.data.zhifubao;
				self.pay_zfbname1 = res.data.data.realname;
				self.pay_wx1 = res.data.data.weixin;
				self.pay_card1 = res.data.data.bankaccount;
				self.pay_bank1 = res.data.data.kaihuhang;
				self.pay_net1 = res.data.data.kaihudian;

			},
			// 确认订单
			on_click_confirmOrder(item) {
				var self = this;
				self.con_order = true;
				self.cid = item.sellinfo.id
			},
			on_click_con_shoukuan(){
				this.QYC.get({
					name: 'cOrder',
					url: process.env.BASE_API + '/market/lookingforyes',
					params: {
						jwt: this.jwt,
						genid: this.cid,
						zfpwd: this.cPwd
					}
				
				})
			},
			on_http_cOrder(res) {
				var self = this;
				Toast({
					message: res.data.errmsg,
					duration: 1000
				})
				self.con_order = false;
				self.cPwd = "";
				self.getTrading();
			},
			//求购
			on_click_buyIn() {
				var self = this;

				if (self.fb_num == "") {
					Toast("求购数量不能为空")
				} else if (self.fb_num > 1000) {
					Toast("求购数量需小于1000")
				} else if (self.fb_zfpwd == "") {
					Toast("交易密码不能为空")
				} else {
					self.QYC.get({
						name: 'qiugou',
						url: process.env.BASE_API + '/market/lookingfor',
						params: {
							jwt: self.jwt,
							num: self.fb_num,
							zfpwd: self.fb_zfpwd,
						}
					})
				}
			},

			on_http_qiugou(res) {
				var self = this;
				console.log("买入===" + JSON.stringify(res.data))
				if (res.data.errcode == 1) {
					Toast(res.data.errmsg);
					self.wantBuyConfirm = false;
					self.fb_num = "";
					self.fb_zfpwd = "";
					self.getBuyInList();

				} else {
					Toast(res.data.errmsg);

					self.wantBuyConfirm = false;
					self.fb_num = "";
					self.fb_zfpwd = "";

				}
			},
			on_http_trend2(res) {
				var self = this;

				if (res.data.errcode == 1) {
					self.allNum = res.data.toalllcc;
				}

			},
			//买入（市场求购列表）
			getBuyInList() {
				var self = this;
				self.QYC.get({
					name: 'BuyInList',
					url: process.env.BASE_API + '/market/getlookingfor',
					params: {
						jwt: self.jwt
					}

				})
			},
			on_http_BuyInList(res) {
				var self = this;
				if (res.data.errcode != 1) {
					Toast(res.data.errmsg);

				} else {
					self.List = res.data.lookingfor;
					self.QYC.get({
						name: 'trend2',
						url: process.env.BASE_API + '/market/getlcctrend',
						params: {
							jwt: self.jwt
						}
					})
				}

			},
			// 交易中列表
			getTrading() {
				var self = this;
				self.QYC.get({
					name: 'trading',
					url: process.env.BASE_API + '/market/getmymatchinglist',
					params: {
						jwt: self.jwt
					}

				})
			},
			on_http_trading(res) {
				var self = this;
				if (res.data.ok == "ok") {
					self.hangsell = res.data.hangsell;
				} else {

				}
			},
			// 已完成列表
			getComplete() {
				var self = this;
				self.QYC.get({
					name: 'complete',
					url: process.env.BASE_API + '/market/getmyendlist',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_complete(res) {
				var self = this;
				if (res.data.errcode == 1) {
					self.completeList = res.data.hangsell;
				} else {
					Toast(res.data.errmsg)
				}
			},
			//我的求购
			getMyList() {
				var self = this;
				self.QYC.get({
					name: 'MyList',
					url: process.env.BASE_API + '/market/getmylookingfor',
					params: {
						jwt: self.jwt
					}
				})
			},
			on_http_MyList(res) {
				var self = this;
				console.log(res.data)
				if (res.data.errcode != 1) {
					Toast(res.data.errmsg);
				} else {
					self.myList = res.data.lookingfor;
				}
			},
			// 投诉
			on_click_appeal(item) {
				var self = this;
				self.showAppeal = true;
				self.genid_ss = item.sellinfo.id;
			},
			on_click_toAppeal() {
				var self = this;
				if(self.toContent == ""){
					Toast({
						message: "请输入申诉内容",
						duration: 1000
					})
					return;
				}
				if(self.ssPwd == ""){
					Toast({
						message: "请输入交易密码",
						duration: 1000
					})
					return;
				}
				self.QYC.get({
					name: 'appeals',
					url: process.env.BASE_API + '/market/huiyuanshensu',
					params: {
						jwt: self.jwt,
						genid: self.genid_ss,
						content: self.toContent,
						zfpwd : self.ssPwd
					}

				})
			},
			on_http_appeals(res) {
				var self = this;
				Toast(res.data.errmsg);
				self.toContent = '';
				self.ssPwd = '';
				self.showAppeal = false;
			},
			//撤销
			on_click_chexiao(id) {
				var self = this;
				self.showChexiao = true;
				self.cx_id = id;
			},
			on_click_toChexiao() {
				var self = this;
				if (self.chexiaoPwd == "") {
					Toast({
						message: "请输入交易密码",
						duration: 1000
					})
					return
				}
				self.QYC.get({
					name: 'userList',
					url: process.env.BASE_API + '/market/lookingforno',
					params: {
						jwt: self.jwt,
						genid: self.cx_id,
						zfpwd: self.chexiaoPwd
					}
				})
			},
			on_http_userList(res) {
				var self = this;
				self.chexiaoPwd = "";
				if (res.data.errcode != 1) {
					Toast(res.data.errmsg);
				} else {
					Toast(res.data.errmsg);
					self.showChexiao = false;
					self.getMyList();
				}
			},

		}
	}
</script>

<style lang="less">
	@import '../../../assets/public/public.css';
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

	.van-tabbar--fixed {
		z-index: 99 !important;
	}

	.dkImgBox {
		width: 6rem;
		height: 6rem;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.van-tabs {
		background: #7904db;
	}

	.van-tab {
		@box();
		color: #bf90e6;
	}

	.van-tabs__nav {
		@box();
	}

	.van-tabs--line .van-tabs__wrap {
		height: 0.88rem;
	}

	.van-tabs__nav--line {
		padding: 0;
		border-bottom: 1px solid #362b61;
	}

	.van-tabs__line {
		bottom: 0;
		background-color: #fff;
	}

	.van-tab--active {
		color: #fff;
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
			}
		}

		.confirmTitle {
			width: 100%;
			line-height: 0.9rem;
			text-align: center;
			font-size: 0.32rem;
			color: #7904db;
		}

		.upImg {
			width: 1.28rem;
			height: 1.28rem;
			position: relative;
			background: #f5f5f5;
			margin: 0.18rem auto;
			border-radius: 0.12rem;

			img {
				width: 1.2rem;
				height: 1.2rem;
				position: absolute;
				@incenter();
			}

			.van-uploader {
				width: 100%;
				height: 100%;
			}
		}

		.tishi {
			font-size: 0.28rem;
			color: #cc98f8;
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
			width: 5.22rem;
			@box();
		}
	}

	.confirmsaleBox {
		height: 4.11rem;
	}

	.bottom {
		width: 100%;
		height: 0.92rem;
		background: #9315da;
		background-size: 100%;
		text-align: center;
		line-height: 0.92rem;
		color: #fff;
		font-size: 0.28rem;
		position: fixed;
		bottom: 1.1rem;
		left: 0;
		z-index: 99;
	}

	.topDetail {
		width: 100%;
		height: 2.42rem;
		@box();
		background-size: 100%;
		display: flex;
		align-items: center;

		div {
			flex: 1;
			text-align: center;

			p {
				color: #bf90e6;
				font-size: 0.26rem;
				line-height: 0.36rem;
			}

			.price {
				font-size: 0.45rem;
				color: #fff;
			}

			.intro {
				margin-top: 0.2rem;
			}
		}
	}

	.zoushi {
		margin-top: 0.2rem;

		.price_t {
			color: #fff;
			font-size: 0.22rem;
			padding-left: 0.3rem;
		}

		#main {
			width: 100%;
			height: 4rem;
		}
	}

	.buy {
		margin-top: 0.1rem;

		.serchBox {
			height: 0.75rem;
			width: 100%;
			padding: 0 0.6rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			@box();
			border-bottom: 1px solid #d2d2d2;

			span {
				color: #fff;
				font-size: 0.28rem;
			}

			input {
				width: 3.9rem;
				height: 0.75rem;
				background: none;
				border: 0;
				color: #fff;
				margin: 0;
				padding: 0;
				font-size: 0.28rem;
			}

			img {
				width: 0.35rem;
				height: 0.34rem;
			}
		}

		.buyListBox {
			li {
				margin-top: 0.1rem;
				@box();

				.vipDetail {
					display: flex;
					align-items: center;
					width: 100%;
					height: 0.8rem;

					justify-content: space-between;

					p {
						display: flex;
						height: 0.5rem;
						align-items: center;
						flex: 3;

						.shu {
							display: block;
							width: 0rem;
							height: 100%;
							// background: #a37f51;
						}

						img {
							width: 0.27rem;
							height: 0.25rem;
							margin-left: 0.25rem;
							margin-right: 0.1rem;
						}

						span {
							color: #fff;
							font-size: 0.24rem;

							em {
								font-size: 0.24rem;
								margin-left: 0.1rem;
								font-weight: normal;
								font-style: normal;
							}
						}
					}

					button {
						flex: 1;
						width: 1.3rem;
						height: 0.5rem;
						padding: 0;
						margin-right: 0.1rem;
						color: #fff;
						font-size: 0.24rem;
						border: 1px solid #fff;
					}
				}

				.numDetail {
					padding: 0.2rem 0.25rem;
					display: flex;
					align-items: center;

					div {
						flex: 1;
						height: 0.67rem;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						box-sizing: border-box;
						border-right: 1px solid #9d56d7;
						color: #fff;

						span {
							color: #fff;
							font-size: 0.28rem;
						}

						.num {
							color: #fff;
							font-size: 0.28rem;
						}
					}

					div:last-of-type {
						border: 0;
					}
				}

				.bottomBtn {
					padding: 0.15rem 0.25rem;
					border-top: 1px solid #353535;
					display: flex;
					display: -webkit-flex;
					justify-content: space-around;
					-webkit-justify-content: -webkit-space-around;

					button {
						display: block;
						padding: 0;
						width: 2rem;
						height: 0.63rem;
						border-radius: 0.1rem;
						color: #fff;
						font-size: 0.26rem;
						border: 1px solid #fff;
					}
				}
			}
		}
	}

	.van-popup {
		border-radius: 0.2rem;
	}

	.upGrade {
		width: 6.65rem;
		height: auto;
		background: #fff;
		border-radius: 0.2rem;
		padding-bottom: 0.3rem;
		max-height: 11rem;

		.top {
			width: 100%;
			height: 0.9rem;
			line-height: 0.9rem;
			position: relative;
			text-align: center;

			span {
				font-size: 0.3rem;
				color: #7904db;
			}

			.close {
				width: 0.26rem;
				height: 0.26rem;
				position: absolute;
				right: 0.13rem;
				top: 0.13rem;
			}
		}

		.payInfoBox {
			li {
				margin-top: 0.15rem;

				span {
					font-size: 0.28rem;
					color: #929292;
				}

				.name {
					display: inline-block;
					width: 2rem;
					color: #333;
					text-align: right;
					margin-right: 0.12rem;
				}

				img {
					display: inline-block;
					vertical-align: middle;
					width: 2rem;
					height: auto;
					max-height: 3rem;
				}
				.shoukuanma{
					display: block;
					width: 1.6rem;
					background: #9315da;
					border-radius: 0.1rem;
					color: #fff;
					font-size: 0.2rem;
					float: right;
					margin-right: 0.1rem;
					text-align: center;
					border: 1px solid #999;
				}
			}
		}
	}
</style>
