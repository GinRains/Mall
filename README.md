# mall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

````js
git remote add origin https://github.com/GinRains/Mall.git
git push -u origin master
````

新项目：

## 1. 划分目录结构





### 九.tabControl的吸顶效果

#### 9.1.获取到tabControl的offsetTop

* 必须知道滚动到多少时，开始吸顶效果，这个就需要获取tabControl的offsetTop
* 但是，如果直接在mounted中获取tabControl的offsetTop是不正确的
* 如何获取正确值呢？
  * 监听HomeSwiper中img的加载完成
  * 加载完成后，发出事件，在Home.vue中，获取正确的值
  * 补充：
    * 为了不让HomeSwiper多次发出事件
    * 可以使用isLoad的变量进行状态的记录
  * 注意：这里不进行多次调用和debounce的区别

#### 9.2.监听滚动，动态的改变tabControl的样式

* 问题：动态的改变tabControl样式时，会出现两个问题
  * 问题一：下面的商品内容，会突然上移
  * 问题二：tabControl虽然设置了fixed，但是也随着better-Scroll一起滚出去了
* 其他方案来解决问题
  * 在最上面，多复制一份PlaceHolderTabControl组件对象，利用它来实现停留效果
  * 当用户滚动到一定位置时，PlaceHolderTabControl显示出来
  * 当用户滚动没有达到一定位置时，PlaceHolderTabControl隐藏起来

### 十. 让Home保持原来的状态

#### 10.1. 让Home不要随意销毁掉

* keep-alive

### 10.2. 让Home中的内容保持原来的位置

* 离开时，保存一个位置信息saveY
* 进来时，将位置设置为原来保存的位置saveY信息即可
  * 注意：最好回来时，进行一次refresh()

## 详情页实现思路

### 一. 点击商品进入详情页

* GoodsListItem点击
* 点击后获取商品的IID，跳转到详情页，并且转入IID

## 二. 解决-首页保持位置状态

* ````js
  deactiveted: 记录离开时的位置
  ````

* ````js
  activated: 通过scrollTo函数，设置离开时位置
  ````

* bug: Better-Scroll最新的1.15.0有scrollTo的位置

  * 解决方案：进行版本的回退1.13.2

### 三. 详情页的导航栏实现

* 返回按钮：left
* 标题列表的展示：center

### 四. 请求详情的数据

* 接口：/detail?iid=

## 五. 轮播图的实现

* Swiper/SwiperItem

### 六. 商品基本信息的展示

* 数据来自四面八方
* 对数据进行汇总：一个对象当中
* 一个对象传入子组件中

难点:

1. 代码如何组织
2. 业务逻辑(不要立即动手)
3. 自己留的bug(莫名bug)

### 七. 店铺信息的展示

### 八. 商品图片的展示

### 九. 参数信息的展示

### 十. 评论信息的展示

* 时间格式化

  * 问题：如何将时间戳 转成 时间格式化字符串(常用)

  * 时间戳：1535694719(秒)

    * 1. 将时间戳转成Date对象
      2. const date = new Date(1535694719*1000) // *1000转化为毫秒
      3. 将date进行格式化，转成对应的字符串

      * data -> FormaString(太常用)
      * fmt.format(date, 'yyyy-MM-dd hh:mm:ss') // 时分秒科写可不写

### 十一. 推荐数据的展示

* 请求推荐数据
* GoodsList展示数据

### 十二. mixin的使用

* 创建混入对象：const mixin = {}
* 组件对象中：mixins: [mixin]

1. 联动效果
2. 底部工具栏，点击加入购物车
3. 回到顶顶部

### 十三. 处理2个bug

* 首页tabControl
* 详情滚动的bug

### 十四. 标题和内容的联动效果

#### 14.1. 点击标题，滚动到对应的主题

* 在detail中监听标题的点击，获取index
* 滚动到对应的主题
  * 获取所有主题的offsetTop
  * 问题：在哪里才能获取到正确的offsetTop
    * 1. created肯定不行，压根不能获取元素
      2. mounted也不行，数据还没有获取到
      3. 获取数据的回调中也不行，DOM还没有渲染完
      4. $nextTick也不行，因为图片的高度没有计算在内
      5. 在图片加载完后，获取的高度才是正确的

#### 14.2. 内容滚动，显示正确标题

普通做法：

````js
// [0, 7097, 7858, 8169]
// positionY 在 0 和 7097 之间， index = 0
// positionY 在 7097 和 7858 之间， index = 1
// positionY 在 7858 和 8169 之间， index = 2
// positionY 超过 8169， index = 3
````

```js
(this.currentIndex !== i) && ((i < length - 1 && positionY >= this.themeTopY[i] && positionY <= this.themeTopY[i+1]) || (i === length - 1 && positionY >= this.themeTopY[i]))
条件成立：this.currentindex = i
条件一：防止赋值的过程过于频繁
条件二：(i < length - 1 && positionY >= this.themeTopY[i] && positionY <= this.themeTopY[i+1]) || (i === length - 1 && positionY >= this.themeTopY[i])
条件1：(i < length - 1 && positionY >= this.themeTopY[i] && positionY <= this.themeTopY[i+1])
* 判断区间：在0 和 某个数字 之间 (i === length - 1)
条件2：(i === length - 1 && positionY >= this.themeTopY[i])
* 判断大于等于：i === length - 1
```

hack做法：

````js
// [0, 7097, 7858, 8169, Number.MAX_VALUE]
// positionY 在 0 和 7097 之间， index = 0
// positionY 在 7097 和 7858 之间， index = 1
// positionY 在 7858 和 8169 之间， index = 2
// positionY 在 8169 和 Number.MAX_VALUE 之间， index = 3
````

````js
(this.currentIndex !== i) && (i < length - 1 && positionY >= this.themeTopY[i] && positionY <= this.themeTopY[i+1])
````

* 空间换事件(执行性能/写代码时间)
  * 虽然最大值很占空间，但性能更重要

### 十五. 底部工具栏封装



### 十六. 详情页的回到顶部

* home.vue和detail.vue回到顶部：混入(mixin)

### 十七. 点击加入购物车

#### 17.1. 监听加入购物车的点击，并且获取商品信息

* 监听
* 获取商品信息：iid/price/image/title/desc

	#### 17.2. 将商品添加到vuex中

* 安装Vuex
* 配置Vuex
* 定义mutations,将商品添加到state.cartList
* 重构Vuex

### 十八. 购物车的展示

#### 18.1. 购物车的导航栏展示

#### 18.2. 购物车商品的展示

* CartList -> Scroll（滚动的问题
* CartListItem -> CheckButton

#### 18.3. 商品的选中或不选中

* 修改模型对象，改变选中和不选中

#### 18.4. 底部工具栏的汇总

* 全选按钮
* 计算总价格
* 去计算

### 十九. 购物车的全选按钮

* 显示的状态
  * 判断是否有一个不选中，全选就是不选中状态
* 点击全选按钮
  * 如果原来都是选中的，点击一次，全部不选中
  * 原来都是不选中(某些不选中)，全部选中

### 二十. 添加购物车弹窗

#### 20.1. Vuex的补充

* Actions可以返回一个Promise
* mapActions的映射关系

#### 20.2. Toast(吐司)封装

* 普通封装方式
* 插件封装方式

### 二十一. 补充一些细节

#### 21.1. fastClick减少点击延迟

* 安装fastclick
* 导入
* 调用attach函数

#### 21.2. 图片的懒加载

* 什么是图片懒加载
  * 图片需要加载到屏幕上时，再加载这张图片
* 使用vue-lazyload
  * 导入
  * 安装 Vue.use(vue-lazyload)
  * 修改img的 :src 为 v-lazy

#### 21.3. px2vw插件使用

* 安装插件
* 在postcss.config.js配置



服务器问题：一台电脑(没有显示器，主机)，24小时开着，为用户提供服务。

公司有没有自己的服务主机？-> 租借 阿里云(流媒体)/华为云/腾讯云(配置)

主机 -> 操作系统 -> window(.net)/Linux -> tomacat/nginx(软件/反向代理)

第一：将自己的电脑作为服务器 -> window -> nginx(服务器)

第二：远程部署(Mac)

远程主题 -> linux centos -> nginx => 终端命令



* 如何理解Vue生命周期

* 如何进行非父子组件通信

* Vue响应式原理(初级的前端开发

  

