<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImg="topImg"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imgLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";

  import Scroll from 'components/common/Scroll/Scroll'

  import {getDetail, Goods, Shop, GoodParam} from "network/detail";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImg: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
      }
    },
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh()
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
      })
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo
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
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
