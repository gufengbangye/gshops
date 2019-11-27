<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="item.count" @click.stop="upDataCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="item.count">{{item.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="upDataCount(true)"></div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    upDataCount (isAdd) {
      if (!this.item.count) {
      this.$set(this.item, 'count', 0) 
      this.$store.state.cartList.push(this.item)
      }
      this.$store.dispatch('upDataCount', {isAdd, item: this.item})
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import'../../common/stylus/mixins.styl'
 $green = #02a774
.cartcontrol
  font-size: 0
  .cart-decrease
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)
  .icon-remove_circle_outline
    display: inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color $green
    &.move-enter,&.move-leave-to
      opacity 0
      transform translateX(30px) rotate(360deg)
    &.move-enter-active,&.move-leave-active
      transition all 0.5s
  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 6px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
  .icon-add_circle
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color $green
</style>
