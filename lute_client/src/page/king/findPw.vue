<template>
	<div>
		<van-nav-bar title="忘记密码" left-arrow @click-left="onClickLeft" />
		<!--<div style="width: 100%;height: 0.13rem;"></div>-->
		<div>
			<van-cell-group>
				<van-field v-model="wj_phone" center clearable label="手机号" placeholder="请输入手机号">

				</van-field>

				<van-field v-model="wj_txcode" center clearable label="图形验证码" placeholder="请输入图形验证码">
					<van-button slot="button" size="small" type="primary" class="codeImg" @click='QYC.click("changeWord")'>{{num}}</van-button>
				</van-field>
				<van-field v-model="wj_code" label="手机验证码" placeholder="请输入短信验证码">
					<van-button slot="button" size="small" type="primary" class="getCodeBtn" @click="QYC.click('desTime',60)" v-if="getCode">{{resiveGet}}</van-button>
					<van-button slot="button" size="small" type="primary" class="getCodeBtn" v-else>{{djsTime}}s</van-button>
				</van-field>
			</van-cell-group>
			<div size="large" class="loginBtn" style="margin-top: 1.75rem;" @click='QYC.click("toLogin")'>确定</div>
		</div>
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
				wj_phone: "",
				wj_pwd: "",
				wj_code: "",
				wj_txcode: "",
				num: "",
				getCode: true,
				djsTime: 60,
				resiveGet: "获取验证码"
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
				self.getWord();
				if (!window.plus) {
					self.jwtobj = self.QYC.getItem('jwt');
					if (self.jwtobj['jwt']) {
						self.jwt = self.jwtobj['jwt'];

					}
				}

			},
			on_vue_mounted() {
				var self = this;
			},
			onClickLeft() {
				var self = this;
				self.QYC.closeCurrentWebview();
			},
			on_click_toLogin() {
				var self = this;
				self.QYC.get({
					name: 'fingPwd',
					url: process.env.BASE_API + '/wangjipwd',
					params: {
						phone: self.wj_phone,
						password: self.wj_pwd,
						code: self.wj_code,
						txcode: self.wj_txcode
					}
				})
			},
			on_http_fingPwd(res) {
				var self = this;
				if (res.data.errcode != 1) {
					Toast(res.data.errmsg)
				} else {
					Toast("修改成功");
					setTimeout(function() {
						self.QYC.closeCurrentWebview
					}, 1000)

				}
			},
			//图像
			on_click_changeWord() {
				var self = this;
				self.jwtobj = self.QYC.getItem('jwt');
				self.QYC.get({
					name: 'word',
					url: process.env.BASE_API + '/code',
					params: {
						page: self.page,
						jwt: self.jwt,
						type: self.num
					}

				})
			},
			getWord() {
				var self = this;
				//				console.log(self.jwt)
				self.QYC.get({
					name: 'word',
					url: process.env.BASE_API + '/code',
					params: {
						page: self.page,
						jwt: self.jwt,
						type: self.num
					}

				})
			},
			on_http_word(res) {
				var self = this;
				if (res.data.errcode != 1) {
					Toast(res.data.msg);
				} else {
					self.num = res.data.data.code;
				}

			},
			// 获取验证码
			on_click_desTime(time) {
				var self = this;
				if (self.wj_phone == "") {
					Toast("请输入手机号");
					return false;
				}
				self.getCode = false;
				var t = setInterval(function() {
					time--;
					self.djsTime = time;
					if (time < 0) {
						time = 60;
						clearInterval(t);
						self.getCode = true;
						self.resiveGet = "重新获取";
					}

				}, 1000);

				self.QYC.get({
					name: 'getCode',
					url: process.env.BASE_API + '/getVerify',
					params: {
						phone: self.wj_phone,
					}
				})

			},
			on_http_getCode(res) {
				var self = this;
				Toast("验证码发送成功")
				console.log("code==" + JSON.stringify(res.data))
			}

		}

	}
</script>

<style lang="less">
	@import '../../assets/public/public.css';
	@import '../../assets/public/animate.min.css';
	@import '../../assets/public/public.less';

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

	.van-hairline--top-bottom::after {
		border-width: 0 0;
	}

	.van-cell-group {
		background-color: #7904db
	}

	.van-cell {
		background: none;
		width: 95%;
	}

	.van-field .van-cell__title {
		color: white;
	}

	input {
		color: #9442d8;
	}

	.getCodeBtn {
		width: 1.71rem;
		height: 0.56rem;
		border: 1px solid;
		border-radius: 0.3rem;
		background: none;
		line-height: 0.56rem;
	}

	.codeImg {
		background: #57189d;
		font-size: 0.34rem;
		border: none;
		color: #d29b42;
		width: 1.71rem;
		height: 0.56rem;
	}

	.loginBtn {
		width: 5.88rem;
		height: 0.87rem;
		border-radius: 0.1rem;
		background-color: #7904db;
		line-height: 0.87rem;
		color: white;
		text-align: center;
		margin: 0 auto;
		margin-top: 1.02rem;
	}
</style>
