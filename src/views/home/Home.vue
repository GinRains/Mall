<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control @tabClick="tabClick"
                 :titles="['流行', '新款','精选']"
                 ref="tabControl1"
                 v-show="isTabFixed"
                 class="tab-control"></tab-control>

    <Scroll class="content" ref="scroll"
            :probeType="3"
            @scroll="controlScroll"
            :pullUpLoad="true"
            @loadMore="loadMore">
      <HomeSwiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <HomeRecommend :recommends="recommends"/>
      <HomeFeature/>
      <tab-control @tabClick="tabClick"
                   :titles="['流行', '新款','精选']"
                    ref="tabControl2"></tab-control>
      <GoodsList :goods="showGoods"/>
    </Scroll>

<!--    <div @click="backClick"><BackTop/></div>-->
    <BackTop  @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from 'components/common/Scroll/Scroll'

  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommend from "./childComps/HomeRecommend";
  import HomeFeature from "./childComps/HomeFeature";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {BACK_POSITION} from "common/const";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  export default {
    name: "Home",
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,

      HomeSwiper,
      HomeRecommend,
      HomeFeature
    },
    methods: {
      /*
      * 事件监听相关函数
      * */
      tabClick(index) {
        // console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }

        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      controlScroll(position) {
        // console.log(position)
        // 1. 判断BackTop是否显示
        this.isShowBackTop = Math.abs(position.y) >= BACK_POSITION

        // 2. 决定tabControl是否吸顶（position: fixed
        this.isTabFixed = -(position.y) >= this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      swiperImgLoad() {
        // console.log(this.$refs.tabControl2.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /*
      * 网络请求相关代码
      * */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // console.log(res)
          // this.goods[type].list.push(...res.data.list);
          this.goods[type].list = this.goods[type].list.concat(res.data.list)
          this.goods[type].page += 1;
        })
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },
    },
    activated() {
      // console.log('activated')
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 400)
    },
    deactivated() {
      // 1. 保存y值
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY)

      // 2. 取消全局事件监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    created() {
      // 请求多个数据
      this.getHomeMultidata()

      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    position: relative;
    font-weight: 600;

    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9999;
  }

  .tab-control {
    background-color: #fff;
    position: relative;
    left: 0;
    right: 0;
    top: 44px;
    z-index: 99;
  }

  /*.content {*/
  /*  backgound-color: #1bc4fb;*/
  /*  !*calc 用来计算中间得高度*!*/
  /*  height: calc(100% - 93px);*/
  /*  margin-top: 44px;*/
  /*  overflow: hidden;*/
  /*}*/

  /*第二种方案*/
  .content {
    overflow: hidden;
    position: absolute;

    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
