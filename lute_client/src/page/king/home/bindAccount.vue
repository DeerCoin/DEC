<template>
	<div>
		<van-nav-bar title="账号安全-会员中心" left-arrow fixed @click-left="onClickLeft" />
		<div style="width: 100%;height: 46px;"></div>
		<div style="margin-top: -0.12rem;">
			<van-cell-group>
				<van-field label="会员账号" :value='memberId' :readonly="read"></van-field>
				<van-field label="会员等级" :value="level + cardActive" :readonly="read"></van-field>
				<van-field v-model="memberId" label="手机号" placeholder="请输入手机号" :readonly="read"/>
				<van-field v-model="zfb" label="支付宝" placeholder="请输入支付宝" />
				<van-field v-model="weixin" label="微信号" placeholder="请输入微信号" />
				<van-field v-model="idcard" label="身份证号" placeholder="请输入身份证号" :readonly="read_idcard" />
				<van-field v-model="name" label="姓名" placeholder="请输入姓名" :readonly="read_name" />
				<van-field v-model="bank_account" label="银行账号" placeholder="请输入银行卡号" />
				<van-field v-model="bank_name" label="银行名称" placeholder="请输入银行名称" />
				<van-field v-model="kaihudian" label="开户网点" placeholder="请输入开户网点" />
				<div class="up_text">请上传微信收款码</div>
				<div class="skImg">
					<van-uploader name="uploader" :after-read="onRead_wx">
						<img :src="wxImg" v-if="wxImg">
						<van-icon name="photograph" v-else />
					</van-uploader>
				</div>
				<div class="up_text">请上传支付宝收款码</div>
				<div class="skImg">
					<van-uploader :after-read="onRead_zfb" name="zfb">
						<img :src="zfbImg" v-if="zfbImg">
						<van-icon name="photograph" v-else />
					</van-uploader>
				</div>
			</van-cell-group>
			<div size="large" class="loginBtn" @click='QYC.click("bangding")'>完成</div>
			<p class="noticetext">提示：请先于首页【设置】完成实名认证，账号绑定即可激活！</p>
		</div>
	</div>
</template>
<script>
	import Rem from "@/utils/rem";
	import {
		QYC
	} from "@/QYC/QYC";
	import {
		fire
	} from "@/utils/envent.js";
	import {
		Toast,
		Cell,
		CellGroup,
		NavBar,
		Field,
		Button,
		Uploader,
		Icon
	} from "vant";
	export default {
		components: {
			[Toast.name]: Toast,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[NavBar.name]: NavBar,
			[Field.name]: Field,
			[Button.name]: Button,
			[Uploader.name]: Uploader,
			[Icon.name]: Icon,
		},
		data() {
			return {
				zfb: "",
				weixin: "",
				idcard: "",
				name: "",
				bank_account: "",
				bank_name: "",
				kaihudian: "",
				memberId: "",
				level: "",
				cardActive: "",
				jwt: "",
				userinfo: {},
				read: false,
				read_idcard: false,
				read_name: false,
				wxImg: "",
				zfbImg: "",
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
				self.getUserInfo();
			},
			onClickLeft() {
				var self = this;
				self.QYC.closeCurrentWebview();
			},
			on_click_bangding() {
				var self = this;
				var idcardtest =
					/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/

				if (self.tel == "") {
					Toast({
						message: "请输入手机号",
						duration: 1000
					})
					return;
				}
				if (self.zfb == "") {
					Toast({
						message: "请输入支付宝账号",
						duration: 1000
					})
					return;
				}
				if (self.weixin == "") {
					Toast({
						message: "请输入微信号",
						duration: 1000
					})
					return;
				}

				if (!(idcardtest).test(self.idcard)) {
					Toast({
						message: "请正确核对身份证号码",
						duration: 1000
					})
					return;
				}
				if (self.name == "") {
					Toast({
						message: "请输入姓名",
						duration: 1000
					})
					return;
				}
				if (self.bank_account == "") {
					Toast({
						message: "请输入银行账号",
						duration: 1000
					})
					return;
				}

				if (self.bank_name == "") {
					Toast({
						message: "请输入银行名称",
						duration: 1000
					})
					return;
				}

				if (self.kaihudian == "") {
					Toast({
						message: "请输入开户网点",
						duration: 1000
					})
					return;
				}
				if (self.wxImg == "") {
					Toast({
						message: "请上传微信收款码",
						duration: 1000
					})
					return;
				}
				if (self.zfbImg == "") {
					Toast({
						message: "请上传支付宝收款码",
						duration: 1000
					})
					return;
				}
				self.QYC.get({
					name: 'userList',
					url: process.env.BASE_API + '/hall/accountbind',
					params: {
						zfb: self.zfb,
						jwt: self.jwt,
						weixin: self.weixin,
						idcard: self.idcard,
						name: self.name,
						bank_account: self.bank_account,
						bank_name: self.bank_name,
						kaihudian: self.kaihudian,
						wx_photo: self.wxImg,
						zfb_photo: self.zfbImg
					}

				})
			},
			on_http_userList(res) {
				var self = this;
				console.log("code===" + res.data.errcode)
				if (res.data.errcode == 1) {
					Toast(res.data.errmsg);

					const homePage = plus.webview.getWebviewById('king.home.home');
					fire(homePage, "refreshIframe", {
						type: "refresh"
					})

					const homePage1 = plus.webview.getWebviewById('king.home.home');
					fire(homePage1, "RefreshGlobal", {
						type: "refresh"
					})

					self.getUserInfo();
				} else {
					Toast(res.data.errmsg)
				}

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
				self.memberId = res.data.userinfo.phone;
				self.zfb = res.data.userinfo.zhifubao;
				self.weixin = res.data.userinfo.weixin;
				self.idcard = res.data.userinfo.idcard;
				self.bank_account = res.data.userinfo.bankaccount;
				self.name = res.data.userinfo.realname;
				self.bank_name = res.data.userinfo.bankname;
				self.kaihudian = res.data.userinfo.kaihudian;
				self.wxImg = res.data.userinfo.wx_photo;
				self.zfbImg = res.data.userinfo.zfb_photo;

				if (self.memberId == "") {
					self.read = false
				} else {
					self.read = true
				}
				if (res.data.userinfo.kslevel == 0) {
					self.level = "矿工"
				} else if (res.data.userinfo.kslevel == 1) {
					self.level = "一级矿商"
				} else if (res.data.userinfo.kslevel == 2) {
					self.level = "二级矿商"
				} else if (res.data.userinfo.kslevel == 3) {
					self.level = "三级矿商"
				} else if (res.data.userinfo.kslevel == 4) {
					self.level = "四级矿商"
				} else {
					self.level = "会员"
				}

				if (res.data.userinfo.jihuo == 0) {
					self.cardActive = "（未激活）"
				} else {
					self.cardActive = "（已激活）"
				}

				if (self.name == "") {
					self.read_name = false
				} else {
					self.read_name = true
				}

				if (self.idcard == "") {
					self.read_idcard = false
				} else {
					self.read_idcard = true
				}

			},
			onRead_wx(file, detail) {
				var self = this;
				var content = file.content;
				var baseImg = content.split(",");
				self.zfImg = baseImg[1];

				self.QYC.post({
					name: 'upload_wx',
					url: process.env.BASE_API + '/uploaddakuan?jwt=' + self.jwt,
					params: "info=" + self.zfImg

				})
			},
			on_http_upload_wx(res) {
				var self = this;

				if (res.data.code == 1) {
					Toast("上传成功")
					self.wxImg = res.data.img;
				} else {
					Toast(res.data.msg);
				}
			},
			onRead_zfb(file) {
				var self = this;
				var content = file.content;
				var baseImg = content.split(",");
				self.zfImg = baseImg[1];

				self.QYC.post({
					name: 'upload_zfb',
					url: process.env.BASE_API + '/uploaddakuan?jwt=' + self.jwt,
					params: "info=" + self.zfImg

				})
			},
			on_http_upload_zfb(res) {
				var self = this;
				if (res.data.code == 1) {
					Toast("上传成功")
					self.zfbImg = res.data.img;
				} else {
					Toast(res.data.msg);
				}
			},
		}
	};
</script>

<style lang="less">
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

	.van-cell-group {
		@box();
		padding-bottom: 0.2rem;
	}

	::-webkit-input-placeholder {
		color: #9f4fe1;
	}

	:-moz-placeholder {
		color: #9f4fe1;
	}

	::-moz-placeholder {
		color: #9f4fe1;
	}

	:-ms-input-placeholder {
		color: #9f4fe1;
	}

	.van-hairline--top-bottom::after {
		border-width: 0 0;
	}

	.van-field__control {
		color: #fff;
	}

	.van-cell {
		background-color: #7904db;
		color: white;
		padding: 15px 15px;
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

	.loginBtn {
		width: 5.92rem;
		height: 0.89rem;
		border-radius: 0.1rem;
		background-color: #7904db;
		color: white;
		text-align: center;
		line-height: 0.89rem;
		margin: 0rem auto;
		margin-top: 0.4rem;
		font-size: 0.3rem;
	}

	.noticetext {
		font-size: 0.24rem;
		color: #fff;
		padding-left: 0.2rem;
		box-sizing: border-box;
		margin-bottom: 0.5rem;
	}

	.up_text {
		@box();
		font-size: 0.28rem;
		color: #fff;
		padding: 0.2rem 0.25rem;
	}

	.skImg {
		@box();
		width: 5.4rem;
		height: auto;
		min-height: 3rem;
		border: 1px solid #fff;
		margin: 0 auto;

		.van-uploader {
			width: 100%;
			height: 100%;
			min-height: 3rem;
			text-align: center;

			.van-icon {
				color: #fff;
				font-size: 0.6rem;
				line-height: 3rem;
			}

			img {
				width: 98%;
				margin: 0.1rem auto;
			}
		}
	}
</style>
