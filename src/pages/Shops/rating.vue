<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家 {{info.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :scroe='info.serviceScore' :size="36" />
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :scroe="info.score" :size="36" />
            <span class="score">{{info.score}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}} 分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive " @click="changeOdertype(0)" :class="{active:orderType === 0}">
            全部
            <span class="count">{{rating.length}}</span>
          </span>
          <span class="block positive" @click="changeOdertype(1)" :class="{active:orderType === 1}">
            满意
            <span class="count">{{rating.length-disLike}}</span>
          </span>
          <span class="block negative" @click="changeOdertype(2)" :class="{active:orderType === 2}">
            不满意
            <span class="count">{{disLike}}</span>
          </span>
        </div>
        <div class="switch"  @click="changeText" :class="{on:text}">
          <span class="iconfont icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rate, index) in rateChange" :key="index">
            <div class="avatar">
              <img
                width="28"
                height="28"
                :src="rate.avatar"
              />
            </div>
            <div class="content">
              <h1 class="name">{{rate.username}}</h1>
              <div class="star-wrapper">
                <Star :scroe="rate.score" :size="24" />
                <span class="delivery">{{rate.deliveryTime}}</span>
              </div>
              <p class="text">{{rate.text}}</p>
              <div class="recommend">
                <span class="iconfont " :class="[rate.rateType?'icon-thumb_down':'icon-thumb_up']"></span>
                <span class="item" v-for="(food,index) in rate.recommend" :key="index">{{food}}</span>
              </div>
              <div class="time">{{rate.rateTime | date-format}}</div> 
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '../../components/Star/star'
import {mapState,mapAction} from 'vuex'
import BScroll from '@better-scroll/core'
export default {
  data () {
    return {
     orderType: 0,
     text:false
    }
  },
  components: {
    Star
  },
  computed: {
    ...mapState(['rating','info']),
    rateChange () {
      let rate =this.rating
      let orderType = this.orderType
      if(orderType){
        if(orderType === 1){
          rate = rate.filter(element => {
          return element.rateType === 0
        })
        }
        if(orderType === 2){
          rate = rate.filter(element => {
          return element.rateType === 1
        })
        }
      }
      if(this.text){
        rate = rate.filter(element => {
          return element.text
        })
      }
      return rate
    },
    disLike () {
      let rate = this.rating
      rate = rate.filter(element => {
          return element.rateType === 1
      })
      return rate.length
    }
  },
  mounted () {
    this.$store.dispatch('reqRating',() => {
      this.$nextTick(() => {
      this.scroll = new BScroll('.ratings')
      })
    })
  }, 
  methods: {
    changeOdertype(index){
      this.orderType = index
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    changeText () {
      this.text=!this.text
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import "../../common/stylus/mixins"
$green = #02a774
$yellow = #f5a100
 .ratings
    position: absolute
    top: 195px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
    .ratingselect
      .rating-type
        padding: 18px 0
        margin: 0 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        .block
          display: inline-block
          padding: 8px 12px
          margin-right: 8px
          line-height: 16px
          border-radius: 1px
          font-size: 12px
          color: rgb(77, 85, 93)
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: $green
            color: #fff
          .count
            margin-left: 2px
            font-size: 8px
      .switch
        padding: 12px 18px
        line-height: 24px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        color: rgb(147, 153, 159)
        font-size: 0
        &.on
          .icon-check_circle
            color: $green
        .icon-check_circle
          display: inline-block
          vertical-align: top
          margin-right: 4px
          font-size: 24px
        .text
          display: inline-block
          vertical-align: top
          font-size: 12px
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: $yellow
            .icon-thumb_down
              color: rgb(147, 153, 159)
            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>
