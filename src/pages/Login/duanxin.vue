<template>
  <div >
    <section class="login_message">
      <input type="tel" maxlength="11" placeholder="手机号"  v-model="phone"/>
      <button :disabled="!phonetest" class="get_verification " :class="{rightPhone:phonetest}" @click.prevent="timing">{{timer?`${timer}秒后获取`:'获取验证码'}}</button>
    </section>
    <section class="login_verification">
      <input type="tel" maxlength="8" placeholder="验证码" v-model="captcha"/>
    </section>
    <section class="login_hint">
      温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
      <a href="javascript:;">《用户服务协议》</a>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timer:'',
      phone:'',
      rightPhone:'',
      captcha:'',
    }
  },
  methods:{
    timing () {
      if(this.timer){ 
        return
      }
     this.timer=30
      let time = setInterval(() => {
        this.timer > 0 ? this.timer--: clearInterval(time)
      }, 1000);
    }
  },
  computed:{
   phonetest () {
    return  /1{1}\d{10}/.test(this.phone)
   }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
</style>
