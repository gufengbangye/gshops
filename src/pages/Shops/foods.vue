<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul >
          <li class="menu-item" v-for="(food, index) in foods" :key="index" :class="{'current': index===currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img
                class="icon" :src='food.icon' v-if="food.icon"
              /> {{food.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" >
        <ul ref="foodsWrapper">
          <li class="food-list-hook" v-for="(food, index) in foods" :key="index">
            <h1 class="title">{{food.name}}</h1>
            <ul  v-if='food'>
              <li class="food-item bottom-border-1px" v-for="(item, index) in food.foods" :key="index" @click="showInfo(item)" >
                <div class="icon">
                  <img
                    width="57"
                    height="57"
                  :src='item.image'
                  />
                </div>
                <div class="content">
                  <h2 class="name">{{item.name}}</h2>
                  <p class="desc">{{item.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{item.sellCount}} 份</span>
                    <span>好评率 {{item.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{item.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper"><CartControl :item='item'></CartControl></div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopCart ></shopCart>
    </div>
    <Food :item ='item' ref='food'></Food>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import {mapActions, mapState} from 'vuex'
import CartControl from '../../components/CartControl/CartControl'
import Food from '../../components/Food/Food'
import shopCart from '../../components/shopCart/shopCart'
export default {
  data () {
    return {
      scrollY: '',
      tops: [],
      wrapTops: [],
      item: {}
    }
  },
  mounted () {
    this.reqFoods(() => {
      this.$nextTick(
        () => {
          this._inintMenuWrapper()
          this._inintFoodScroll()
          this._inintTop()
        }
      )
    })
  },
  methods: {
    ...mapActions(['reqFoods']),
    _inintFoodScroll () {
      this.foodScroll = new BScroll('.foods-wrapper', {
        scrollY: true,
        click: true,
        probeType: 3
      })
      this.foodScroll.on('scroll', ({x, y}) => {
        this.scrollY = -y
      })
      this.foodScroll.on('scrollEnd', ({x, y}) => {
        this.scrollY = -y
        if (this.scrollY > 0) {
        this.MenuScroll.scrollToElement('.current', 400)
        }
      })
    },
    _inintTop () {
      const tops = []
      let top = 0
      tops.push(top)
      const foodlist = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      Array.prototype.slice.call(foodlist).forEach(element => {
        top += element.clientHeight
        tops.push(top)
      })
      this.tops = tops
    },
    _inintMenuWrapper () {
      this.MenuScroll = new BScroll('.menu-wrapper', {
        click: true,
        probeType: 2
      })
    },
    clickMenuItem (index) {
      this.foodScroll.scrollTo(0, -this.tops[index], 400)
    },
    showInfo (item) {
      this.item = item
      console.log(this.$children)
      this.$refs.food.toggleShow()
    }
  },
  computed: {
    ...mapState(['foods']),
    currentIndex () {
      const {tops, scrollY} = this
      var index = tops.findIndex((item, index) => {
        return scrollY >= tops[index] && scrollY < tops[index + 1]
      })
      return index
    }
  },
  watch: {
    scrollY: function (newValue) {
      if (newValue > 0) {
        this.MenuScroll.scrollToElement('.current', 400)
      }
    }
  },
  components: {
    CartControl,
    Food,
    shopCart
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins'
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
