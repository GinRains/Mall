<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick" ref="detailNav"></detail-nav-bar>
    <scroll class="content" ref="scroll"
            @scroll="contentScroll" :probeType="3">
      <detail-swiper :topImg="topImg"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imgLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <GoodsList ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addCart"/>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from 'components/common/Scroll/Scroll'

  import {getDetail, Goods, Shop, GoodParam, getRecommend} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import {BACK_POSITION} from 'common/const'


  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImg: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        itemParams: {},
        commentInfo: {},
        recommends: [],
        themeTopY: [],
        getThemeTopY: {},
        currentIndex: 0
      }
    },
    methods: {
      ...mapActions(['addCart']),
      imgLoad() {
        // this.$refs.scroll.refresh() // 会被执行多次函数

        this.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index)
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 500)
      },
      contentScroll(position) {
        const positionY = -position.y
        let length = this.themeTopY.length
        for(let i = 0; i < length-1; i++) {
          if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopY[i] && positionY <= this.themeTopY[i+1])) {
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex = this.currentIndex
            // console.log(i)
          }
        }

        // 是否显示且回到底部
        this.isShowBackTop = Math.abs(position.y) >= BACK_POSITION
      },
      addCart() {
        // 1. 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImg[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 2. 将商品添入到购物车
        // this.addCart(product).then(res => {
        //   console.log(res)
        // })

        this.$store.dispatch('addCart', product).then(res => {
          this.$toast.show(res, 1200)
        })
      }
    },
    created() {
      // 保存传入的iid
      this.iid = this.$route.params.iid
      // console.log(this.$route)
      // console.log(this.$route.params)

      // 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.result

        // 1. 获取顶部图片轮播数据
        this.topImg = data.itemInfo.topImages
        // console.log(this.topImg)

        // 2. 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3. 创建店铺信息对象
        this.shop = new Shop(data.shopInfo)

        // 4. 获取商品详细信息
        this.detailInfo = data.detailInfo

        // 5. 获取参数信息
        this.paramInfo = new GoodParam(data.itemParams.info, data.itemParams.rule)

        // 6. 获取参数信息
        this.itemParams = data.itemParams

        // 7. 获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // 8. 请求推荐数据
        getRecommend().then(res => {
          this.recommends = res.data.list
          // console.log(this.recommends)
        })

        // 当上面数据请求完了，执行下一帧
        // this.$nextTick(() => {
          // 根据最新的数据，对应的DOM是已经被渲染出来了
          // 但是图片依然是没有加载完
          // offsetTop值不对的时候，都是因为图片的问题

          // 值不对，图片没加载完
          // this.themeTopY = []
          //
          // this.themeTopY.push(0);
          // this.themeTopY.push(-this.$refs.params.$el.offsetTop);
          // this.themeTopY.push(-this.$refs.comment.$el.offsetTop);
          // this.themeTopY.push(-this.$refs.recommend.$el.offsetTop);
          // console.log(this.themeTopY)
        // })

        // 给getThemeTopY赋值（对this.getThemeTopY赋值进行防抖操作
        this.getThemeTopY = debounce(() => {
          this.themeTopY = []

          this.themeTopY.push(0);
          this.themeTopY.push(this.$refs.params.$el.offsetTop);
          this.themeTopY.push(this.$refs.comment.$el.offsetTop);
          this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
          this.themeTopY.push(Number.MAX_VALUE)
          // console.log(this.themeTopY)
        }, 400)
      })
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Scroll,
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 99;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
  }
</style>
