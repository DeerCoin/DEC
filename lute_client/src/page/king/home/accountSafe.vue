<template>
  <div>
    <header class="mui-bar mui-bar-nav" style="background:#fff;box-shadow: none;height: 0.88rem;">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"/>
      <h1 class="mui-title">账户安全</h1>
    </header>
    <div style="width: 100%; height: 0.88rem"/>

    <div class="box">
      <van-tabs @click="onClick">
        <van-tab title="登录密码">
          <ul>
            <li>
              <span>手机号</span>
              <input v-model="xg_phone" type="tel" placeholder="请输入手机号">
              <button v-if="getCode" class="getcode" @click="QYC.click('desTime',60)">{{ resiveGet }}</button>
              <button v-else class="getcode">{{ djsTime }}s</button>
            </li>
            <li>
              <span>验证码</span>
              <input v-model="xg_code" type="text" placeholder="请输入验证码">
            </li>
            <li>
              <span>新密码</span>
              <input v-model="xg_newpwd" type="password" placeholder="请输入新密码">
            </li>
            <li>
              <span>确认密码</span>
              <input v-model="xg_qrnewpwd" type="password" placeholder="请再次输入新密码">
            </li>
          </ul>

        </van-tab>
        <van-tab title="交易密码">
          <ul>
            <li>
              <span>手机号</span>
              <input v-model="xg_phone1" type="tel" placeholder="请输入手机号">
              <button v-if="getCode1" class="getcode" @click="QYC.click('desTime1',60)">{{ resiveGet1 }}</button>
              <button v-else class="getcode">{{ djsTime1 }}s</button>
            </li>
            <li>
              <span>验证码</span>
              <input v-model="xg_code1" type="text" placeholder="请输入验证码">
            </li>
            <li>
              <span>新密码</span>
              <input v-model="xg_newpwd1" type="password" placeholder="请输入新密码">
            </li>
            <li>
              <span>确认密码</span>
              <input v-model="xg_qrnewpwd1" type="password" placeholder="请再次输入新密码">
            </li>
          </ul>

        </van-tab>
      </van-tabs>
    </div>
    <div v-show="sure1" class="config" @click="QYC.click(&quot;sureChange&quot;)">确定修改</div>
    <div v-show="!sure1" class="config" @click="QYC.click(&quot;sureChange1&quot;)">确定修改</div>
    <Waiting v-show="waiting"/>
  </div>
</template>
<script>
import Rem from '@/utils/rem'
import {
  QYC
} from '@/QYC/QYC'
import Tabbar from '../../components/tabbar.vue'
import Waiting from '../../components/showwait.vue'
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
  Popup
} from 'vant'

export default {
  components: {
    Tabbar,
    Waiting,
    [Toast.name]: Toast,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [Icon.name]: NoticeBar,
    [Dialog.name]: Dialog,
    [NavBar.name]: NavBar,
    [Popup.name]: Popup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      tabbarActive: 0,
      waiting: false,
      jwtobj: null,
      jwt: '',
      xg_code: '',
      xg_newpwd: '',
      xg_phone: '',
      xg_qrnewpwd: '',
      xg_num: 0,
      tabMuen: [{
        'nid': 0,
        'ntitle': '登录密码'
      },
      {
        'nid': 1,
        'ntitle': '支付密码'
      }
      ],
      getCode: true,
      djsTime: 60,
      resiveGet: '获取验证码',
      getCode1: true,
      djsTime1: 60,
      resiveGet1: '获取验证码',
      xg_phone1: '',
      xg_code1: '',
      xg_newpwd1: '',
      xg_qrnewpwd1: '',
      sure1: true
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
  methods: {
    on_vue_created() {
      var self = this
      self.jwt = self.QYC.getItem('jwt')
    },
    on_vue_mounted() {
      var self = this
    },
    onClick(index, title) {
      var self = this

      self.xg_num = index
      self.xg_code = ''
      self.xg_newpwd = ''
      self.xg_phone = ''
      self.xg_qrnewpwd = ''
      if (index == 0) {
        self.sure1 = true
      } else {
        self.sure1 = false
      }
    },
    on_click_sureChange() {
      var self = this
      if (self.xg_phone == '') {
        Toast('手机号不能为空')
      } else if (self.xg_code == '') {
        Toast('验证码不能为空')
      } else if (self.xg_newpwd.length < 6) {
        Toast('密码不能少于6位')
      } else if (self.xg_qrnewpwd.length < 6) {
        Toast('密码不能少于6位')
      } else if (self.xg_newpwd != self.xg_qrnewpwd) {
        Toast('两次输入密码不一致')
      } else {
        self.QYC.get({
          name: 'reg',
          url: process.env.BASE_API + '/hall/changepwd',
          params: {
            jwt: self.jwt,
            code: self.xg_code,
            newpwd: self.xg_newpwd,
            ct: 0
          }
        })
      }
    },
    on_click_sureChange1() {
      var self = this
      if (self.xg_phone1 == '') {
        Toast('手机号不能为空')
      } else if (self.xg_code1 == '') {
        Toast('验证码不能为空')
      } else if (self.xg_newpwd1.length < 6) {
        Toast('密码不能少于6位')
      } else if (self.xg_qrnewpwd1.length < 6) {
        Toast('密码不能少于6位')
      } else if (self.xg_newpwd1 != self.xg_qrnewpwd1) {
        Toast('两次输入密码不一致')
      } else {
        self.QYC.get({
          name: 'reg',
          url: process.env.BASE_API + '/hall/changepwd',
          params: {
            jwt: self.jwt,
            code: self.xg_code1,
            newpwd: self.xg_newpwd1,
            ct: 1
          }
        })
      }
    },
    on_http_reg(res) {
      var self = this
      console.log(res)
      if (res.data.errcode == 1) {
        Toast(res.data.errmsg)
      } else {
        Toast(res.data.errmsg)
      }
    },
    // 获取验证码
    on_click_desTime(time) {
      var self = this
      if (self.xg_phone == '') {
        Toast('请输入手机号')
        return false
      }

      self.getCode = false
      var t = setInterval(function() {
        time--
        self.djsTime = time
        if (time < 0) {
          time = 60
          self.djsTime = 60
          clearInterval(t)
          self.getCode = true
          self.resiveGet = '重新获取'
        }
      }, 1000)

      self.QYC.get({
        name: 'getCode',
        url: process.env.BASE_API + '/getVerify',
        params: {
          phone: self.xg_phone
        }
      })
    },
    on_http_getCode(res) {
      var self = this
			if(res.data.code == 1){
				Toast('验证码发送成功')
			}else{
				Toast(res.data.msg)
			}
    },
    on_click_desTime1(time) {
      var self = this
      if (self.xg_phone1 == '') {
        Toast('请输入手机号')
        return false
      }

      self.getCode1 = false
      var t = setInterval(function() {
        time--
        self.djsTime1 = time
        if (time < 0) {
          time = 60
          self.djsTime = 60
          clearInterval(t)
          self.getCode1 = true
          self.resiveGet1 = '重新获取'
        }
      }, 1000)

      self.QYC.get({
        name: 'getCode',
        url: process.env.BASE_API + '/getVerify',
        params: {
          phone: self.xg_phone1
        }
      })
    }
  }
}

</script>

<style lang="less">
	@import '../../../assets/public/public.css';
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
	::-webkit-input-placeholder { /* WebKit, Blink, Edge */
		color: #9789ab;
	}
	[class*=van-hairline]::after{
		border-color: #9789ab !important;
	}
	.van-tab {
		background-color: #7904db
	}

	.van-tabs--line .van-tabs__wrap {
		height: 0.88rem;
	}
	.van-tabs span{
		color: #bb88e6;
	}
	.van-tabs__nav--line {
		padding: 0;
		border-bottom: 1px solid #fff;
	}

	.van-tabs__line {
		bottom: 0;
		background-color: #fff;
	}

	.van-tab--active {
		color: #fff;
	}
	.van-tab--active span {
		color: #fff;
	}
	.van-tabs__content {
		margin-top: 0.12rem;
		background-color: #7904db;
		color: white;
	}

	.box {
		background: #362b61;
		padding-bottom: 1.15rem;
		ul {
			padding: 0 0.4rem;
			margin-top: 0.1rem;
			li {
				display: flex;
				height: 0.95rem;
				align-items: center;
				border-bottom: 1px solid #9d56d7;
				position: relative;
				span {
					display: block;
					width: 1.9rem;
					font-size: 0.28rem;
					color: white;
				}
				input {
					border: 0;
					font-size: 0.28rem;
					background: none;
					padding: 0;
					margin: 0;
					color: white;
				}
				.getcode {
					width: 1.7rem;
					position: absolute;
					padding: 0.1rem 0.1rem;
					font-size: 0.28rem;
					color: #fff;
					border: 1px solid #fff;
					border-radius: 0.5rem;
					right: 0;
				}
			}
			li:last-child{
				border: none;
			}
		}
	}

	.config {
		width: 5.92rem;
		height: 0.89rem;
		background-color: #7904db;
		margin: 0 auto;
		text-align: center;
		border-radius: 0.1rem;
		line-height: 0.89rem;
		color: #fff;
		font-size: 0.26rem;
		margin-top: 1.720rem;
	}
</style>
