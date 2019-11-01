<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="showInput?'on':''"  @click="showInput=true">短信登录</a>
          <a href="javascript:;" @click="showInput=false" :class="!showInput?'on':''">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="invidate">
          <div  :class="showInput?'on':''">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
              <button
                :disabled="!phonetest"
                class="get_verification"
                :class="{rightPhone:phonetest}"
                @click.prevent="timing"
>{{timer?`${timer}秒后获取`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="showInput?'':'on'">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名"  v-model="tel"/>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="密码"  v-model="pwd" v-if="showpwd"/>
                <input type="password" maxlength="8" placeholder="密码"  v-model="pwd" v-else/>
                <div class="switch_button " @click="showpwd=!showpwd" :class="showpwd?'off':'on'">
                  <div class="switch_circle" :class="showpwd?'':'right'"></div>
                  <span class="switch_text">{{showpwd?'':'abc'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha"/>
                <img class="get_verification" src="http://localhost:3000/captcha" alt="captcha" @click="getCaptcha" ref="captcha"/>
              </section>
            </section>
          </div>
          <button class="login_submit" >登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back"  @click="$router.replace('/Msite')">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <alertTip :alertText='alertText' @closeTip='closeTip' v-show='showMask'></alertTip>
  </section>

</template>

<script>
import alertTip from '../../components/AlertTip/AlertTip'
import {reqloginSms, reqPwd} from '../../api/index'
import {mapActions} from 'Vuex'
export default {
  data () {
    return {
      timer: '',
      phone: '',
      rightPhone: '',
      captcha: '',
      pwd: '',
      showpwd: true,
      showInput: true,
      alertText: '',
      showMask: false,
      code: '',
      tel: ''
    }
  },
  methods: {
    async timing () {
      if (this.timer) {
        return
      }
      this.timer = 30
      let time = setInterval(() => {
        this.timer > 0 ? this.timer-- : clearInterval(time)
      }, 1000)
      await this.$store.dispatch('reqSendCode', this.phone)
      //  const result=await reqSendCode(this.phone)
      if (this.$store.state.code === 1) {
        this.showText('发送验证码错误')
        if (this.timer) {
          this.timer = 0
          clearInterval(time)
        }
      }
    },
    async invidate () {
      if (this.showInput) {
        let {code, phonetest} = this
        if (!phonetest) {
          this.showText('输入的手机号格式不对')
          return
        } else if (!code) {
          this.showText('输入的验证码不对')
        }
        const result = await reqloginSms({code: this.code, phone: this.phone})
        if (result.code === 1) {
          this.showText(result.msg)
        } else {
          const userInfo = result.data
          this.$store.dispatch('recordUserInfo', userInfo)
          this.$router.replace('/profile')
        }
      } else {
        const {tel, pwd, captcha} = this
        if (!tel) {
          this.showText('输入正确的账号')
          return
        }
        if (!pwd) {
          this.showText('输入密码')
          return
        }
        if (!captcha) {
          this.showText('验证码')
        }
        const result = await reqPwd({tel, pwd, captcha})
        if (result.code === 1) {
          this.showText(result.msg)
          this.$refs.captcha.src = 'http://localhost:3000/captcha?time=' + Date.now()
        } else {
          const userInfo = result.data
          this.$store.dispatch('recordUserInfo', userInfo)
          this.$router.replace('/profile')
        }
      }
    },
    closeTip () {
      this.showMask = false
    },
    showText (msg) {
      this.alertText = msg
      this.showMask = true
    },
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:3000/captcha?time=' + Date.now()
    }
  },
  computed: {
    phonetest () {
      return /1{1}\d{10}/.test(this.phone)
    }
  },
  components: {
    alertTip
  },
  mounted () {

  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
              &.rightPhone{
                 color black
                }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;
                &.right{
                  transform translateX(27px)
                  }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
