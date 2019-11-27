<template>

<div id="app">
  <keep-alive exclude='Search'>
  <router-view></router-view>
  </keep-alive>
  <FooterGuide v-show="$route.meta.showFtooer===true"></FooterGuide>
</div>

</template>
<script>

import FooterGuide from './components/FooterGuide/FooterGuide'
// import {reqCategory} from './api/index'
export default {
  mounted () {
    this.$store.dispatch('getAddress')
  },
  components: {FooterGuide}
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
#app
  width 100%
  height 100%
  background #f5f5f5
  position relative
</style>
